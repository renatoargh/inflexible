# inflexible

Private properties and immutability for JavaScript objects 

### Installation

```bash
npm install --save inflexible
```

### Usage
```javascript
const Inflexible = require('inflexible')

const hidden = {
  name: Symbol('name'),
  age: Symbol('age')
}

class Person extends Inflexible {
  constructor(params) {
    super(params, hidden)
  }

  static build (name, age) {
    return new Schema({
      [hidden.name]: name,
      [hidden.age]: age
    })
  }

  get name () {
    return this[hidden.name]
  }

  withName (name) {
    return clone({ [hidden.name]: name })
  }

  get age () {
    return this[hidden.age]
  }

  withAge (age) {
    return clone({ [hidden.age]: age })
  }
}
```

### License
MIT
