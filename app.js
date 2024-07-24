const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calc_keys")
const display = document.querySelector(".calc_display")

const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === "divide") {
        result = parseFloat(n1) / parseFloat(n2)
    }
    return result
}

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"))

        if(!action) {
            if (displayNum === "0" || previousKeyType === "operator") {
                display.textContent = keyContent
            } else {
                display.textContent = displayNum + keyContent
            }
        }
        
        if (action === "decimal") {
            display.textContent = displayNum + "."
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
             key.classList.add('is-depressed')
             calculator.dataset.previousKeyType = "operator"
             calculator.dataset.firstValue = displayNum
             calculator.dataset.operator = action
        }
        if (action === "clear") return 0

        if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
})

 