import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataToDisplay, getDataToDisplay} from './DataToDisplaySlice';
import { Radio, Toggle } from '../Radio/Radio';
import dataType from './dataTypes';


const DataInput = ({value}) => {
    const dataType = useSelector(getDataToDisplay)
    const dispatch = useDispatch();

    const handleChange = (e) => dispatch(setDataToDisplay(e.target.value));
    return (
        <Radio>{value}
            <input type="radio" name="datatypes" value={value} checked = {dataType===value} onChange={handleChange}/>
            <span></span>
        </Radio>
    )

}

export const DataToDisplayToggle = () => {
    return(
        <Toggle  id="datatypes">
            <DataInput value = {dataType.rate} />
            <DataInput value = {dataType.total} />
            <DataInput value = {dataType.percentage} />
        </Toggle>)
}


