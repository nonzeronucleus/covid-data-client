import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { get } from 'lodash'
import { selectCasesByAge } from './CasesSlice';
import * as d3 from "d3";
import "d3-time-format";
const parseTime = d3.timeParse("%Y-%m-%d");



const drawDataSet = async (graph, x, y, maxRate, amountToDisplay, colour) => {
  const valueLine = d3.line()
    .x((d) => { return x(parseTime(d.date)); })
    .y((d) => { return y(d.rollingRate); });


  x.domain(d3.extent(amountToDisplay, (d) => { return parseTime(d.date); }));
  // y.domain([0, d3.max(amountToDisplay, (d) => { return d.rollingRate; })]);
  y.domain([0, maxRate]);

  graph.append("path")
    .data([amountToDisplay])
    .attr("class", "line")
    .attr("stroke", colour)
    .attr("d", valueLine);
}



const getMaxRate = (casesByAge, ranges) =>
  d3.max(ranges,
    (r) => {
      return d3.max(casesByAge[r.ageRange],
        (r) => {return r.rollingRate}
      )
    }
  );



const createGraph = async (casesByAge, ranges) => {
  const maxRate = getMaxRate(casesByAge, ranges)
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

  ranges.forEach(range => {
    const amountToDisplay = get(casesByAge, range.ageRange, []);
    drawDataSet(graph, x, y, maxRate, amountToDisplay, range.colour)
  })

  graph.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  graph.append("g")
    .call(d3.axisLeft(y));
}

export default function D3Test({ ranges }) {
  const casesByAge = useSelector(selectCasesByAge);

  useEffect(() => {
    createGraph(casesByAge, ranges);
  });


  // if (ranges.length === 0) {
  //   return null;
  // }

  return (
    <div>
      <svg>
        <style>{
          `
                .line {
                    fill: none;
                    stroke-width: 2px;
                }
            `}
        </style>
      </svg>
    </div>
  );
}


// stroke: steelblue;
