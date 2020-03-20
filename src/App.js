import React from "react"
import Decode from "./Decode"
import Attempt from "./Attempt"
import "./App.css"
import {encodeString} from "./functions"

class App extends React.Component {
  constructor(){
    super()
    this.state ={
      attempts:[],
      show:false,
      decodeText: "",
      correctShift: 0
    }
    this.showAll = this.showAll.bind(this)
    this.updateDecodeText = this.updateDecodeText.bind(this)
    this.updateCorrectShift = this.updateCorrectShift.bind(this)
    this.setShow = this.setShow.bind(this)
  }
  updateDecodeText(str){ //to update the correct decoded text
    this.setState({
      decodeText:str
    })
  }

  updateCorrectShift(x,callback){ //to update the shift used to decode the text
    this.setState({
      correctShift:x
    },callback)  //callback function calls showAll if sent in with args
  }

  
  setShow(bool){ //toggles between showing default vs showing all
    if(bool !== this.state.show){
      this.showAll()
    }
  }

  showAll(){ //toggle show and hide all
    let x = []
    let j
    if(!this.state.show){
      for(j=0;j<26;j++){
        x.push(<Attempt style={{height:"auto"}} color={j===this.state.correctShift?"rgb(12, 180, 76)":null} value = {j} key={j} decoded={encodeString(this.state.decodeText,j)} />)
      }
      this.setState({
        attempts:<div className="attemptcontainer">{x}</div>,
        show: true
      })
    }else{
      this.setState({
        attempts:[],
        show: false
      })
    }

  }
  render() {
    return (
      <div>
        <div className="logocontainer">
          <h1>dCipher</h1>
        </div>
        <Decode show={!this.state.show} showAll={this.showAll} updateDecodeText={this.updateDecodeText} updateCorrectShift={this.updateCorrectShift} setShow={this.setShow} />
        {this.state.attempts}
      </div>
    )
  }
}


export default App