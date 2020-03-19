import React from "react"

class Decode extends React.Component{
    constructor(){
        super()
        this.state={
            decodeText: "",
            decoded: ""
        }
        this.onHandle = this.onHandle.bind(this)
        this.decode = this.decode.bind(this)
    }

    onHandle(event){ //takes in events from text input and changes state
        this.setState({
            decodeText: event.target.value
        })
    }
    decode(){
        this.setState(()=>{
            let i = 0
            let temp = ""
            for(i=0;i<this.state.decodeText.length;i++){
                temp+= String.fromCharCode(this.state.decodeText[i].charCodeAt() + 1)
            }
            return({decoded:temp})
        })
    }

    render(){
        return(
            <div>
                <input type ="text" placeholder="Text to decode" onChange={this.onHandle} />
                <button onClick={this.decode}>Submit</button>
                <h1>{this.state.decoded}</h1>
            </div>
        )
    }
}

export default Decode