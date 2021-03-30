import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {toggleRange, getRanges, changeColour} from './ChosenRangesSlice';
import allColours from './allColours';

// const StyledRow = styled.div`
// `;

const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    > li {
        text-align:left;
    }
`;


const RangeRow = ({ageRange, isSelected, colour}) => {
    const dispatch = useDispatch();
    const { register } = useForm();


    const handleToggle = (ageRange) => dispatch(toggleRange(ageRange))
    const handleColourChange = (e) => {
        const colour = e.target.value;

        dispatch(changeColour({ageRange, colour}))
    }


    return <form>
        <input  type="checkbox" name="selected" checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/>
            <span>{ageRange.replace("_","-")}
            <select name="colour" ref={register} value={colour} onChange={handleColourChange}>
                {
                    allColours.map(c => <option key={c} value={c}>{c}</option>)
                }
                </select>
        </span>
    </form>
}


export const AgeRangePicker = () => {
    const ranges = useSelector(getRanges);

    return (
        <RangeList>
            {
                ranges.map(({ageRange, colour, isSelected}) => (<li key={ageRange}><RangeRow {...{ageRange, colour, isSelected}}/></li>))
            }
        </RangeList>
    )
}

export default AgeRangePicker;
