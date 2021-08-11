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
    else if(operator=='/'){
      if (b==0) return 'YOU SHALL NOT PASS \nno kidding, you may pass but you shall not divide by zero'
      else return divide(a,b)
    }
}

function findButtonType(buttonClicked){
    let typeOfButton
    if (buttonClicked.classList.contains('numberbutton') ) typeOfButton= 'number'
    else if (buttonClicked.id == 'buttondot') typeOfButton= 'dot'
    else if (buttonClicked.classList.contains('operator') ) typeOfButton= 'operator'
    else if (buttonClicked.id == 'buttonequals') typeOfButton= 'equalssign'
    else typeOfButton='clear'
    return typeOfButton
}

function calculator(){
  let a=''
  let b=''
  let operator=''
  let result=''
  const displayScreen=document.querySelector('#display')
  const buttons=document.querySelectorAll('button')
  for(i=0;i<buttons.length;i++){
  buttons[i].addEventListener('click',(event)=>{
          let buttonClicked = event.target
          let typeOfButton = findButtonType(buttonClicked) 
          let textOfButtonClicked=buttonClicked.innerText
          if (typeOfButton== 'number'){
                if (operator=='') a+=textOfButtonClicked
                else b+=textOfButtonClicked
          }
          else if (typeOfButton== 'dot') {
              if (operator==''){
                if (a==''){
                  a='0.'
                }
                else{
                  if (a.indexOf('.') < 0) a+='.'
                }
              }
              else{
                if (b==''){
                  b='0.'
                }
                else{
                  if (b.indexOf('.') < 0) b+='.'
                }
              }
          }
          else if (typeOfButton== 'operator') {
              if (a.split("").pop()=='.') a+='0'
              if (a=='') {    
                a=''
                b=''
                operator = ''
                result = ''
                displayScreen.innerText = ''
              }
              else{
                if (b!=''){                
                  result = operate(a, b, operator)
                  a = result.toString()
                  b = ''
                  result = ''
                }                  
                operator=textOfButtonClicked
              } 
          }
          else if (typeOfButton== 'equalssign') {
              if(a!='' && b==''){
                if (a.split("").pop()=='.') a+=0
                result = a
                a=result
                b=''
                operator=''
                result=''
              }
              else if(a!='' && operator!='' && b!=''){
                if (b.split("").pop()=='.') b+=0
                result = operate(a, b, operator)
                a=result.toString()
                b=''
                operator=''
                result=''              }
          }
          else if (typeOfButton=='clear'){
            a=''
            b=''
            operator=''
            result=''
          }       
          displayScreen.innerText=a+operator+b+result
  })
}
}

calculator()