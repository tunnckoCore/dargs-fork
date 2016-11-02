/*!
 * dargs-fork <https://github.com/tunnckoCore/dargs-fork>
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

let test = require('mukla')
let deepEqual = require('lodash.isequal')
let dargs = require('./index')

const fixture = {
  _: ['some', 'option'],
  a: 'foo',
  b: true,
  c: false,
  d: 5,
  e: ['foo', 'bar'],
  f: null,
  g: undefined,
  h: 'with a space',
  i: 'let\'s try quotes',
  camelCaseCamel: true
}

test('convert options to cli flags', function (done) {
  deepEqual(dargs(fixture), [
    '--a=foo',
    '--b',
    '--no-c',
    '--d=5',
    '--e=foo',
    '--e=bar',
    '--h=with a space',
    '--i=let\'s try quotes',
    '--camel-case-camel',
    'some',
    'option'
  ])
  done()
})

test('raises a TypeError if  \'_\' value is not an Array', function (done) {
  test.throws(dargs.bind(dargs, {a: 'foo', _: 'baz'}), TypeError)
})

test('useEquals options', function (done) {
  deepEqual(dargs(fixture, {
    useEquals: false
  }), [
    '--a', 'foo',
    '--b',
    '--no-c',
    '--d', '5',
    '--e', 'foo',
    '--e', 'bar',
    '--h', 'with a space',
    '--i', 'let\'s try quotes',
    '--camel-case-camel',
    'some',
    'option'
  ])
  done()
})

test('exclude options', function (done) {
  deepEqual(dargs(fixture, {excludes: ['b', /^e$/, 'h', 'i']}), [
    '--a=foo',
    '--no-c',
    '--d=5',
    '--camel-case-camel',
    'some',
    'option'
  ])
  done()
})

test('includes options', function (done) {
  deepEqual(dargs(fixture, {
    includes: ['a', 'c', 'd', 'e', /^camelCase.*/]
  }), [
    '--a=foo',
    '--no-c',
    '--d=5',
    '--e=foo',
    '--e=bar',
    '--camel-case-camel'
  ])
  done()
})

test('excludes and includes options', function (done) {
  deepEqual(dargs(fixture, {
    excludes: ['a', 'd'],
    includes: ['a', 'c', /^[de]$/, 'camelCaseCamel']
  }), [
    '--no-c',
    '--e=foo',
    '--e=bar',
    '--camel-case-camel'
  ])
  done()
})

test('option to ignore false values', function (done) {
  deepEqual(dargs({foo: false}, {ignoreFalse: true}), [])
  done()
})

test('aliases option', function (done) {
  deepEqual(dargs({a: 'foo', file: 'test'}, {
    aliases: {file: 'f'}
  }), [
    '--a=foo',
    '-f', 'test'
  ])
  done()
})

test('includes and aliases options', function (done) {
  deepEqual(dargs(fixture, {
    includes: ['a', 'c', 'd', 'e', 'camelCaseCamel'],
    aliases: {a: 'a'}
  }), [
    '-a', 'foo',
    '--no-c',
    '--d=5',
    '--e=foo',
    '--e=bar',
    '--camel-case-camel'
  ])
  done()
})

test('camelCase option', function (done) {
  deepEqual(dargs(fixture, {
    allowCamelCase: true
  }), [
    '--a=foo',
    '--b',
    '--no-c',
    '--d=5',
    '--e=foo',
    '--e=bar',
    '--h=with a space',
    '--i=let\'s try quotes',
    '--camelCaseCamel',
    'some',
    'option'
  ])
  done()
})
