import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { get } from 'lodash'
import { selectCasesByAge } from './CasesSlice';
import * as d3 from "d3";
import "d3-time-format";
const parseTime = d3.timeParse("%Y-%m-%d");



const drawDataSet = async (x, y, casesToDisplay, graph) => {

  const valueLine = d3.line()
    .x((d) => { return x(parseTime(d.date)); })
    .y((d) => { return y(d.rollingRate); });


  x.domain(d3.extent(casesToDisplay, (d) => { return parseTime(d.date); }));
  y.domain([0, d3.max(casesToDisplay, (d) => { return d.rollingRate; })]);

  graph.append("path")
    .data([casesToDisplay])
    .attr("class", "line")
    .attr("d", valueLine);
}




const createGraph = async (chosenRange, casesByAge) => {
  const casesToDisplay = get(casesByAge, chosenRange, []);

  const svg = d3.select("svg")
  svg.selectAll("path").remove()
  svg.selectAll("g").remove()

  const margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const graph = svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  drawDataSet(x, y, casesToDisplay, graph)

  graph.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  graph.append("g")
    .call(d3.axisLeft(y));


}

export default function D3Test({ chosenRange, ranges }) {
  const casesByAge = useSelector(selectCasesByAge);

  useEffect(() => {
    createGraph(chosenRange, casesByAge);
  });


  return (
    <div>
      <svg>
        <style>{
          `
                .line {
                    fill: none;
                    stroke: steelblue;
                    stroke-width: 2px;
                }
            `}
        </style>
      </svg>
    </div>
  );
}