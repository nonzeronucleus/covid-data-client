import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCovidData } from '../Sources/SourceSlice';
import { format, isFirstDayOfMonth } from "date-fns";
import {debounce} from 'lodash';
import { setDateRange, getDateRange } from './DateRangesSlice';

import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
        width: '90%',
    },
    label: {
        textTransform: 'capitalize',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed'
    },
});


function valuetext(value) {
    return `${value}°C`;
}



const Picker = styled.div`
    padding-left:40px;
`;




export function DateRangePicker() {
    const globalDateRange = useSelector(getDateRange);
    const dispatch = useDispatch();
    const updateRange = ( newValue) => {
        dispatch(setDateRange({start:newValue[0], end:newValue[1]}))
    };
    const classes = useStyles();
    const covidData = useSelector(getAllCovidData);
    const marks = covidData
        .map((d, i) => ({ value: i, label: format(d.date, "dd/MMM/yy"), date: d.date }))
        .filter((d, i) => {
            const date = new Date(d.date);
            const isFirst = i === 0 || (i > 10 && isFirstDayOfMonth(date));
            return isFirst;
        })
    const [value, setValue] = React.useState([0, covidData.length-1]);

    useEffect(() => {
        setValue([globalDateRange.start, globalDateRange.end])
    }, [globalDateRange])



    const [debouncedChangeRange] = React.useState(() =>
        debounce(updateRange, 300, {
          leading: false,
          trailing: true
        })
      );

    const handleChange = (event, newValue) => {
        setValue(newValue);
        debouncedChangeRange( newValue);
      };



    const valueLabelFormat = (v) => {

        if (v >= covidData.length) {
            return v;
        }

        return format(covidData[v].date, "dd/MMMM/yy");
    }

    return (
        <Picker className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Date Range
            </Typography>
            <Slider
                min={0}
                max={Math.max(0, covidData.length - 1)}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                marks={marks}
                classes={{
                    markLabel: classes.label
                }}
                valueLabelFormat={valueLabelFormat}
            />
        </Picker>
    );
}