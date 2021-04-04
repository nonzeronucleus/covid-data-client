import React from "react";
import { useSelector } from 'react-redux';
import { getSelectedData } from './SourceSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const testData = [
    {
        "name": "1/1/2020",
        "linea": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "linea": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "linea": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "linea": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "linea": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "linea": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "linea": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

export default function Chart() {
    // const chartRef = useRef();
    // const dimensions = useResizeObserver(chartRef);
    const chartData = useSelector(getSelectedData);
    // const data2 = chartData
    //     .map(({ageRange, colour, data}) => {

    //     })

    console.log(chartData)

    return (
        <ResponsiveContainer>
            <LineChart width={730} height={250} data={testData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
                <Line type="monotone" dataKey="linea" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    );
}
