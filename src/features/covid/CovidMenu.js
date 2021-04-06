import React from 'react';
import AgeRangeList from './AgeRangeList';
import {SourceToggle} from './SourceToggle';
import styled from 'styled-components';

const Menu = styled.div`
    padding-top:20px;
    color:blanchedalmond;
`;


function CovidMenu() {
    return (
        <Menu>
            <SourceToggle />
            <AgeRangeList/>
        </Menu>
    )
}

export default CovidMenu;
