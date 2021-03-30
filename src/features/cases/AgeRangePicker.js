import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {addRange, removeRange, selectedRanges} from './ChosenRangesSlice';


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


const NewRangeSelector = () => {
    const chosenRanges = useSelector(selectedRanges);
    const chosenAges = chosenRanges.map(range => range.ageRange)
    const chosenColours = chosenRanges.map(range => range.colour)
    const colours = allColours.filter(colour => !chosenColours.includes(colour))
    const ageRanges = useSelector(selectAgeRanges).filter(range => !chosenAges.includes(range));
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onAdd = data => {
        dispatch(addRange(data));
    }



    return (
        <StyledRow>
            <form onSubmit={handleSubmit(onAdd)}>
                <select name="ageRange" ref={register}>
                    {
                        ageRanges.map(range => <option key={range} value={range} >{range.replace("_","-")}</option>)
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


export const AgeRangePicker = () => {
    const chosenRanges = useSelector(selectedRanges);
    const dispatch = useDispatch();

    const handleRemove = range => {
        dispatch(removeRange(range));
    }

    return (
        <>
            <NewRangeSelector />
            {chosenRanges.map((range, i) =>(
                <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span><button onClick={() => handleRemove(range)}>-</button></div>
            ))}
        </>
    )
}

export default AgeRangePicker;
