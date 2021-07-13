import axios from 'axios';
import _ from 'lodash';
import filterAgeRanges from '../AgeRanges/filterAgeRanges';

const covidDataTypes = {
    deaths: {
        endpoint: "newDeaths28DaysByDeathDateAgeDemographics", 
        dataLabel: "newDeaths28DaysByDeathDateAgeDemographics", 
        daily:(data) => _.get(data,'deaths',0)
    },
    cases:  {
        endpoint: "newCasesBySpecimenDateAgeDemographics", 
        dataLabel: "newCasesBySpecimenDateAgeDemographics",
        daily:(data) => _.get(data,'cases',0)
    }
}

const calculateGrowthRate = (currentRate, oldRate) => {
    // console.log({currentRate, oldRate})
    const calcRRate = currentRate/oldRate;
    
    if(calcRRate === Infinity) return 1;
    if(isNaN(calcRRate)) return 0;

    return calcRRate;
}


const getTotalProto = dataType => (acc, curr) => acc+dataType.daily(curr);
const getRollingTotal = (acc, curr) => acc+curr.rollingSum;


const getByAgeRange = (dataType)  => {
    const getTotal = getTotalProto(dataType)
    
    return axios.get("https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=England&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22"+
        dataType.endpoint+
        "%22:%22"+
        dataType.endpoint+
        "%22%7D&format=json")
    .then(({ data }) => {
        const orderedData = data.data.reverse();
 
        return orderedData
            .map((record, idx) => {
                const covidData = record[dataType.dataLabel];
                const dailyTotal = filterAgeRanges(covidData).reduce(getTotal,0);
                const rollingTotal = filterAgeRanges(covidData).reduce(getRollingTotal, 0);



                return ({
                    date:new Date(record.date),
                    covidNumbersByAge:covidData
                        .map(
                            ({age,  cases, deaths, rollingRate, rollingSum, ...rest}, i) => {
                                const lastWeekRate = _.get(orderedData[idx-7], [dataType.dataLabel, i, 'rollingRate'],15);
                                
                                const dailyForAge = dataType.daily({cases, deaths});
                                //const percentage = dailyTotal > 0 ? Math.round(dailyForAge/dailyTotal*1000)/10 : 0;
                                const percentage = rollingTotal > 0 ? Math.round(rollingSum/rollingTotal*1000)/10 : 0;

                                // console.log({dailyTotal, dailyForAge,percentage})
                                const prevDailyForAge = dataType.daily(covidData[idx-1]);
                                const growthRate = calculateGrowthRate(rollingRate,lastWeekRate);
                                const population = rollingRate > 0 ? rollingSum/rollingRate*100000 : 0;
                                return {
                                    age:age.replace('_','-'), 
                                    daily:dailyForAge-prevDailyForAge, 
                                    growthRate: growthRate, 
                                    rollingRate, 
                                    rollingSum,
                                    population,
                                    percentage,
                                    dailyTotal
                                }
                            } 
                        )
                })
            });
            // .reverse();
        // return covidData;
     });
  };

  export const getDeathsByAgeRange = () => getByAgeRange(covidDataTypes.deaths)
  export const getCasesByAgeRange = () => getByAgeRange(covidDataTypes.cases)
