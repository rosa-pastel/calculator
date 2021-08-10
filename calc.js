function add(a,b){
    return a+b
}
function subtract(a,b){
    return a-b
}
function multiply(a,b){
    return a*b
}
function divide(a,b){
    return a/b
}
function operate(a,b,operator){
    a= Number(a)
    b= Number(b)
    if (operator=='+') return add(a,b)
    else if (operator=='-') return subtract(a,b)
    else if (operator=='*') return multiply(a,b)
    else if(operator=='/') return divide(a,b)
}
function resetEverything(){
    a=''
    b=''
    operator=''
    result=''
    displayScreen.innerText=''
}
function resetEverythingButResult(){
    a=result
    b=''
    operator=''
    result=''
}
function findButtonType(){
    if (buttonClicked.classList.contains('numberbutton') ) typeOfButton= 'number'
    else if (buttonClicked.id == 'buttondot') typeOfButton= 'dot'
    else if (buttonClicked.classList.contains('operator') ) typeOfButton= 'operator'
    else if (buttonClicked.id == 'buttonequals') typeOfButton= 'equalssign'
    else typeOfButton='clear'
}
function decideNextStepByButtonType(){
    valueOfButtonClicked=buttonClicked.innerText
    if (typeOfButton== 'number'){
        displayScreen.innerText+=valueOfButtonClicked
        if (operator=='') a+=valueOfButtonClicked
        else b+=valueOfButtonClicked
    }
    else if (typeOfButton== 'dot') {
        valueOfButtonClicked='0.'
        document.addEventListener('click',(event)=> {
            buttonClicked=event.target
            findButtonType()
            if (typeOfButton=='number'){
                valueOfButtonClicked=buttonClicked.innerText
                displayScreen.innerText+=valueOfButtonClicked
                if (operator=='') a+=valueOfButtonClicked
                else b+=valueOfButtonClicked
            }
            else{
                resetEverything()
            }
        })
    }
    else if (typeOfButton== 'operator') {
        if (a=='') resetEverything()
        else operator=valueOfButtonClicked
        displayScreen.innerText+=operator
    }
    else if (typeOfButton== 'equalssign') {
        if(a!='' && operator==''){
            result= a
        }
        else{
            result= operate(a, b, operator)
        }
        displayScreen.innerText=result
        resetEverythingButResult()
    }
    else if (typeOfButton=='clear'){
      resetEverything()
    }
}

let a=''
let b=''
let operator=''
let result=''
let buttonClicked
let valueOfButtonClicked
let typeOfButton

let displayScreen=document.querySelector('#display')

document.addEventListener('click',(event)=>{
        buttonClicked=event.target
        findButtonType(buttonClicked)
        decideNextStepByButtonType()
})
