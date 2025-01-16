/**
 * You find a strange mirror that always shows a hand that is moving. The hand appears to be alive, and after a lot of questions of "yes" and "no" answer, you know that the hand is trying to teach you a program that is written in HPL (Hand Programming Language).
 * This language works with a memory of an indefinite size of bytes, with all values initialized to 0. This language haves 7 action:
 *👉 : moves the memory pointer to the next cell
 *👈 : moves the memory pointer to the previous cell
 *👆 : increment the memory cell at the current position
 *👇 : decreases the memory cell at the current position.
 *🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
 *🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
 *👊 : Display the current character represented by the ASCII code defined by the current position.
 */

const MIN_CELL = 0
const MAX_CELL = 255

const clamp = (value) => {
  if (value > MAX_CELL) return MIN_CELL
  if (value < MIN_CELL) return MAX_CELL
  return value
}

const getNextFistIndex = (index, instructions) => {
  let fists = 1
  for (let i = index + 1; i < instructions.length; i++) {
    if (instructions[i] === '🤜') fists++
    if (instructions[i] === '🤛') fists--
    if (fists === 0) return i
  }
}

const getPrevFistIndex = (index, instructions) => {
  let fists = 1
  for (let i = index - 1; i >= 0; i--) {
    if (instructions[i] === '🤛') fists++
    if (instructions[i] === '🤜') fists--
    if (fists === 0) return i
  }
}

const INVALID_ARG_ERROR = 'The function receives a string as an argument'
const INVALID_ARG_PATTERN_ERROR = 'TThe string must be a set of hand emoji characters like: 👉👈👆👇🤜🤛👊'

const pattern = /^[👉👈👆👇🤜🤛👊]+$/u

function translate(string) {
  if (arguments.length !== 1) throw new Error(INVALID_ARG_ERROR)

  if (typeof string !== 'string') throw new Error(INVALID_ARG_ERROR)

  if (!pattern.test(string)) throw new Error(INVALID_ARG_PATTERN_ERROR)

  const memory = [0]

  let pointer = 0
  let index = 0
  let output = ''

  const arrayOfInstructions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] ??= 0
    },
    '👈': () => {
      pointer--
      memory[pointer] ??= 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        index = getNextFistIndex(index, arrayOfInstructions)
      }
    },
    '🤛': () => {
      if (memory[pointer] !== 0) {
        index = getPrevFistIndex(index, arrayOfInstructions)
      }
    },
    '👊': () => {
      output += String.fromCharCode(memory[pointer])
    }
  }

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index]
    actions[action]()
    index++
  }

  return output
}

translate(
  '👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊'
)

module.exports = { translate, INVALID_ARG_ERROR, INVALID_ARG_PATTERN_ERROR }
