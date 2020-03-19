import React from "react"

class Decode extends React.Component{
    constructor(){
        super()
        this.state={
            decodeText: "",
            decoded: ""
        }
        this.onHandle = this.onHandle.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }

    onHandle(event){ //takes in events from text input and changes state
        this.setState({
            decodeText: event.target.value
        })
    }

    offset(a){
        let b = a
        if(b>= 65 && b<=90){
            return (b-65);
        }else if(b>=97 && b<=122){
            return (b-97);
        }
        return(0);
    }

    letterCount(str) {
        let i
        let count = 0
        for (i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i)
            if ((c >= 97 && c <= 122) || (c >= 65 && c <= 90)){
                count++;
            }
        }
        return (count);
    }

    chiSquare(str,shift,textFreq){ //uses Chi Square formula to determine distribution from given text
        let b
        let total = 0
        let n = this.letterCount(str)
        const EF = [0.08167,0.01492,0.02782,0.04253,0.12702,0.02228,0.02015,0.06094,0.06966,0.00153,0.00772,0.04025,0.02406,0.06749,0.07707,0.01929,0.00095,0.05987,0.06324,0.09056,0.02758,0.00978,0.02360,0.00150,0.01974,0.00074]
        for(b=0;b<26;b++){
            let c = b+65
            total+= (((n*EF[this.offset(c)] - textFreq[this.offset(this.encode(c,shift))])*(this.letterCount(str) * EF[this.offset(c)] - textFreq[this.offset(this.encode(c,shift))]) )/(n*n*EF[this.offset(c)]))
        }
        return(total)
    }
    
    frequencyTable(str){
        let frequency = new Array(26).fill(0)
        let i
        for(i=0;i<str.length;i++){
            let c = str.charCodeAt(i)
            if(c >=97 && c <=122){
                frequency[c - 97]++;
              }else if(c >=65 && c<=90){
                frequency[c - 65]++;
              }
        }
        return(frequency)
    }
    
    encodeShift(str){
        let i
        let lowest = 10
        let low
        for(i=0;i<26;i++){
            let fTable = this.frequencyTable(str)
            let temp = this.chiSquare(str,i,fTable)
            if(temp<= lowest){
                lowest=temp
                low = i
            }
        }
        if(lowest>=3){low=0}
        return(low)
    }
    encode(c,shift){
        let j;
        if((c>=65 && c<=90) || (c>=97 && c<=122) ){
          if(shift>0){
            for(j=0; j<shift;j++){
              if(c === 90){
                c = 65;
              }else if(c === 122){
                c = 97;
              }else{
                c++;
              }
            }
          }
        }
        return(c);
    }
    
    encodeString(str,shift){ //takes in a string and encodes it with given shift
        let i=0
        let j = 0
        let temp =""
        for(i=0;i<str.length;i++){
            let c = str.charCodeAt(i)
            if((c>=65 && c<=90) || (c>=97 && c<=122)){
                if(shift>0){
                    for(j=0;j<shift;j++){
                        if(c===90){
                            c=65
                        }else if(c===122){
                            c = 97
                        }else{
                            c++
                        }
                    }
                }
            }
            temp += String.fromCharCode(c)
        }
        return(temp)
    }

    toDecode(shift){ //returns the oposite shift to decode a given shift
        return(26-shift)
    }


    decode(str,decodeshift){ //returns decoded string
        let i = 0
        let temp = ""
        for(i=0;i<str.length;i++){
            temp += this.encode(str[i],decodeshift)
        }
        return(temp)
    }

    buttonClick(){
        let decodeShift  = this.encodeShift(this.state.decodeText)
        this.setState(()=>{
            let temp = this.encodeString(this.state.decodeText,this.toDecode(decodeShift))
            return({decoded:temp})
        })
    }

    render(){
        return(
            <div>
                <input type ="text" placeholder="Text to decode" onChange={this.onHandle} />
                <button onClick={this.buttonClick}>Submit</button>
                <h1>{this.state.decoded}</h1>
            </div>
        )
    }
}

export default Decode