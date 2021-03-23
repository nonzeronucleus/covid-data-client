import React, { useEffect } from "react";
import * as d3 from "d3";
import "d3-time-format";
const parseTime = d3.timeParse("%Y-%m-%d");

const createGraph = async (data) => {
  const margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const valueLine = d3.line()
    .x((d) => { return x(parseTime(d.date)); })
    .y((d) => { return y(d.rollingRate); });

  const svg = d3.select("svg")   ///select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//   let data = await d3.csv(require("./data.csv"))


//   data.forEach((d) => {
//     d.date = parseTime(d.date);
//     d.close = +d.close;
//   });

//   data = data.sort((a, b) => +a.date - +b.date)



  x.domain(d3.extent(data, (d) => { return parseTime(d.date); }));
  y.domain([0, d3.max(data, (d) => { return d.rollingRate; })]);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueLine);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));


}

export default function D3Test({data}) {
  useEffect(() => {
      console.log({data})
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