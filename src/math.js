const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8

const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32
const add = (a, b)=> {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (a < 0 || b < 0)
               reject('Numbers cannot be negative')
            resolve(a + b)
        }, 1000)
    })
}
module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}
