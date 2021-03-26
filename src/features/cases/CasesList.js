import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { useSelector } from 'react-redux';
import { selectCasesByAge, selectAgeRanges } from './CasesSlice';
import { get } from 'lodash'
import { useForm } from 'react-hook-form';
import { useArray } from 'react-hanger';
// import styled from 'styled-components';
import AgeRangePicker from './AgeRangePicker'



export const CasesList = () => {
    const casesByAge = useSelector(selectCasesByAge);
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
    const casesToDisplay = get(casesByAge, chosenRange, []);

    const handleChange = (e) => {
        setChosenRange(e.target.value);
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
            <Chart data={casesToDisplay} />
            <AgeRangePicker {...{ onAdd }} />
            {ranges.value.map((range, i) =>(
                <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span></div>
            ))}
        </div>
    )
}

// {JSON.stringify(casesToDisplay)}
