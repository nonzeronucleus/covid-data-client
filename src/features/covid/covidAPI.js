import axios from 'axios';
import _ from 'lodash';

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

const getByAgeRange = (dataType)  => {
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

                return ({
                    date:new Date(record.date),
                    covidNumbersByAge:covidData
                        .map(
                            ({age,  cases, deaths, rollingRate, rollingSum, ...rest}, i) => {
                                // if(age==="15_19") {
                                    // console.log(idx, record.date)
                                // }
                                const lastWeekRate = _.get(orderedData[idx-7], [dataType.dataLabel, i, 'rollingRate'],15);
                                
                                // idx > 7 ? covidData[idx-7] : {rollingRate:1};
                                const dailyTotal = dataType.daily({cases, deaths});
                                const prevDaily = dataType.daily(covidData[idx-1]);
                                // console.log({lastWeekRate})
                                const growthRate = calculateGrowthRate(rollingRate,lastWeekRate);

                                // console.log({calcRRate});

                                if(age==="15_19") {
                                    // console.log(orderedData[idx-7])
                                    // console.log({rollingRate,lastWeekRate})
                                    // console.log({lastWeek, rollingRate, calcRRate})
                                }

                                return {
                                    age:age.replace('_','-'), 
                                    daily:dailyTotal-prevDaily, 
                                    growthRate: growthRate, 
                                    rollingRate, 
                                    rollingSum
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
