class Inflexible {
  constructor (params = {}, hidden = {}) {
    if (Object.keys(params).length) {
      throw new Error('params may only contain symbol properties')
    }

    const hiddenSymbols = Object.values(hidden)
    if (hiddenSymbols.some(h => typeof h !== 'symbol')) {
      throw new Error('hidden may only contain symbol values')
    }

    hiddenSymbols.forEach(symbol => {
      this[symbol] = params[symbol]
    })

    Object.freeze(this)
  }

  clone (withAttributes) {
    const nonPrivate = Object.getOwnPropertyNames(this)
    if (nonPrivate.length) {
      throw new Error('instance has non-private properties: ' + nonPrivate.join(', '))
    }

    const clone = {}
    Object.getOwnPropertySymbols(this).forEach(symbol => {
      clone[symbol] = this[symbol]
    })

    Object.assign(clone, withAttributes)

    const Class = this.constructor
    return new Class(clone)
  }
}

module.exports = Inflexible
