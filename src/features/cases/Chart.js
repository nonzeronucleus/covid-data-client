import React, { useEffect } from "react";
import * as d3 from "d3";
import "d3-time-format";
const parseTime = d3.timeParse("%Y-%m-%d");


const drawDataSet = async (x, y, data, graph) => {

  const valueLine = d3.line()
    .x((d) => { return x(parseTime(d.date)); })
    .y((d) => { return y(d.rollingRate); });


  x.domain(d3.extent(data, (d) => { return parseTime(d.date); }));
  y.domain([0, d3.max(data, (d) => { return d.rollingRate; })]);

  graph.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueLine);
}

const createGraph = async (data) => {
  const svg = d3.select("svg")
  svg.selectAll("path").remove()
  svg.selectAll("g").remove()

  const margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // const valueLine = d3.line()
  //   .x((d) => { return x(parseTime(d.date)); })
  //   .y((d) => { return y(d.rollingRate); });




  const graph = svg //d3.select("svg")
    // d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  //   svg.selectAll("path").remove()

  // x.domain(d3.extent(data, (d) => { return parseTime(d.date); }));
  // y.domain([0, d3.max(data, (d) => { return d.rollingRate; })]);

  // graph.append("path")
  //   .data([data])
  //   .attr("class", "line")
  //   .attr("d", valueLine);

  drawDataSet(x, y, data, graph)

  graph.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  graph.append("g")
    .call(d3.axisLeft(y));


}

export default function D3Test({ data }) {
  useEffect(() => {
    createGraph(data);
  }, [data]);


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