import React from 'react';
import Metric from './Metric';
import LineChart from '../Graphics/LineChart';

class AppInsightsQueries extends React.Component{
    constructor(props) 
    {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        item: null 
        };
    }
    
    componentDidMount() {
        var hr = new XMLHttpRequest();
        hr.onreadystatechange = () => {
            if (hr.readyState === XMLHttpRequest.DONE) {
            this.setState({ error:false , isLoaded:true, item: JSON.parse(hr.responseText) 
                , text:hr.responseText })
        }}
        hr.onerror = () =>{
            this.setState({
            isLoaded: true,
            error:true })
        }
        const path='https://api.applicationinsights.io/v1/apps/'+ process.env.REACT_APP_APPINSIGHTS_APPID 
        +'/metrics/requests/count?timespan=P7D&interval=P1D&aggregation=sum';
        hr.open('GET', path, true);
        hr.setRequestHeader("x-api-key", process.env.REACT_APP_APPINSIGHTS_KEY);
        hr.send();
    }
   
    render()
    {   
        const { error, isLoaded, item } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Metric {...item.value}/>
                    <LineChart data={item.value} title = "requests/count" aggr="sum"/>
                </div>
            );
        }
    }
}

export default AppInsightsQueries;
