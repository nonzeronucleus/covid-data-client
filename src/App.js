import React from 'react';
import Chart from './features/covid/Chart2';
import AgeRangeList from './features/covid/AgeRangeList';
import {SourceToggle} from './features/covid/SourceToggle';
import styled from 'styled-components';


const StyledApp = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 20px auto 300px;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
   "header header toggle"
   "picker chart selection";
   ". footer footer"
  width:100%;
  height:100%;
  b
`;

const Tile = styled.div`
  grid-area:${props => props.location};
  // background-color:${props => props.color == null ? "inherit" : props.color};
`;





function App() {
    return (
        <StyledApp>
            <Tile location="toggle">
                <SourceToggle />
            </Tile>
            <Tile location="chart">
                <Chart/>
            </Tile>
            <Tile location="selection">
                <AgeRangeList/>
            </Tile>
        </StyledApp>
    )
}

export default App;
