import React from 'react';
import Metric from './Metric';

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
        const path='https://api.applicationinsights.io/v1/apps/'+ process.env.REACT_APP_APPINSINGHTS_APPID 
        +'/metrics/requests/duration?interval=PT1H';
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
                    {/*<p>Hello</p>
                    <p>{JSON.stringify(item)}</p>
                    <p>{this.state.text}</p>*/}
                    <Metric {...item}/>
                </div>
            );
        }
    }
}

export default AppInsightsQueries;
