import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSource, getSource} from './SourceSlice';

export const SourceToggle = () => {
    const source = useSelector(getSource)
    const dispatch = useDispatch();


    const handleChange = (e) => dispatch(setSource(e.target.value));

    return(
        <div >
            <input type="radio" name="source" value="cases" checked = {source==="cases"} onChange={handleChange}/>Cases
            <input type="radio" name="source" value="deaths" checked = {source==="deaths"} onChange={handleChange}/>Deaths
        </div>)
}


