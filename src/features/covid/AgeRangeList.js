import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {toggleRange, getRanges, changeColour} from './ChosenRangesSlice';
import allColours from './allColours';


const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    padding:0px;

    > li {
        text-align:center;
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 8px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        > form {
            text-align:left;
        }
`;

const CheckBox = styled.label`
    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        padding-left:35px;
        width:60px;

        &:checked + span {
            // background-color:green;
        }
    }
    > span {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        :after {
            content: "";
            position: absolute;
            display: none;
        }
    }
`;


const AgeRangeSelection = styled.span`
    display:inline-block;
    width:60px;
`;

const ColourSelection = styled.span`
    display:inline-block;
    width:120px;
    font-size: 18px;
    > select {
        font-size: 18px;
    }
`;


const Tick = () => <svg>
    <path xmlns="http://www.w3.org/2000/svg" d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z"/>
</svg>

const RangeRow = ({ageRange, isSelected, colour}) => {
    const [selectedColour, setSelectedColour] = useState(colour)
    const dispatch = useDispatch();
    const { register } = useForm();


    const handleToggle = (ageRange) => dispatch(toggleRange(ageRange))
    const handleColourChange = (e) => {
        const newColour = e.target.value;
        setSelectedColour(newColour)

        dispatch(changeColour({ageRange, colour:newColour}))
    }


    return <form>
        <AgeRangeSelection>
            <CheckBox>{ageRange.replace("_","-")}
                <input  type="checkbox" name="selected" checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/>
                <span>{isSelected && <Tick />}</span>
            </CheckBox>
        </AgeRangeSelection>
        <ColourSelection>
            <select name="colour" ref={register} value={selectedColour} onChange={handleColourChange}>
                {
                    allColours.map(c => <option key={c} value={c}>{c}</option>)
                }
            </select>
        </ColourSelection>
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
