import React from "react";
import { useSelector } from 'react-redux';
import { getAllCovidData } from '../Sources/SourceSlice';
import { selectedAgeRanges } from '../AgeRanges/ChosenAgeRangesSlice'
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isAllLoaded } from '../Loading/LoadingSlice';
import { getDateRange} from '../DateRange/DateRangesSlice';
import { getDataToDisplay} from '../DataToDisplay/DataToDisplaySlice';
import dataType from '../DataToDisplay/dataTypes';


const dateFormatter = date => {
    return format(new Date(date), "dd/MMM/yy");
  };

const tooltipFormatter = (value, name, props) => JSON.stringify(value)  ///name.replace('_','-');


const labelFormatter = (value, name, props) => dateFormatter(value);

export default function Chart() {
    const ranges = useSelector(selectedAgeRanges);
    const chartData = useSelector(getAllCovidData);
    const {start,end} = useSelector(getDateRange);
    const dataToDisplay = useSelector(getDataToDisplay);


    const data2 = chartData
        .slice(Math.max(0, start),end+1)
        .map(({date, covidNumbersByAge}) => {
            return covidNumbersByAge.reduce((acc,covidNumbers) => {
                return {...acc, date, [covidNumbers.age]:
                    dataToDisplay === dataType.rate ? covidNumbers.rollingRate : covidNumbers.rollingSum
                }
            }, {})
        })


    const isLoaded = useSelector(isAllLoaded);

    if (!isLoaded) {
        return <h2>Loading</h2>
    }


    return (
        <ResponsiveContainer  width="99%">
            <LineChart width={730} height={250} data={data2}
                margin={{ top: 5, right: 30, left: 0, bottom: 32 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    // type="number"
                    tickMargin="20"
                    angle="45"
                    scale="time"
                    dataKey="date"
                    tickFormatter={dateFormatter}
                    tick={{stroke: 'black', strokeWidth: 0, fontSize: 14}}
                />
                <YAxis />
                <Tooltip formatter = {tooltipFormatter} labelFormatter={labelFormatter}/>
                {/* <Legend /> */}
                {
                    ranges.map((range) => {
                        return (<Line key={range.ageRange} type="monotone" dataKey={range.ageRange}  stroke={range.colour}  dot={false}  />)
                    })
                }

            </LineChart>
        </ResponsiveContainer>
    );
}
