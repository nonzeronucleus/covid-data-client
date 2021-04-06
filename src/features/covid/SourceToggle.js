import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSource, getSource} from './SourceSlice';
import sourceType from './sourceType';
import styled from 'styled-components';


const Radio = styled.label`
    // display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked + span {
            background-color:green;
            padding:-20px;
        }
    }

    //
    > span {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
        :after {
            content: "";
            position: absolute;
            display: none;
            top: 9px;
            left: 9px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
    }

    :after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }

    padding-right:40px;
`;



const SourceInput = ({value}) => {
    const source = useSelector(getSource)
    const dispatch = useDispatch();

    const handleChange = (e) => dispatch(setSource(e.target.value));
    return (<Radio>{value}
        <input type="radio" name="source" value={value} checked = {source===value} onChange={handleChange}/>
        <span></span>
    </Radio>)

}

export const SourceToggle = () => {
    return(
        <div >
            <SourceInput value = {sourceType.cases} />
            <SourceInput value = {sourceType.deaths} />
        </div>)
}


