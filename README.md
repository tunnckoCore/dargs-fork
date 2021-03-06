# [dargs-fork][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Patch for the [dargs][] package, that adds support for single flags. Convert an object of options into an array of command-line arguments.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

### See readme of [dargs][]!
That's just a fork with patch for single flag support, [sindresorhus/dargs#32](https://github.com/sindresorhus/dargs/issues/32) - PRs there are welcome, so if you want create one and please ping me. :)

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i dargs-fork --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const dargs = require('dargs-fork')

const input = {
    _: ['some', 'option'],          // values in '_' will be appended to the end of the generated argument list
    foo: 'bar',
    hello: true,                    // results in only the key being used
    cake: false,                    // prepends `no-` before the key
    camelCase: 5,                   // camelCase is slugged to `camel-case`
    multiple: ['value', 'value2'],  // converted to multiple arguments
    pieKind: 'cherry',
    sad: ':('
}

const excludes = ['sad', /.*Kind$/]  // excludes and includes accept regular expressions
const includes = ['camelCase', 'multiple', 'sad', /^pie.*/]
const aliases = {file: 'f'}

console.log(dargs(input, {excludes}))
/*
[
    '--foo=bar',
    '--hello',
    '--no-cake',
    '--camel-case=5',
    '--multiple=value',
    '--multiple=value2',
    'some',
    'option'
]
*/

console.log(dargs(input, {excludes, includes}))
/*
[
    '--camel-case=5',
    '--multiple=value',
    '--multiple=value2'
]
*/

console.log(dargs(input, {includes}))
/*
[
    '--camel-case=5',
    '--multiple=value',
    '--multiple=value2',
    '--pie-kind=cherry',
    '--sad=:('
]
*/

console.log(dargs({
    foo: 'bar',
    hello: true,
    file: 'baz'
}, {aliases}))
/*
[
    '--foo=bar',
    '--hello',
    '-f', 'baz'
]
*/
```

## Related
- [dargs](https://www.npmjs.com/package/dargs): Reverse minimist. Convert an object of options into an array of command-line… [more](https://github.com/sindresorhus/dargs#readme) | [homepage](https://github.com/sindresorhus/dargs#readme "Reverse minimist. Convert an object of options into an array of command-line arguments.")
- [gitclone-cli](https://www.npmjs.com/package/gitclone-cli): Simple command line interface for the `git clone` command, using [gitclone][] and… [more](https://github.com/tunnckocore/gitclone-cli#readme) | [homepage](https://github.com/tunnckocore/gitclone-cli#readme "Simple command line interface for the `git clone` command, using [gitclone][] and [cross-spawn][]")
- [gitclone](https://www.npmjs.com/package/gitclone): Powerful and flexible programmatic interface for the `git clone` command, using [gitclone-defaults… [more](https://github.com/tunnckocore/gitclone#readme) | [homepage](https://github.com/tunnckocore/gitclone#readme "Powerful and flexible programmatic interface for the `git clone` command, using [gitclone-defaults][] and [cross-spawn][]")
- [minibase](https://www.npmjs.com/package/minibase): MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [unzy](https://www.npmjs.com/package/unzy): Minimalist, extremely pluggable, programmatic Git interface for node.js, built on MiniBase.  | [homepage](https://github.com/tunnckocore/unzy#readme "Minimalist, extremely pluggable, programmatic Git interface for node.js, built on MiniBase. ")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/dargs-fork/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[npmjs-url]: https://www.npmjs.com/package/dargs-fork
[npmjs-img]: https://img.shields.io/npm/v/dargs-fork.svg?label=dargs-fork

[license-url]: https://github.com/tunnckoCore/dargs-fork/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/dargs-fork.svg

[downloads-url]: https://www.npmjs.com/package/dargs-fork
[downloads-img]: https://img.shields.io/npm/dm/dargs-fork.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/dargs-fork
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/dargs-fork.svg

[travis-url]: https://travis-ci.org/tunnckoCore/dargs-fork
[travis-img]: https://img.shields.io/travis/tunnckoCore/dargs-fork/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/dargs-fork
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/dargs-fork.svg

[david-url]: https://david-dm.org/tunnckoCore/dargs-fork
[david-img]: https://img.shields.io/david/tunnckoCore/dargs-fork.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

[base]: https://github.com/node-base/base
[cross-spawn]: https://github.com/IndigoUnited/node-cross-spawn
[dargs]: https://github.com/sindresorhus/dargs
[gitclone-defaults]: https://github.com/tunnckocore/gitclone-defaults
[gitclone]: https://github.com/tunnckocore/gitclone