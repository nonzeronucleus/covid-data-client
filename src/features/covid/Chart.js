import React from "react";
import { useSelector } from 'react-redux';
import { getAllCovidData } from '../Sources/SourceSlice';
import { getSelectedAgeRanges } from '../AgeRanges/ChosenAgeRangesSlice'
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isAllLoaded } from '../Loading/LoadingSlice';
import { getDateRange} from '../DateRange/DateRangesSlice';
import { getDataToDisplay} from '../DataToDisplay/DataToDisplaySlice';
import dataType from '../DataToDisplay/dataTypes';
import _ from 'lodash'; 

const dateFormatter = date => {
    return format(new Date(date), "dd/MMM/yy");
  };

const tooltipFormatter = (value, name, props) => JSON.stringify(value)  ///name.replace('_','-');


const labelFormatter = (value, name, props) => dateFormatter(value);

const getValueToDisplay = (data, dataToDisplay) => {
    // console.log({data, dataToDisplay})
    return ({
        // [dataType.population]:data.population,
        [dataType.rate]:data.rollingRate,
        [dataType.total]:data.rollingSum,
        [dataType.percentageFromPeak]:data.rollingRate,
        [dataType.percentage]:data.percentage,
        [dataType.change]:data.growthRate
    })[dataToDisplay] ?? 0
}

export default function Chart() {
    const isLoaded = useSelector(isAllLoaded);
    const chartData = useSelector(getAllCovidData);
    const {start,end} = useSelector(getDateRange);
    const dataToDisplay = useSelector(getDataToDisplay);
    const selectedAgeRanges = useSelector(getSelectedAgeRanges);

    const maxValues = _.mapValues(selectedAgeRanges, () => 0);

    if (!isLoaded) {  
        return <h2>Loading</h2>
    }

    if(Object.keys(selectedAgeRanges).length === 0){
        return null;
    }

    const selectedCovidData = chartData
        .slice(Math.max(0, start),end+1)
        .map(({date, covidNumbersByAge}) => {
            return covidNumbersByAge.reduce((acc,covidNumbers)  => {
                const ageRange = covidNumbers.age;

                if (selectedAgeRanges[ageRange]===undefined) {
                    return acc;
                }

                const count = getValueToDisplay(covidNumbers, dataToDisplay)
                
                maxValues[ageRange]=Math.max(maxValues[ageRange], count );

                return {
                    ...acc,
                    date,
                    [ageRange]: count
                }
            }, {})
        })

        const max = Math.ceil(_.max(Object.values(maxValues)));

    if (dataToDisplay === dataType.percentageFromPeak) {
        selectedCovidData
            .forEach((d, i) => {
                const {date} = d;

                Object.keys(maxValues).forEach((age) => {
                    const val=d[age];

                    d[age]=val/maxValues[age]*100;
                })

                return {date, ...d};
            })
    }


    const ticks = [...Array(max).keys()];
    
    return (
        <ResponsiveContainer  width="99%">
            <LineChart width={730} height={250} data={selectedCovidData}
                margin={{ top: 5, right: 30, left: 0, bottom: 32 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    tickMargin="20"
                    angle="45"
                    scale="time"
                    dataKey="date"
                    tickFormatter={dateFormatter}
                    tickLine="true"
                    tick={{stroke: 'black', strokeWidth: 0, fontSize: 14}}
                />
                <YAxis 
                    ticks = { (dataToDisplay  === dataType.change) ? ticks : undefined }
                    label={{value:dataToDisplay, angle:"-90", position:"insideLeft"}}
                />
                <Tooltip formatter = {tooltipFormatter} labelFormatter={labelFormatter}/>
                {/* <Legend /> */}
                {
                    Object.keys(selectedAgeRanges).map((ageRange) => {
                        const range = selectedAgeRanges[ageRange];

                        return (<Line key={ageRange} type="monotone" dataKey={ageRange}  stroke={range.colour}  dot={false}  />)
                    })
                }

            </LineChart>
        </ResponsiveContainer>
    );
}
