import React from 'react'

export default class Metric extends React.Component{
    constructor(props)
    {
        super(props);
    }
    
    render(){
        var value = this.props.value;
        const print_value = JSON.stringify(value,null,'\n');
        return (
            <div>
                <p>{print_value}</p>
                {/*_array.map(
                    (value,index)=>{
                        return <p key={index}>{value}</p>
                    }
                )*/}
                {/*props.map((metric)=>{
                        <p>{metric}</p>
                    }
                )*/}
            </div>
        )
    };
}
