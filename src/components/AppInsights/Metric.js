import React from 'react'
import './Metric.css'

export default class Metric extends React.Component{
    constructor(props)
    {
        super(props);
    }
    
    render(){
        var data = this.props;
        const print_value = JSON.stringify(data,null,'\n');
        return (
            <div className = "metric">
                <p id="tag">Raw Response:</p>
                <p id="jsonData" >{print_value}</p>
            </div>
        )
    };
}
