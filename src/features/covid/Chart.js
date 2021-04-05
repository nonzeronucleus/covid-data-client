import React from "react";
import { useSelector } from 'react-redux';
import { getAllCovidData } from './SourceSlice';
import { selectedRanges } from './ChosenRangesSlice'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {
    const ranges = useSelector(selectedRanges);
    const chartData = useSelector(getAllCovidData);
    const data2 = chartData
        .map(({date, covidNumbersByAge}) => {
            return covidNumbersByAge.reduce((acc,covidNumbers) => {
                return {...acc, date, [covidNumbers.age]:covidNumbers.rollingRate}
            }, {})
        }).reverse();

    return (
        <ResponsiveContainer>
            <LineChart width={730} height={250} data={data2}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    ranges.map((range) => {
                        return (<Line key={range.ageRange} type="monotone" dataKey={range.ageRange}  stroke={range.colour}  dot={false}  />)
                    })
                }

            </LineChart>
        </ResponsiveContainer>
    );
}
