import React from 'react';
import Chart from './features/covid/Chart';
// import AgeRangeList from './features/covid/AgeRangeList';
// import {SourceToggle} from './features/covid/SourceToggle';
import styled from 'styled-components';
import CovidMenu from './features/covid/CovidMenu'
import {DateRangePicker} from './features/DateRange/DateRangePicker'


const StyledApp = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 320px minmax(600px,auto);
  grid-template-rows: 60px 60px minmax(600px,auto) 160px;
  grid-template-areas:
   "header chart"
   "drawer chart"
   "drawer chart"
   "drawer daterange";
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
            <Tile location="header" color="#45688a">
                <Title>UK Covid Data</Title>
            </Tile>
            <Tile location="drawer"  color="cadetblue"  corners = "1234">
                <CovidMenu />
                {/* <AgeRangeList/> */}
            </Tile>
            {/* <Tile location="toggle" color="cadetblue" corners = "1234">
                <SourceToggle />
            </Tile> */}
            <Tile location="chart" corners = "1234">
                <Chart/>
            </Tile>
            <Tile location="daterange" color="cadetblue">
                <DateRangePicker />
            </Tile>

        </StyledApp>
    )
}

export default App;
