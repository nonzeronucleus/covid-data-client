import React from 'react';
import D3Test from './D3Test';
import { useSelector } from 'react-redux';
import {selectCases} from './CasesSlice';
import { get } from 'lodash'
import {useForm} from 'react-hook-form';

export const CasesList = () => {
    const caseData = useSelector(selectCases);
    const casesToDisplay = get(caseData,"caseByAge.00_04", []);
    const {register, handleSubmit} = useForm();


    const onSubmit = data => alert(`Submitting Name ${data.gender}`)



    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Age Group
                    <input ref={register} name="ageGroup"/>
                </label>
                <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>

                <button>Submit</button>
            </form>
            <D3Test data = {casesToDisplay}/>
        </div>
    )
}

// {JSON.stringify(casesToDisplay)}
