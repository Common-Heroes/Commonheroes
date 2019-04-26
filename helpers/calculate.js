function Clc(operator ,num1, num2){
    num1 = Number(num1)
    num2 = Number(num2)
    if (operator == 'add' || operator == '+'){
        return num1 + num2
    }
    else if (operator == 'substract' || operator == '-'){
        return num1 - num2
    }
    else if (operator == 'multiply' || operator == 'times' || operator == '*'){
        return num1 * num2
    }
    else if (operator == 'divide' || operator == '/'){
        return num1 / num2
    }
}

module.exports = Clc