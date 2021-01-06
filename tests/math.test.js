const { calculateTip } = require('../src/math')

test('Tip Calculation', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Default Tip Calculation', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})