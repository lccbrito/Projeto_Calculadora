const previousOpText = document.querySelector('#previousOperation')
const currentOpText = document.querySelector('#currentOperation')
const buttons = document.querySelectorAll('#btns button')

class Calculator {
    
    constructor(previousOpText, currentOpText) {
        this.previousOpText = previousOpText
        this.currentOpText = currentOpText
        this.currentOp = ''
    }

    addNumber(number) {
        
        if (number === '.' && this.currentOpText.innerText.includes('.')) {
            return
        }

        this.currentOp = number
        this.updateScreenValues()
    }

    allProcesses(operation) {

        if (this.currentOpText.innerText === '' && operation !== 'C') {

            if (this.previousOpText.innerText !== '') {
                this.changeOp(operation)
            }
            return
        }

        let opValue
        let previous = +this.previousOpText.innerText.split(' ')[0]
        let current = +this.currentOpText.innerText

        switch (operation) {
            case '+':
                opValue = previous + current
                this.updateScreenValues(opValue, operation, current, previous)
                break
            case '-':
                opValue = previous - current
                this.updateScreenValues(opValue, operation, current, previous)
                break
            case '*':
                opValue = previous * current
                this.updateScreenValues(opValue, operation, current, previous)
                break
            case '/':
                opValue = previous / current
                this.updateScreenValues(opValue, operation, current, previous)
                break
            case 'CE':
                this.clearOperator()
                break
            case 'C':
                this.clearAllOperator()
                break
            case 'DEL':
                this.delOperator()
                break
            case '=':
                this.equalOperator()
                break
            default:
                break
        }
    }

    updateScreenValues(opValue = null, operation = null, current = null, previous = null) {
        
        if (opValue === null) {
            this.currentOpText.innerText += this.currentOp
        } else {
            if (previous === 0) {
                opValue = current
            }

            this.previousOpText.innerText = `${opValue} ${operation}`
            this.currentOpText.innerText = ''
        }
    }

    changeOp(operation) {
        const mathOp = ['+', '-', '*', '/']

        if (!mathOp.includes(operation)) {
            return
        }

        this.previousOpText.innerText = this.previousOpText.innerText.slice(0, -1) + operation
    }

    clearAllOperator() {
        this.previousOpText.innerText = ''
        this.currentOpText.innerText = ''
    }
    
    clearOperator() {
        this.currentOpText.innerText = ''
    }
    
    delOperator() {
        this.currentOpText.innerText = currentOpText.innerText.slice(0, -1)
    }

    equalOperator() {
        let operation = previousOpText.innerText.split(' ')[1]

        this.allProcesses(operation)
        this.currentOpText.innerText = previousOpText.innerText.split(' ')[0]
        this.previousOpText.innerText = ''
    }
}

const calc = new Calculator(previousOpText, currentOpText)

buttons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const value = event.target.innerText

        if (+value >= 0 || value === '.') {
            calc.addNumber(value)
        } else {
            calc.allProcesses(value)
        }
    })
})