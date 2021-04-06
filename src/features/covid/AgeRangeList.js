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
    font-size: 22px;

    > li {
        text-align:center;
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 10px;
        cursor: pointer;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        > form {
            text-align:left;
        }
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

        // &:checked + span {
        //     // background-color:green;
        // }
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
        svg {
            width:40px;
            height:40px;
        }
    }
`;


const AgeRangeSelection = styled.span`
    display:inline-block;
    width:60px;
    border-width:4px;
    border-color:red;
`;

const ColourSelection = styled.span`
    padding-left:10px;
    display:inline-block;
    width:160px;
    // font-size: 18px;
    > select {
        font-size: 22px;
        border-radius:8px;
        // color:${props => props.colour}
    }
`;

const ColourOption = styled.option`

`;


const Tick = () => <svg>
    <path xmlns="http://www.w3.org/2000/svg" d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z"/>
</svg>

const ColourCircle = ({colour}) => <svg height="20" width="20">
    <circle cx="10" cy="10" r="6" stroke="black" strokeWidth="1" fill={colour} />
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
        <ColourSelection colour = {selectedColour} >
            <select name="colour" ref={register} value={selectedColour} onChange={handleColourChange}>
                {
                    allColours.map(c => <ColourOption colour={c} key={c} value={c}>{c}</ColourOption>)
                }

            </select>
        </ColourSelection>
        <span>
            <ColourCircle colour={selectedColour}/>
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
