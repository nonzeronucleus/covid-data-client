import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSource, getSource} from './SourceSlice';
import sourceType from './sourceType';


const SourceInput = ({value}) => {
    const source = useSelector(getSource)
    const dispatch = useDispatch();

    const handleChange = (e) => dispatch(setSource(e.target.value));
    return (<><input type="radio" name="source" value={value} checked = {source===value} onChange={handleChange}/>{value}</>)

}

export const SourceToggle = () => {

    return(
        <div >
            <SourceInput value = {sourceType.cases} />
            <SourceInput value = {sourceType.deaths} />
        </div>)
}


