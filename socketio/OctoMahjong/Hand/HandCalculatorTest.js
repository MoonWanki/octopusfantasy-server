const Tile = require('../Tile')
const isTenpai = require('./HandCalculator').isTenpai
// const isTenpai = () => []

let input, expected

const assert = (flag, input, expected) => {
    const actual = isTenpai(input)
    let logString = ''
    try {
        require('assert').deepEqual(actual, expected)
        logString += `  ${flag}\tPASS\t`
    } catch {
        logString += `  ${flag}\tFAILED\t`
    } finally {
        logString += `기댓값: ${expected.map(t => `(${t.type}, ${t.number})`)}  결과값: ${actual.map(t => `(${t.type}, ${t.number})`)}`
        console.log(logString)
    }
}

// 1-1. 단기
input = [
    new Tile(1, 1), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
    new Tile(3, 2), new Tile(3, 3), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
    new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
]
expected = [ new Tile(1, 1) ]
assert('1-1', input, expected)

// 1-2. 변짱
input = [
    new Tile(1, 1), new Tile(1, 2), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
    new Tile(3, 2), new Tile(3, 3), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
    new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
]
expected = [ new Tile(1, 3) ]
assert('1-2', input, expected)

// // 1-3. 간짱
// input = [
//     new Tile(1, 1), new Tile(1, 3), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
//     new Tile(3, 2), new Tile(3, 3), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2) ]
// assert('1-3', input, expected)

// // 1-4. 치또이쯔 단기 대기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(2, 5), new Tile(2, 5), new Tile(2, 6),
//     new Tile(2, 6), new Tile(2, 7), new Tile(2, 7), new Tile(4, 2), new Tile(4, 2),
//     new Tile(4, 3), new Tile(4, 3), new Tile(5, 2)
// ]
// expected = [ new Tile(5, 2) ]
// assert('1-4', input, expected)

// // 1-5. 국사무쌍 단기 대기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9),
//     new Tile(3, 1), new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 4),
//     new Tile(5, 1), new Tile(5, 2), new Tile(5, 3)
// ]
// expected = [ new Tile(4, 3) ]
// assert('1-5', input, expected)

// // 2-1. 양면
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
//     new Tile(3, 2), new Tile(3, 3), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4) ]
// assert('2-1', input, expected)

// // 2-2. 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 9), new Tile(1, 9), new Tile(3, 1),
//     new Tile(3, 2), new Tile(3, 3), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 9) ]
// assert('2-2', input, expected)

// // 2-3. 노베탄 단기
// input = [
//     new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(3, 1),
//     new Tile(3, 1), new Tile(3, 1), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4) ]
// assert('2-3', input, expected)

// // 2-4. 간짱 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(3, 1),
//     new Tile(3, 1), new Tile(3, 1), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3) ]
// assert('2-4', input, expected)

// // 2-5. 간짱 + 단기 변형형1
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 6), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6) ]
// assert('2-5', input, expected)

// // 2-6. 간짱 + 단기 변형형2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 9),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 8), new Tile(1, 9) ]
// assert('2-6', input, expected)

// // 3-1. 양면 + 양면
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 1), new Tile(3, 1), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7) ]
// assert('3-1', input, expected)

// // 3-2. 단기 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7) ]
// assert('3-2', input, expected)

// // 3-3. 양면 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(4, 1),
//     new Tile(4, 1), new Tile(4, 1), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4) ]
// assert('3-3', input, expected)

// // 3-4. 양면 + 단기 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5) ]
// assert('3-4', input, expected)

// // 3-5. 양면 + 단기 형태 2 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(2, 6), new Tile(2, 6), new Tile(2, 7),
//     new Tile(3, 3), new Tile(3, 3), new Tile(3, 3)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 8) ]
// assert('3-5', input, expected)

// // 3-6. 양면 + 단기 형태 3
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7) ]
// assert('3-6', input, expected)

// // 3-7. 간짱 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 6) ]
// assert('3-7', input, expected)

// // 3-8. 간짱 + 단기 + 단기 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8), new Tile(1, 9),
//     new Tile(4, 1), new Tile(4, 1), new Tile(4, 1)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 9) ]
// assert('3-8', input, expected)

// // 3-9. 간짱 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 6) ]
// assert('3-9', input, expected)

// // 3-10. 간짱 + 양면 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 6), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(4, 4), new Tile(4, 4), new Tile(4, 4)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 9) ]
// assert('3-10', input, expected)

// // 3-11. 간짱 + 양면 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 3), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4) ]
// assert('3-11', input, expected)

// // 3-12. 간짱 + 양면 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6),
//     new Tile(2, 3), new Tile(2, 4), new Tile(2, 5)
// ]
// expected = [ new Tile(1, 3), new Tile(1, 5), new Tile(1, 6) ]
// assert('3-12', input, expected)

// // 3-13. 간짱 + 간짱 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 5), new Tile(2, 7), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 8), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 4) ]
// assert('3-13', input, expected)

// // 3-14. 간짱 + 간짱 + 단기 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 6), new Tile(1, 8), new Tile(1, 8), new Tile(1, 8),
//     new Tile(3, 1), new Tile(3, 2), new Tile(3, 3)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 7) ]
// assert('3-14', input, expected)

// // 3-15. 샤보 + 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(2, 1), new Tile(2, 1),
//     new Tile(3, 7), new Tile(3, 7), new Tile(3, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(2, 1) ]
// assert('3-15', input, expected)

// // 3-16. 양면 + 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(2, 1), new Tile(2, 1), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(2, 1) ]
// assert('3-16', input, expected)

// // 3-17. 양면 + 샤보 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(2, 1), new Tile(2, 1),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(2, 1) ]
// assert('3-17', input, expected)

// // 3-18. 양면 + 양면 + 샤보
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(2, 1), new Tile(2, 1),
//     new Tile(2, 9), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 7), new Tile(2, 1) ]
// assert('3-18', input, expected)

// // 3-19. 샤보 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3) ]
// assert('3-19', input, expected)

// // 4-1. 양면 + 양면
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-1', input, expected)

// // 4-2. 양면 + 양면 형태2
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6) ]
// assert('4-2', input, expected)

// // 4-3. 양면 + 양면 형태3
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6) ]
// assert('4-3', input, expected)

// // 4-4. 양면 + 양면 형태4
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6) ]
// assert('4-4', input, expected)

// // 4-5. 양면 + 양면 형태4 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6), new Tile(1, 6),
//     new Tile(1, 7), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 8), new Tile(1, 9) ]
// assert('4-5', input, expected)

// // 4-6. 양면 + 양면 형태5
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 6),
//     new Tile(1, 6), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 8) ]
// assert('4-6', input, expected)

// // 4-7. 양면 + 양면 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(3, 7), new Tile(3, 8), new Tile(3, 9),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 7) ]
// assert('4-7', input, expected)

// // 4-8. 양면 + 양면 + 단기 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 7) ]
// assert('4-8', input, expected)

// // 4-9. 양면 + 양면 단기 형태3
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-9', input, expected)

// // 4-10. 양면 + 양면 단기 형태4
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 8) ]
// assert('4-10', input, expected)

// // 4-11. 양면 + 양면 + 간짱
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 7) ]
// assert('4-11', input, expected)

// // 4-12. 양면 + 양면 + 간짱 형태4
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7) ]
// assert('4-12', input, expected)

// // 4-13. 양면 + 양면 + 간짱 형태5
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 9) ]
// assert('4-13', input, expected)

// // 4-14. 양면 + 간짱 + 간짱
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6),
//     new Tile(1, 8), new Tile(1, 8), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7) ]
// assert('4-14', input, expected)

// // 4-15. 양면 + 간짱 + 간짱 형태2
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 6), new Tile(1, 6), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-15', input, expected)

// // 4-16. 양면 + 간짱 + 간짱 형태2 변형형1
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(1, 9), new Tile(1, 9), new Tile(1, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-16', input, expected)

// // 4-17. 양면 + 간짱 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 7) ]
// assert('4-17', input, expected)

// // 4-18. 양면 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(3, 7), new Tile(3, 8), new Tile(3, 9),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-18', input, expected)

// // 4-19. 양면 + 단기 + 단기 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6) ]
// assert('4-19', input, expected)

// // 4-20. 양면 + 단기 + 단기 형태2 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6), new Tile(1, 7),
//     new Tile(1, 7), new Tile(1, 8), new Tile(1, 9)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 8), new Tile(1, 9) ]
// assert('4-20', input, expected)

// // 4-21. 간짱 + 간짱 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 8), new Tile(1, 8), new Tile(1, 8),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 6), new Tile(1, 7) ]
// assert('4-21', input, expected)

// // 4-22. 간짱 + 단기 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8), new Tile(1, 9),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 6), new Tile(1, 9) ]
// assert('4-22', input, expected)

// // 4-23. 샤보 + 샤보 + 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-23', input, expected)

// // 4-24. 샤보 + 샤보 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(2, 1), new Tile(2, 1),
//     new Tile(2, 1), new Tile(2, 2), new Tile(2, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(2, 1), new Tile(2, 4) ]
// assert('4-24', input, expected)

// // 4-25. 샤보 + 샤보 + 양면 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(2, 1), new Tile(2, 1)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7), new Tile(2, 1) ]
// assert('4-25', input, expected)

// // 4-26. 양면 + 양면 + 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(2, 1), new Tile(2, 1),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7), new Tile(2, 1) ]
// assert('4-26', input, expected)

// // 4-27. 양면 + 양면 + 샤보 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(2, 1), new Tile(2, 1)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7), new Tile(2, 1) ]
// assert('4-27', input, expected)

// // 4-28. 양면 + 양면 + 샤보 형태3
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(2, 1), new Tile(2, 1),
//     new Tile(2, 1), new Tile(2, 2), new Tile(2, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 7), new Tile(2, 1), new Tile(2, 4) ]
// assert('4-28', input, expected)

// // 4-29. 양면 + 양면 + 양면 + 샤보
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(2, 1), new Tile(2, 1),
//     new Tile(2, 1), new Tile(2, 2), new Tile(2, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 7), new Tile(2, 1), new Tile(2, 4) ]
// assert('4-29', input, expected)

// // 4-30. 샤보 + 샤보 + 샤보
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-30', input, expected)

// // 4-31. 샤보 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(3, 1), new Tile(3, 1), new Tile(3, 1),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4) ]
// assert('4-31', input, expected)

// // 4-32. 샤보 + 양면 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7) ]
// assert('4-32', input, expected)

// // 4-33. 샤보 + 단기 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 3), new Tile(3, 5), new Tile(3, 6), new Tile(3, 7),
//     new Tile(3, 9), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4) ]
// assert('4-33', input, expected)

// // 4-34. 샤보 + 단기 + 양면 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4),
//     new Tile(3, 6), new Tile(3, 7), new Tile(3, 8)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('4-34', input, expected)

// // 4-35. 샤보 + 단기 + 양면 형태2 변형형
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8) ]
// assert('4-35', input, expected)

// // 5-1. 양면 + 양면 + 양면
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-1', input, expected)

// // 5-2. 양면 + 양면 + 양면 형태2
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-2', input, expected)

// // 5-3. 양면 + 양면 + 양면 형태3
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 7) ]
// assert('5-3', input, expected)

// // 5-4. 양면 + 양면 + 양면 형태4
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 6), new Tile(1, 7),
//     new Tile(1, 7), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7), new Tile(1, 9) ]
// assert('5-4', input, expected)

// // 5-5. 양면 + 양면 + 양면 형태5
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7) ]
// assert('5-5', input, expected)

// // 5-6. 양면 + 양면 + 양면 형태6
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-6', input, expected)

// // 5-7. 양면 + 양면 + 양면 형태7
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 8) ]
// assert('5-7', input, expected)

// // 5-8. 양면 + 양면 + 양면 형태8
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-8', input, expected)

// // 5-9. 양면 + 양면 + 양면 형태9
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6) ]
// assert('5-9', input, expected)

// // 5-10. 양면 + 양면 + 양면 형태10
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(2, 7), new Tile(2, 8),
//     new Tile(2, 9), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 7), new Tile(2, 6), new Tile(2, 9) ]
// assert('5-10', input, expected)

// // 5-11. 양면 + 양면 + 양면 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 8) ]
// assert('5-11', input, expected)

// // 5-12. 양면 + 양면 + 양면 + 간짱
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-12', input, expected)

// // 5-13. 양면 + 양면 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 4), new Tile(1, 4), new Tile(3, 8), new Tile(3, 8), new Tile(3, 8),
//     new Tile(4, 3), new Tile(4, 3), new Tile(4, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('5-13', input, expected)

// // 5-14. 양면 + 양면 + 단기 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(5, 3), new Tile(5, 3), new Tile(5, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 7) ]
// assert('5-14', input, expected)

// // 5-15. 양면 + 양면 + 단기 형태3
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8) ]
// assert('5-15', input, expected)

// // 5-16. 양면 + 양면 + 단기 형태4
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 8) ]
// assert('5-16', input, expected)

// // 5-17. 양면 + 양면 + 단기 형태5
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7),
//     new Tile(2, 7), new Tile(2, 8), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 8) ]
// assert('5-17', input, expected)

// // 5-18. 양면 + 양면 + 단기 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(3, 7), new Tile(3, 7), new Tile(3, 8),
//     new Tile(3, 8), new Tile(3, 9), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7) ]
// assert('5-18', input, expected)

// // 5-19. 양면 + 양면 + 단기 + 단기 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 7) ]
// assert('5-19', input, expected)

// // 5-20. 양면 + 양면 + 단기 + 단기 형태3
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 7) ]
// assert('5-20', input, expected)

// // 5-21. 양면 + 양면 + 단기 + 단기 형태4
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 6),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 7) ]
// assert('5-21', input, expected)

// // 5-22. 양면 + 양면 + 단기 + 단기 형태5
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6) ]
// assert('5-22', input, expected)

// // 5-23. 양면 + 양면 + 단기 + 단기 형태6
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 8) ]
// assert('5-23', input, expected)

// // 5-24. 양면 + 양면 + 간짱
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 6), new Tile(1, 6)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6) ]
// assert('5-24', input, expected)

// // 5-25. 양면 + 양면 + 간짱 + 간짱
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 6), new Tile(1, 7), new Tile(1, 8)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6), new Tile(1, 9) ]
// assert('5-25', input, expected)

// // 5-26. 양면 + 양면 + 단기 + 샤보
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 7), new Tile(1, 7),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 7) ]
// assert('5-26', input, expected)

// // 5-27. 양면 + 양면 + 샤보
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6) ]
// assert('5-27', input, expected)

// // 5-28. 양면 + 양면 + 샤보 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 5)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6) ]
// assert('5-28', input, expected)

// // 5-29. 양면 + 양면 + 샤보 + 간짱
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 6)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7) ]
// assert('5-29', input, expected)

// // 5-30. 양면 + 단기 + 단기 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(5, 3), new Tile(5, 3), new Tile(5, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 8) ]
// assert('5-30', input, expected)

// // 5-31. 양면 + 간짱 + 간짱 + 단기
// input = [
//     new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7),
//     new Tile(1, 9), new Tile(1, 9), new Tile(1, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 3), new Tile(1, 4), new Tile(1, 7), new Tile(1, 8) ]
// assert('5-31', input, expected)

// // 5-32. 간짱 + 간짱 + 단기 + 단기 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 3), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8), new Tile(1, 8),
//     new Tile(1, 8), new Tile(1, 8), new Tile(1, 9)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 6), new Tile(1, 7), new Tile(1, 9) ]
// assert('5-32', input, expected)

// // 5-33. 샤보 + 샤보 + 샤보 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 3), new Tile(1, 4), new Tile(1, 4), new Tile(1, 5), new Tile(1, 5),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 4), new Tile(1, 5), new Tile(1, 8) ]
// assert('5-33', input, expected)

// // 5-34. 샤보 + 샤보 + 샤보 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 5), new Tile(1, 5)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('5-34', input, expected)

// // 5-35. 샤보 + 양면 + 양면
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6),
//     new Tile(2, 9), new Tile(2, 9), new Tile(2, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 7) ]
// assert('5-35', input, expected)

// // 5-36. 샤보 + 양면 + 양면 형태2
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6) ]
// assert('5-36', input, expected)


// // 5-37. 샤보 + 양면 + 양면 형태3
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 2), new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5) ]
// assert('5-37', input, expected)


// // 5-38. 샤보 + 양면 + 양면 형태4
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5),
//     new Tile(3, 7), new Tile(3, 8), new Tile(3, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 6) ]
// assert('5-38', input, expected)


// // 5-39. 샤보 + 양면 + 양면 + 단기
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 2),
//     new Tile(1, 3), new Tile(1, 3), new Tile(1, 3), new Tile(1, 4), new Tile(1, 4),
//     new Tile(1, 5), new Tile(1, 6), new Tile(1, 7)
// ]
// expected = [ new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 8) ]
// assert('5-39', input, expected)

// // Extra. 순정구련보등
// input = [
//     new Tile(1, 1), new Tile(1, 1), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3),
//     new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8),
//     new Tile(1, 9), new Tile(1, 9), new Tile(1, 9)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 2), new Tile(1, 3), new Tile(1, 4), new Tile(1, 5), new Tile(1, 6), new Tile(1, 7), new Tile(1, 8), new Tile(1, 9) ]
// assert('Extra', input, expected)

// // Extra. 국사무쌍 13면 대기
// input = [
//     new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9), new Tile(3, 1),
//     new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4),
//     new Tile(5, 1), new Tile(5, 2), new Tile(5, 3)
// ]
// expected = [ new Tile(1, 1), new Tile(1, 9), new Tile(2, 1), new Tile(2, 9), new Tile(3, 1), new Tile(3, 9), new Tile(4, 1), new Tile(4, 2), new Tile(4, 3), new Tile(4, 4), new Tile(5, 1), new Tile(5, 2), new Tile(5, 3) ]
// assert('Extra', input, expected)
