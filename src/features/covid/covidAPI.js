import axios from 'axios';

const covidDataTypes = {
    deaths: {endpoint: "newDeaths28DaysByDeathDateAgeDemographics", dataLabel: "newDeaths28DaysByDeathDateAgeDemographics"},
    cases:  {endpoint: "newCasesBySpecimenDateAgeDemographics", dataLabel: "newCasesBySpecimenDateAgeDemographics"}
}

const getByAgeRange = (dataType)  => {
    return axios.get("https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=England&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22"+
        dataType.endpoint+
        "%22:%22"+
        dataType.endpoint+
        "%22%7D&format=json")
    .then(({ data }) => {
        const covidData = data.data
            .map((record) => {
                return ({
                    date:new Date(record.date),
                    covidNumbersByAge:record[dataType.dataLabel]
                        .map(({age, cases, rollingRate, rollingSum}) => {return {age:age.replace('_','-'), cases, rollingRate, rollingSum}} )
                })
            })
            .reverse();
        return covidData;
     });
  };

  export const getDeathsByAgeRange = () => getByAgeRange(covidDataTypes.deaths)
  export const getCasesByAgeRange = () => getByAgeRange(covidDataTypes.cases)
