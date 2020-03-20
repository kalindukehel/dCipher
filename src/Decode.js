import React from "react"
import {encodeString, toDecode, encodeShift} from "./functions"
import Attempt from "./Attempt"
import "./Decode.css"
class Decode extends React.Component{
    constructor(){
        super()
        this.state={
            decodeText: "",
            decoded: "",
            show: true, //to show default element
            shift:0,
            defaultAttempt:null
        }
        this.onHandle = this.onHandle.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
        this.showAll = this.showAll.bind(this)
    }

    onHandle(event){ //takes in events from text input and changes state
        this.setState({
            decodeText: event.target.value,
            show:false
        })
        this.props.updateDecodeText(event.target.value)
        this.props.setShow(false)

    }

    buttonClick(){ //when decode button is clicked show default attempt, hide shift attempts
        let decodeShift  = encodeShift(this.state.decodeText)
        this.setState(()=>{
            let shiftToDecode = toDecode(decodeShift)
            let temp = encodeString(this.state.decodeText,shiftToDecode)
            return({
                show:true,
                decoded:temp,
                defaultAttempt: <Attempt color={"rgb(12, 180, 76)"} value= {shiftToDecode} decoded={temp} />
            })
        })
        this.props.updateCorrectShift(toDecode(decodeShift))
        this.props.setShow(false)
    }

    showAll(){
        let decodeShift  = encodeShift(this.state.decodeText)
        this.props.updateCorrectShift(toDecode(decodeShift),this.props.showAll) //sends in callback function
    }

    render(){
        return(
            <div className="decodecontainer">
                <input className={"inputText"} style={{width:"100%",marginBottom:"50px"}} type ="text" placeholder="Text to decode" onChange={this.onHandle} />
                <button className="button" onClick={this.buttonClick}>Decode</button>
                <button className="button" style={{backgroundColor:this.props.show?"":"rgb(223, 70, 70)"}} onClick={this.showAll}>{(this.props.show)?"Show All Shifts":"Hide All Shifts"}</button>
                <div style={{display:"flex", justifyContent:"center",paddingTop:"50px"}}>
                    {(this.props.show&&this.state.show)?this.state.defaultAttempt:null}
                </div>
            </div>
        )
    }
}

export default Decode