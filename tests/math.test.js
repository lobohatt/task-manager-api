const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math.js')


test('Should calculate total with tip', () => {

  const total = calculateTip(10, .2)
  expect(total).toBe(12)


})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5)
})

test('fahrenheit To Celsius', () => {
  const celcius = fahrenheitToCelsius(32);
  expect(celcius).toBe(0)
});

test('celsius To Fahrenheit', () => {
  const fahrenheit = celsiusToFahrenheit(0);
  expect(fahrenheit).toBe(32)
})

/*test('Async test demo', (done) => {
  setTimeout(() => {
    expect(1).toBe(2)
    done()
  }, 2000);
});*/

test('Should add two number', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
});

test('Should add two number', async () => {
  const sum = await add(10, 2);
  expect(sum).toBe(12)
});