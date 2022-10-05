# mqfunctions

[![Test Status](https://github.com/kimulaco/mqfunctions/workflows/Test/badge.svg)](https://github.com/kimulaco/mqfunctions/actions)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/mqfunctions.svg)](https://badge.fury.io/js/mqfunctions)

JavaScript library to manage matchMedia handlers.

## Install

```bash
npm install mqfunctions
```

## Use

```js
import { createMqFunctions } from 'mqfunctions'

const mqf = createMqFunctions('(min-width: 768px)')

// Add matchMedia handler
mqf.add('function-01', (event) => {
  if (event.matches) {
    console.log('Resized window to PC size!')
  } else {
    console.log('Resized window to SP size!')
  }
})

// Run handler arbitrarily
mqf.run('function-01')

// Remove handler
mqf.remove('function-01')
```

## License

[MIT License](LICENSE).
