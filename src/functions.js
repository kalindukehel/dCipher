function offset(a){ //determines how many characters away from 'A' or 'a'
    let b = a
    if(b>= 65 && b<=90){
        return (b-65);
    }else if(b>=97 && b<=122){
        return (b-97);
    }
    return(0);
}

function letterCount(str) {
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

function chiSquare(str,shift,textFreq){ //uses Chi Square formula to determine distribution from given text
    let b
    let total = 0
    let n = letterCount(str)
    const EF = [0.08167,0.01492,0.02782,0.04253,0.12702,0.02228,0.02015,0.06094,0.06966,0.00153,0.00772,0.04025,0.02406,0.06749,0.07707,0.01929,0.00095,0.05987,0.06324,0.09056,0.02758,0.00978,0.02360,0.00150,0.01974,0.00074]
    for(b=0;b<26;b++){
        let c = b+65
        total+= (((n*EF[offset(c)] - textFreq[offset(encode(c,shift))])*(letterCount(str) * EF[offset(c)] - textFreq[offset(encode(c,shift))]) )/(n*n*EF[offset(c)]))
    }
    return(total)
}

function frequencyTable(str){
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

function encodeShift(str){ //determines the shift used to encode the string
    let i
    let lowest = 10
    let low
    for(i=0;i<26;i++){
        let fTable = frequencyTable(str)
        let temp = chiSquare(str,i,fTable)
        if(temp<= lowest){
            lowest=temp
            low = i
        }
    }
    if(lowest>=3){low=0}
    return(low)
}
function encode(c,shift){ //encodes a character with a given shift
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

function encodeString(str,shift){ //takes in a string and encodes it with given shift
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

function toDecode(shift){ //returns the oposite shift to decode a given shift
    return(shift===0?0:26-shift)
}


function decode(str,decodeshift){ //returns decoded string
    let i = 0
    let temp = ""
    for(i=0;i<str.length;i++){
        temp += encode(str[i],decodeshift)
    }
    return(temp)
}

export {chiSquare, decode, encode, encodeShift, encodeString, frequencyTable,letterCount,offset,toDecode}