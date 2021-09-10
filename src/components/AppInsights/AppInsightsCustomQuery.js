import React from 'react';
import {Link} from 'react-router-dom';
import Metric from './Metric';

class AppInsightsCustomQueries extends React.Component{
    constructor(props) 
    {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            isQueryChosen: false,
            query_type: "metrics",
            query_path: null,
            item: null 
        };
        this.queryChange=this.queryChange.bind(this);
        this.querySubmit=this.querySubmit.bind(this);
        this.loadData=this.loadData.bind(this);
        this.reset=this.reset.bind(this);
    }
    
    queryChange(event)
    {
        this.setState({...this.state, query_type: event.target.value});
    }

    querySubmit(event)
    {   
        var path = 'https://api.applicationinsights.io/v1/apps/'+ 
                            process.env.REACT_APP_APPINSIGHTS_APPID_PERSONAL;
        switch(this.state.query_type)
        {   
            case 'metrics':
                path+='/metrics/requests/duration?timespan=PT6H&interval=PT1H';
                break;
            case 'events':
                path+="/events/$all?$top=5";
                break;
            case 'query':
                path+="/query?query=requests | where timestamp >= ago(24h) | count";
                break;
            default:
                break;
        }
        this.setState({...this.state, isQueryChosen:true, query_path: path}, this.loadData);
    }

    loadData(){ 
        var hr = new XMLHttpRequest();
        hr.onreadystatechange = () => {
            if (hr.readyState === XMLHttpRequest.DONE) {
            this.setState({ ...this.state, isLoaded:true, item: JSON.parse(hr.responseText)})
        }}
        hr.onerror = () =>{
            this.setState({...this.state, error:true })
        }
        hr.open('GET', this.state.query_path, true);
        hr.setRequestHeader("x-api-key", process.env.REACT_APP_APPINSIGHTS_KEY_PERSONAL);
        hr.send();
    }
   
    reset()
    {
        this.setState({error: false,isLoaded: false,isQueryChosen: false,query: null,item: null 
        });
    }

    render()
    {   
        const { error, isLoaded, item, isQueryChosen } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }else if(!isQueryChosen){
            return <form onSubmit={this.querySubmit}>
                <label>
                    Pick your query:
                    <select value={this.state.query_type} onChange={this.queryChange}>
                        <option value="metrics">metrics</option>
                        <option value="events">events</option>
                        <option value="query">query</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>;
        } 
        else if (isQueryChosen && !isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <p>{JSON.stringify(this.state.item)}</p>
                    <button onClick={this.reset}>
                        Make another Query
                    </button>
                </div>
            );
        }
    }
}

export default AppInsightsCustomQueries;
