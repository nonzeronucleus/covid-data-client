import axios from 'axios';

export const getByArea = ()  => {
    // return axios.get("https://cors-anywhere.herokuapp.com/https://coronavirus.data.gov.uk/api/v1/data?filters=areaType=region;areaName=London&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newCasesBySpecimenDateAgeDemographics%22:%22newCasesBySpecimenDateAgeDemographics%22%7D&format=json")
    return axios.get("https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=England&structure=%7B%22areaType%22:%22areaType%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22date%22:%22date%22,%22newCasesBySpecimenDateAgeDemographics%22:%22newCasesBySpecimenDateAgeDemographics%22%7D&format=json")
    .then(({ data }) => {
        return data;
     });
  };