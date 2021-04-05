import React from 'react';
import Chart from './features/covid/Chart';
import AgeRangeList from './features/covid/AgeRangeList';
import {SourceToggle} from './features/covid/SourceToggle';
import styled from 'styled-components';


const StyledApp = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: ${props => props.menuOpen ? "300px": "100px"} auto 300px 10px;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
   "header header toggle right"
   "drawer chart chart right";
   "drawer footer footer right"
  width:100%;
  height:100%;
  background-color:lightgray;
  padding:0px;
`;

const Tile = styled.div`
  grid-area:${props => props.location};
  background-color:${props => props.color == null ? "white" : props.color};
  font-family:'Roboto';
  font-size:'x-large';
  padding:10px;
    // border-wid
    // margin:10px;
`;




function App() {
    return (
        <StyledApp menuOpen={true}>
            <Tile location="header" color="lightslategray">
                <h1>UK Covid Data</h1>
            </Tile>
            <Tile location="drawer"  color="cadetblue">
                <AgeRangeList/>
            </Tile>
            <Tile location="toggle" color="cadetblue">
                <SourceToggle />
            </Tile>
            <Tile location="chart">
                <Chart/>
            </Tile>
            <Tile location="selection">

            </Tile>
        </StyledApp>
    )
}

export default App;
