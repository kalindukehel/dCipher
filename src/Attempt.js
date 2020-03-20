import React from "react"
import "./Attempt.css"
class Attempt extends React.Component{
    render(){
        return(
            <div style ={{backgroundColor:this.props.color}} className="attempt">
                <h4>Decode shift: {this.props.value}</h4>
                <p>{this.props.decoded}</p>
            </div>
        )
    }
}

export default Attempt