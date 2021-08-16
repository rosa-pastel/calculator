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
    if (operator=='+') return +add(a,b).toFixed(12)
    else if (operator=='-') return +subtract(a,b).toFixed(12)
    else if (operator=='*') return +multiply(a,b).toFixed(12)
    else if(operator=='/'){
      if (b==0) return 'YOU SHALL NOT PASS \nno kidding, you may pass but you shall not divide by zero'
      else return +divide(a,b).toFixed(12)
    }
}

function findButtonType(buttonClicked){
    let typeOfButton
    if (buttonClicked.classList.contains('numberbutton') ) typeOfButton= 'number'
    else if (buttonClicked.id == 'buttondot') typeOfButton= 'dot'
    else if (buttonClicked.classList.contains('operator') ) typeOfButton= 'operator'
    else if (buttonClicked.id == 'buttonequals') typeOfButton= 'equalssign'
    else if (buttonClicked.id == 'backspace') typeOfButton= 'backspace'
    else typeOfButton='clear'
    return typeOfButton
}

function calculator(){
  let a=''
  let b=''
  let operator=''
  let result=''
  let errorMessage=''
  const displayScreen=document.querySelector('#display')
  const buttons=document.querySelectorAll('button')
  for(i=0;i<buttons.length;i++){
  buttons[i].addEventListener('click',(event)=>{
          let buttonClicked = event.target
          let typeOfButton = findButtonType(buttonClicked) 
          let textOfButtonClicked=buttonClicked.innerText
          if (typeOfButton== 'number'){
            errorMessage=''
                if (operator=='') a+=textOfButtonClicked
                else b+=textOfButtonClicked
          }
          else if (typeOfButton== 'dot') {
            errorMessage=''
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
            errorMessage=''
              if (a.split("").pop()=='.') a+='0'
              if (a=='') {
                if (textOfButtonClicked=='-'){
                  a='-'
                } 
                else{   
                a=''
                b=''
                operator = ''
                result = ''
                displayScreen.innerText = ''
                }
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
                result = +a.toFixed(12)
                a=result
                b=''
                operator=''
                result=''
              }
              else if(a!='' && operator!='' && b!=''){
                if (b.split("").pop()=='.') b+=0
                result = operate(a, b, operator)
                if (result=='YOU SHALL NOT PASS \nno kidding, you may pass but you shall not divide by zero'){
                  a=''
                  errorMessage='YOU SHALL NOT PASS \nno kidding, you may pass but you shall not divide by zero'
                }
                else{ 
                  a = result.toString()
                }
                b=''
                operator=''
                result=''
              }
          }
          else if (typeOfButton=='clear'){
            a=''
            b=''
            operator=''
            result=''
            errorMessage=''
          }       
          else if (typeOfButton=='backspace'){
            if (errorMessage!=''){
              errorMessage=''
            }
            else if (b!=''){
              b=b.slice(0,-1)
            }
            else if (operator!=''){
              operator=''
            }
            else if (a!=''){
              a=a.slice(0,-1)
            }
          }
          displayScreen.innerText=a+operator+b+result+errorMessage
  })
}
}

calculator()