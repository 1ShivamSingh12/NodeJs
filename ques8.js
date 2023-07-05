
console.log('start')

setTimeout(() => {
  console.log('setTimeout')
})

Promise.resolve().then(() => {
  console.log('resolve')
})

console.log('end')


// output will be

// start
// end
// resolve
// setTimeout

// So start and end are printed synchronously and setTimeout and promise is pushed in the event loop but promise is resolved first because it is handled
//  in microtask queue which have higher priority then callback queue and setTimeout in callback queue