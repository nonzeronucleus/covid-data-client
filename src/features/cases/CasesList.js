import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import { useArray } from 'react-hanger';
import AgeRangePicker from './AgeRangePicker'



export const CasesList = () => {
    const ageRanges = useSelector(selectAgeRanges);
    const { register, handleSubmit } = useForm();
    const [chosenRange, setChosenRange] = useState("");
    const ranges = useArray([]);

    useEffect(() => {
        if (ageRanges.length > 0) setChosenRange(ageRanges[0])
    }, [ageRanges])

    const onAdd = data => {
        ranges.add(data);

    }

    const onSubmit = data => console.log({ data })

    const handleChange = (e) => {
        setChosenRange(e.target.value);
    }

    const handleRemove = index => {
        ranges.removeIndex(index)
        console.log(ranges.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="ageRange" ref={register} onChange={handleChange} >
                    {
                        ageRanges.map(range => <option key={range} value={range} >{range}</option>)
                    }
                </select>

                <button>Submit</button>
            </form>
            <Chart {...{chosenRange}} ranges = {ranges.value} />
            <AgeRangePicker {...{ onAdd }} />
            {ranges.value.map((range, i) =>(
                <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span><button onClick={() => handleRemove(i)}>-</button></div>
            ))}
        </div>
    )
}
