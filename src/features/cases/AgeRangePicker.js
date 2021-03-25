import React from 'react';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


const colours = ["red", "blue", "black", "yellow"];


const StyledRow = styled.div`
`;


export const AgeRangePicker = ({ onAdd }) => {
    const ageRanges = useSelector(selectAgeRanges);
    const { register, handleSubmit } = useForm();

    return (
        <StyledRow>
            <form onSubmit={handleSubmit(onAdd)}>
                <select name="ageRange" ref={register}>
                    {
                        ageRanges.map(range => <option key={range} value={range} >{range}</option>)
                    }
                </select>

                <select name="colour" ref={register} >
                    {
                        colours.map(colour => <option key={colour} value={colour}>{colour}</option>)
                    }
                </select>
                <button>+</button>
            </form>
        </StyledRow>
    )
}

export default AgeRangePicker;
