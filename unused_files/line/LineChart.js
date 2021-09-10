import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './axis/xy-axis';
import Line from './line/line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

export default class LineChart extends Component {
    constructor(props) {
      super(props);
    }

  render() {
    const { data, title, aggr} = this.props;
    const data_segs = data.segments;
    var data_render = [];
    data_segs.forEach(
      function(obj){
        console.log(obj);
        data_render.push([obj.end, obj[title][aggr]]);
      }
    )
    console.log(data_render);
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data_render.map(d => d[0]))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data_render, d => d[1]))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curveMonotoneX);

    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data_render} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}
