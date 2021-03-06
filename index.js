/*!
 * dargs-fork <https://github.com/tunnckoCore/dargs-fork>
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Released under the MIT license.
 */

'use strict'

const match = (arr, val) => {
  return arr.some(x => {
    return x instanceof RegExp ? x.test(val) : x === val
  })
}

module.exports = function dargsFork (input, opts) {
  const args = []
  let extraArgs = []

  opts = Object.assign({
    useEquals: true
  }, opts)

  const makeArg = (key, val) => {
    let prefix = key.length === 1 ? '-' : '--'
    let theKey = opts.allowCamelCase
      ? key
      : key.replace(/[A-Z]/g, '-$&').toLowerCase()
    key = prefix + theKey

    if (opts.useEquals) {
      args.push(key + (val ? `=${val}` : ''))
    } else {
      args.push(key)

      if (val) {
        args.push(val)
      }
    }
  }

  const makeAliasArg = (key, val) => {
    args.push(`-${key}`)

    /* istanbul ignore next */
    if (val) {
      args.push(val)
    }
  }

  // TODO: use for-of loop and Object.entries when targeting Node.js 6
  Object.keys(input).forEach(key => {
    const val = input[key]
    let pushArg = makeArg

    if (Array.isArray(opts.excludes) && match(opts.excludes, key)) {
      return
    }

    if (Array.isArray(opts.includes) && !match(opts.includes, key)) {
      return
    }

    if (typeof opts.aliases === 'object' && opts.aliases[key]) {
      key = opts.aliases[key]
      pushArg = makeAliasArg
    }

    if (key === '_') {
      if (!Array.isArray(val)) {
        throw new TypeError(`Expected key \`_\` to be Array, got ${typeof val}`)
      }

      extraArgs = val
      return
    }

    if (val === true) {
      pushArg(key, '')
    }

    if (val === false && !opts.ignoreFalse) {
      pushArg(`no-${key}`)
    }

    if (typeof val === 'string') {
      pushArg(key, val)
    }

    if (typeof val === 'number' && !Number.isNaN(val)) {
      pushArg(key, String(val))
    }

    if (Array.isArray(val)) {
      val.forEach(arrVal => {
        pushArg(key, arrVal)
      })
    }
  })

  for (const x of extraArgs) {
    args.push(String(x))
  }

  return args
}
