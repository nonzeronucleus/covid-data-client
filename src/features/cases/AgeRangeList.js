import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {toggleRange, selectedRanges, getRanges, getRanges2} from './ChosenRangesSlice';
// import allColours from './allColours';

// const StyledRow = styled.div`
// `;

const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    > li {
        text-align:left;
    }
`;


const RangeRow = ({ageRange, isSelected}) => {
    const dispatch = useDispatch();
    const { register } = useForm();


    const handleToggle = (ageRange) => dispatch(toggleRange(ageRange))


    return <form>
        <input  type="checkbox" name="selected" checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/><span>{ageRange.replace("_","-")}</span>
    </form>
}


export const AgeRangePicker = () => {
    const ranges = useSelector(getRanges);

    return (
        <RangeList>
            {
                ranges.map(({ageRange, colours, isSelected}) => (<li key={ageRange}><RangeRow {...{ageRange, colours, isSelected}}/></li>))
            }
        </RangeList>
    )
}

export default AgeRangePicker;
