const findAllSolutions = require('./boggle_solver');

test('Testing existing solutions', () => {
  expect(findAllSolutions([["A", "B", "E"],["C", "D", "A"],["D", "E", "B"]], ["DECADE", "BEADED", "DECAD", "ACB", "ACBA", "DE", "DEED"]).sort()).toEqual(["ACB", "ACBA", "BEADED", "DECAD", "DECADE"]);
});

test('Empty dictionary input', () => {
  expect(findAllSolutions(
    [["A", "B"], ["C", "B"]], []
  ).sort()).toEqual([])
});

test('Empty grid input', () => {
  expect(findAllSolutions(
    [], ["ABC", "AAA"]
  ).sort()).toEqual([])
});

test('Empty column input', () => {
  expect(findAllSolutions(
    [[], []], ["ABC", "AAA"]
  ).sort()).toEqual([])
});

test('Empty dictionary and grid input', () => {
  expect(findAllSolutions(
    [], []
  ).sort()).toEqual([])
});

test('Input grid containing two letter chains', () => {
  expect(findAllSolutions(
    [["A", "Qu"], ["C", "D"]], ["AQu", "CDQu", "ACD", "QuC"]
  ).sort()).toEqual(["ACD", "AQu", "CDQu", "QuC"])
});

// Cases (upper case or lower case) should not matter.
test('Different cases for words and letters', () => {
  expect(findAllSolutions(
    [["A", "Qu", "ER"], ["B", "c", "D"], ["E", "F", "G"]], ["AQUC", "ACQU", "QUDC", "AQuC", "FCER", "FCeR", "FCEr", "acd"]
  ).sort()).toEqual(["ACQU", "AQUC", "AQuC", "FCER", "FCEr", "FCeR", "QUDC", "acd"])
});

/*
test('Null grid input', () => {
  expect(findAllSolutions(
    null , []
  ).sort()).toEqual([])
});

test('Undefined grid input', () => {
  expect(findAllSolutions(
    undefined , []
  ).sort()).toEqual([])
});

test('Null dictionary input', () => {
  expect(findAllSolutions(
    [], null
  ).sort()).toEqual([])
});

test('Undefined dictionary input', () => {
  expect(findAllSolutions(
    [], undefined
  ).sort()).toEqual([])
});

test('Grid input with blank spaces', () => {
  expect(findAllSolutions(
    [["A", "", "C"], ["B", "V", "D"]], ["ACD", "ACV", "ACVBD", "ACVB"]
  ).sort()).toEqual(["ACD", "ACV", "ACVB"])
});

test('Grid with inconsistent number of columns', () => {
  expect(findAllSolutions(
    [["A"], ["B", "V", "D"], ["A", "A"]], ["ABV", "AV"]
  ).sort()).toEqual([])
});
*/