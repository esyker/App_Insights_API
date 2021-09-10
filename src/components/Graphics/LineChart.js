import React, { Component } from 'react';
import { scaleLinear, scaleBand, scaleTime, scaleOrdinal } from 'd3-scale';
import { select, selectAll, pointer} from 'd3-selection';
import { line, curveMonotoneX, area } from 'd3-shape';
import { extent, max } from 'd3-array';
import { transition} from 'd3-transition';
import { axisBottom, axisLeft,axisRight } from "d3-axis";
import { timeParse, timeFormat , utcParse} from 'd3-time-format';
import { timeDay } from 'd3-time';

export default class MyLineChart extends Component {
    constructor(props)
    {
        super(props);
        this.state={"isLoaded":false, "circleHover":false};
        this.lineRef = React.createRef();
        this.formatDate=this.formatDate.bind(this);
    }

    formatDate(date){
        var aux= utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(date);
        //var formated = timeFormat("%d-%m")(aux);
        //console.log(formated);
        return aux;
        //return timeFormat("%d-%m")(utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(date));
    };

    componentDidMount(){
        const node = this.lineRef.current;
        const { data, title, aggr} = this.props;
        var data_render = [];
        data.segments.forEach(
            (obj) => {
                data_render.push([this.formatDate(obj.end), obj[title][aggr]]);
            }
        )
        console.log(data_render);
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        
        // append the svg object to the body of the page
        var svg = select(node)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
        // Add X axis --> it is a date format
        var x = scaleTime()
        .domain(extent(data_render, function(d) { return d[0]; }))
        .range([ 0, width ]);

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x).tickFormat(timeFormat("%d/%m"))
                    .tickValues(data_render.map(function(d){
                                        return d[0]
                                    })));

        // Add Y axis
        var y = scaleLinear()
            .domain([0, max(data_render, function(d) { return d[1]; })])
            .range([ height, 0 ]).nice();

        svg.append("g")
        .attr("transform", "translate("+0+",0)")
        .call(axisRight(y));
        
        //Add the area
        svg.append("path")
        .datum(data_render)
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", .3)
        .attr("stroke", "none")
        .attr("d", area()
            .x(function(d) { return x(d[0]) })
            .y0( height )
            .y1(function(d) { return y(d[1]) }).curve(curveMonotoneX)
            )
        
        // Add the line
        svg.append("path")
        .datum(data_render)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line()
            .x(function(d) { return x(d[0]) })
            .y(function(d) { return y(d[1]) }).curve(curveMonotoneX)
            )

        // Add the circles
        svg.selectAll("myCircles")
        .data(data_render)
        .enter()
        .append("circle")
            .attr("fill", "red")
            .attr("stroke", "none")
            .attr("cx", function(d) { return x(d[0]) })
            .attr("cy", function(d) { return y(d[1]) })
            .attr("r", 5).style("opacity",1)

        svg.selectAll("myText")
        .data(data_render)
        .enter()
        .append("text")
        .attr("x", function(d){return x(d[0])})
        .attr("y", function(d){return y(d[1])})
        .text(function(d){return timeFormat("%d/%m")(d[0])+' data:'+d[1]})
        .style("font-size","6px")
        .style("opacity",1);

        //Add the title
        svg.append("text")
        .attr("x", width/2)             
        .attr("y", margin.top)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text(title);

        this.setState({...this.state, isLoaded:true})
    }

    render() {
        return (
            <div>
                <svg className="lineChart" ref={this.lineRef} />
            </div>
        );
    }
}
