import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useArray } from 'react-hanger';
import AgeRangePicker from './AgeRangePicker'



export const CasesList = () => {
    const ageRanges = useSelector(selectAgeRanges);
    const [chosenRange, setChosenRange] = useState("");
    const ranges = useArray([]);

    useEffect(() => {
        if (ageRanges.length > 0) setChosenRange(ageRanges[0])
    }, [ageRanges])

    const onAdd = data => {
        ranges.add(data);

    }

    const handleRemove = index => {
        ranges.removeIndex(index)
        console.log(ranges.value)
    }

    return (
        <div>
            <Chart {...{chosenRange}} ranges = {ranges.value} />
            <AgeRangePicker {...{ onAdd, chosenRanges:ranges.value }} />
            {ranges.value.map((range, i) =>(
                <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span><button onClick={() => handleRemove(i)}>-</button></div>
            ))}
        </div>
    )
}
