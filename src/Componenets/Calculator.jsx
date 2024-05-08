/* eslint-disable no-prototype-builtins */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DisplayWindow from './DisplayWindow'
import KeyWindow from './KeyWindow'

const Calculator = () => {

    const [expression,setExpression] = useState("");
    const [displayEXP,setDisplayEXP] = useState("");
    const [result,setResult] = useState("0");

    const sciFunc = {
        sin: "Math.sin",
        cos: "Math.cos",
        tan: "Math.tan",
        ln: "Math.log",
        log: "Math.log10",
        π: "Math.PI",
        e: "Math.E",
        "^":"**",
        "√":"Math.sqrt",
    };

    function calcResult(){
        if(expression.length !== 0){
            try{
                let compute = eval(expression);
                compute = parseFloat(compute.toFixed(4))
                setResult(compute);
            }
            catch(error)
            {
                setResult("error !")
            }
        }
        else{
            setResult("error !")
        }
    }

    function handleButton(value){
        // console.log(value);
        if(value === "AC")
        {
            setExpression("");
            setDisplayEXP("");
            setResult("0");
        }
        else if(value === "DEL")
        {
            setDisplayEXP(displayEXP.slice(0,-1));
            setExpression(expression.slice(0,-1));
        }
        else if (sciFunc.hasOwnProperty(value))
        {
            setDisplayEXP(displayEXP + value);
            setExpression(expression + sciFunc[value]);
        }
        else if(value === "!")
        {
            const lastnum = extractLastNum(expression);
            if(lastnum != null){
                const num = parseFloat(lastnum);
                setDisplayEXP(displayEXP + value);
                setExpression(expression.replace(lastnum,factorial(num)));
            }
        }
        else if ( value === "=")
        {
            calcResult();
        }
        else{
            setExpression(expression + value);
            setDisplayEXP(displayEXP + value);
        }
    }

    function factorial(n){
        let result = 1;
        for(let i=2;i<=n;i++)
        {
            result *= i;
        }
        return result;
    }

    function extractLastNum(exp){
        const numbers = exp.match(/\d+/g);
        return numbers ? numbers[numbers.length -1] : null;
    }

    return (
    <div className="calculator">
        <DisplayWindow expression ={displayEXP} 
        result ={result}/>
        <KeyWindow handleButton = {handleButton}/>

    </div>
    );
}

export default Calculator