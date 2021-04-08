import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSource, getSource} from './SourceSlice';
import sourceType from './sourceType';
import { Radio, Toggle } from '../Radio/Radio';


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
        <Toggle id="source">
            <SourceInput value = {sourceType.cases} />
            <SourceInput value = {sourceType.deaths} />
        </Toggle>)
}


