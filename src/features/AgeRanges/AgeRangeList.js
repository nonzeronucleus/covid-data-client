import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {toggleAgeRange, changeColour, getAgeRanges} from './ChosenAgeRangesSlice';
import allColours from '../covid/allColours';


const fontSize = '15px';

const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    padding:0px;
    font-size: ${fontSize};

    > li {
        text-align:center;
        display: block;
        position: relative;
        padding-left: 1px;
        margin-bottom: 2px;
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


// const CheckBox = styled.label`
//     > input {
//         position: absolute;
//         opacity: 0;
//         cursor: pointer;
//         height: 0;
//         width: 0;
//         padding-left:35px;
//         width:60px;

//         // &:checked + span {
//         //     // background-color:green;
//         // }
//     }
//     > span {
//         // top: 50%;
//         // -ms-transform: translateY(-50%);
//         // transform: translateY(-50%);      
//         position: absolute;
//         top: 6px;
//         left: 0;
//         height: 15px;
//         width: 15px;
//         background-color: #eee;
//         // :after {
//         //     content: "";
//         //     position: absolute;
//         //     display: none;
//         // }
//         // svg {
//         //     width:25px;
//         //     height 25px;
//         // }
//     }
// `;


// const AgeRangeSelection = styled.span`
//     display:inline-block;
//     width:60px;
//     border-width:4px;
//     border-color:red;
// `;

const ColourSelection = styled.span`
    padding-left:10px;
    display:inline-block;
    width:120px;
    // font-size: 18px;
    > select {
        font-size: ${fontSize};
        border-radius:4px;
        // color:${props => props.colour}
    }
`;

const ColourOption = styled.option`

`;


// const Tick = () => <svg>
//     <path xmlns="http://www.w3.org/2000/svg" d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z"/>
// </svg>

const ColourCircle = ({colour}) => <svg height="20" width="20">
    <circle cx="10" cy="10" r="6" stroke="black" strokeWidth="1" fill={colour} />
</svg>

const AgeRangeRow = styled.div`
    text-align:left;
    align:left;
    margin:0px;
    padding:4px;
    > label {
        width:64px;
        display:inline-block;
        > input {
            margin-right:6px;
        }
    }
`;


const RangeRow = ({ageRange, isSelected, colour}) => {
    const [selectedColour, setSelectedColour] = useState(colour)
    const dispatch = useDispatch();
    const { register } = useForm();


    const handleToggle = (ageRange) => dispatch(toggleAgeRange(ageRange))
    const handleColourChange = (e) => {
        const newColour = e.target.value;
        setSelectedColour(newColour)

        dispatch(changeColour({ageRange, colour:newColour}))
    }

    return <AgeRangeRow>
            <label>
                <input type="checkbox" name = {ageRange} checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/>
                {ageRange.replace("_","-")}
            </label>
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
        </AgeRangeRow>;

    // return <form>
    //     <AgeRangeSelection>
    //         <CheckBox>{ageRange.replace("_","-")}
    //             <input  type="checkbox" name="selected" checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/>
    //             {/* <span>{isSelected && <Tick />}</span> */}
    //         </CheckBox>
    //     </AgeRangeSelection>
    //     <ColourSelection colour = {selectedColour} >
    //         <select name="colour" ref={register} value={selectedColour} onChange={handleColourChange}>
    //             {
    //                 allColours.map(c => <ColourOption colour={c} key={c} value={c}>{c}</ColourOption>)
    //             }

    //         </select>
    //     </ColourSelection>
    //     <span>
    //         <ColourCircle colour={selectedColour}/>
    //     </span>
    // </form>
}


export const AgeRangePicker = () => {
    const ranges = useSelector(getAgeRanges);

    return (
        <RangeList>
            {
                ranges.map(({ageRange, colour, isSelected}) => (<li key={ageRange}><RangeRow {...{ageRange, colour, isSelected}}/></li>))
            }
        </RangeList>
    )
}

export default AgeRangePicker;
