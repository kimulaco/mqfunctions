const { createMqFunctions, addMqFunction, runMqFunction } = window.Mqfunctions

const setupPcCheck = () => {
  const MQF_FUNC_ID = 'fn-pc-check'
  const element = document.getElementById('pc-check')
  const mqf = createMqFunctions('(min-width: 768px)')
  addMqFunction(mqf, MQF_FUNC_ID, (event) => {
    if (event.matches) {
      element.innerText = 'is matche!'
    } else {
      element.innerText = 'is not matche'
    }
  })
  runMqFunction(mqf, MQF_FUNC_ID)
}

setupPcCheck()
