import React from "react"
import {Spring} from "react-spring/renderprops"
import "./Attempt.css"
class Attempt extends React.Component{
    render(){ //attempt component which holds an attempt at decrypting text with a given shift
        return(
            <Spring from={{opacity:0}} to={{opacity:1}}>
                {props=>(  //react spring library for animations
                    <div style={{...props,...{ backgroundColor: this.props.color }}} className="attempt">
                        <h4>Decode shift: {this.props.value}</h4>
                        <p>{this.props.decoded}</p>
                    </div>
                )}
            </Spring>
        )
    }
}

export default Attempt