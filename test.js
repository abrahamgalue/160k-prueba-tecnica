/* global test, expect, describe */
const { translate, INVALID_ARG_ERROR, INVALID_ARG_PATTERN_ERROR } = require('./index.js')

describe('translate hand language - Argument Validation', () => {
  test('should throw an error if the argument is empty', () => {
    expect(() => translate()).toThrow(INVALID_ARG_ERROR)
  })

  test('should throw an error if the argument type does not match a string', () => {
    expect(() => translate(5)).toThrow(INVALID_ARG_ERROR)
    expect(() => translate(true)).toThrow(INVALID_ARG_ERROR)
    expect(() => translate([])).toThrow(INVALID_ARG_ERROR)
    expect(() => translate({})).toThrow(INVALID_ARG_ERROR)
    expect(() => translate(null)).toThrow(INVALID_ARG_ERROR)
    expect(() => translate(undefined)).toThrow(INVALID_ARG_ERROR)
  })

  test('Should throw an error if the string does not match the hand emoji pattern', () => {
    expect(() => translate('Hello World!')).toThrow(INVALID_ARG_PATTERN_ERROR)
  })
})

describe('translate hand language - Results', () => {
  test('it translate "Hello" accordingly', () => {
    expect(
      translate(
        '👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'
      )
    ).toBe('Hello')
  })

  test('it translate "Hello World!" accordingly', () => {
    expect(
      translate(
        '👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊'
      )
    ).toBe('Hello World!\n')
  })
})
