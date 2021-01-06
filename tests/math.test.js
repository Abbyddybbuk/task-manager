const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Tip Calculation', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Default Tip Calculation', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('FTOC', ()=> {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('CTOF', ()=> {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})