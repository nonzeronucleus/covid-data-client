import React from 'react';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


const allColours = [
    "aqua","blue",
    "navy","purple",
    "olive","green",
    "lime","yellow",
    "fuchsia","red",
    "maroon","orange",
    "teal","grey",
    "silver","black",
    "brown", "Chartreuse",
    "coral", "DarkMagenta",
    "IndianRed"
]




const StyledRow = styled.div`
`;


export const AgeRangePicker = ({ onAdd, chosenRanges }) => {
    const chosenAges = chosenRanges.map(range => range.ageRange)
    const chosenColours = chosenRanges.map(range => range.colour)
    const colours = allColours.filter(colour => !chosenColours.includes(colour))
    const ageRanges = useSelector(selectAgeRanges).filter(range => !chosenAges.includes(range));
    const { register, handleSubmit } = useForm();

    if (ageRanges.length === 0 || colours.length === 0) {
        return null;
    }

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
