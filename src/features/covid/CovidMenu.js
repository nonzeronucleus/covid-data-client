import React from 'react';
import AgeRangeList from './AgeRangeList';
import {SourceToggle} from './SourceToggle';
import { useSelector } from 'react-redux';
import { isAllLoaded } from './LoadingSlice';

import styled from 'styled-components';

const Menu = styled.div`
    padding-top:20px;
    color:blanchedalmond;
`;


function CovidMenu() {
    const isLoaded = useSelector(isAllLoaded);

    if (!isLoaded) {
        return <h2>Loading</h2>
    }

    return (
        <Menu>
            <SourceToggle />
            <AgeRangeList/>
        </Menu>
    )
}

export default CovidMenu;
