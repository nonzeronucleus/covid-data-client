import React from 'react';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


const colours = [
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
    "IndianRed","RosyBrown"
]




const StyledRow = styled.div`
`;


export const AgeRangePicker = ({ onAdd, chosenRanges }) => {
    const chosenAges = chosenRanges.map(range => range.ageRange)
    const chosenColours = chosenRanges.map(range => range.colour)
    const ageRanges = useSelector(selectAgeRanges);
    const { register, handleSubmit } = useForm();



    return (
        <StyledRow>
            <form onSubmit={handleSubmit(onAdd)}>
                <select name="ageRange" ref={register}>
                    {
                        ageRanges.filter(range => !chosenAges.includes(range)).map(range => <option key={range} value={range} >{range}</option>)
                    }
                </select>

                <select name="colour" ref={register} >
                    {
                        colours.filter(colour => !chosenColours.includes(colour)).map(colour => <option key={colour} value={colour}>{colour}</option>)
                    }
                </select>
                <button>+</button>
            </form>
        </StyledRow>
    )
}

export default AgeRangePicker;
