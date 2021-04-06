import React from 'react';
import Chart from './features/covid/Chart';
import AgeRangeList from './features/covid/AgeRangeList';
import {SourceToggle} from './features/covid/SourceToggle';
import styled from 'styled-components';


const StyledApp = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
   "header toggle"
   "drawer chart";
  width:99%;
  height:90%;
  padding:0px;
  border-width:20px;
  border-radius:20px;

  div:first-child {
    border-top-left-radius: 5px;
  }

  div:last-child {
    border-bottom-right-radius: 10px;
  }
}
`;

const Tile = styled.div`
  grid-area:${props => props.location};
  background-color:${props => props.color == null ? "white" : props.color};
  font-family:'Roboto';
  font-size:'x-large';
  padding:10px;
  margin:4px;
  border-width:4px;
  border-radius:4px;

    // border-wid
    // margin:10px;
`;

const Title = styled.h1`
    margin:0px;
    color:floralwhite;
`;




function App() {
    return (
        <StyledApp menuOpen={true}>
            {/* hello */}
            <Tile location="header" color="lightslategray">
                <Title>UK Covid Data</Title>
            </Tile>
            <Tile location="drawer"  color="cadetblue">
                <AgeRangeList/>
            </Tile>
            <Tile location="toggle" color="lightslategray">
                <SourceToggle />
            </Tile>
            <Tile location="chart">
                <Chart/>
            </Tile>

        </StyledApp>
    )
}

export default App;
