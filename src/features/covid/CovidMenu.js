import React from 'react';
import AgeRangeList from './AgeRangeList';
import {SourceToggle} from './SourceToggle';


function CovidMenu() {
    return (
        <>
            <SourceToggle />
            <AgeRangeList/>
        </>
    )
}

export default CovidMenu;
