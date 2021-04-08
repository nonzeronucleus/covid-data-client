import React from 'react';
import AgeRangeList from '../AgeRanges/AgeRangeList';
import {SourceToggle} from '../Sources/SourceToggle';
import {DataToDisplayToggle} from '../DataToDisplay/DataToDisplayToggle'
import { useSelector } from 'react-redux';
import { isAllLoaded } from '../Loading/LoadingSlice';

import styled from 'styled-components';

const Menu = styled.div`
    padding-top:10px;
    color:blanchedalmond;
`;


function CovidMenu() {
    const isLoaded = useSelector(isAllLoaded);

    if (!isLoaded) {
        return null
    }

    return (
        <Menu>
            <SourceToggle />
            <AgeRangeList/>
            <DataToDisplayToggle />
        </Menu>
    )
}

export default CovidMenu;
