import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useSelector } from 'react-redux';
import { getAllCovidData } from '../Sources/SourceSlice';
import { format, isFirstDayOfMonth } from "date-fns";
import {debounce} from 'lodash';

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
    const updateRange = ( newValue) => {
        console.log({  newValue });
    };
    const classes = useStyles();
    const [value, setValue] = React.useState([20, 37]);
    const covidData = useSelector(getAllCovidData);
    const marks = covidData
        .map((d, i) => ({ value: i, label: format(d.date, "dd/MMM/yy"), date: d.date }))
        .filter((d, i) => {
            const date = new Date(d.date);
            const isFirst = i === 0 || (i > 10 && isFirstDayOfMonth(date));
            return isFirst;
        })

    const [debouncedChangeRange] = React.useState(() =>
        debounce(updateRange, 300, {
          leading: false,
          trailing: true
        })
      );



    // const handleChange = (event, newValue) =>
    // {
    //     console.log(event.target)
    //     setValue(newValue);
    //     // _.debounce(debounce_fun,300)

    // };

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