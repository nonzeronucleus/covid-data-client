// import React, { useState, useCallback } from 'react';
import React, { useCallback } from 'react';
import {useDispatch, useMappedState} from 'redux-react-hook';
import * as actions from '../redux/actions';
import {getTime} from '../redux/selectors';

const options = {
    timeZone:"Africa/Accra",
    hour12 : true,
    hour:  "2-digit",
    minute: "2-digit",
   second: "2-digit"
 }

export default () => {
    const mapState = useCallback(state => ({
        time: getTime(state)}
      ), []);

    const {time} = useMappedState(mapState);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(actions.start())
      };

    return (
        <div>
            <button onClick={handleSubmit}>Set time</button>
            Time: {time && time.toLocaleDateString("en-UK", options)}
        </div>
    )
};
