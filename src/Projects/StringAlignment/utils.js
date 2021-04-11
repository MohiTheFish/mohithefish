const VALID_SYMBOLS = ['A', 'T', 'C', 'G'];
const VALID_SYMBOLS_LOOKUP = new Set(VALID_SYMBOLS);


function isFloat(num) {
  // return /^(\+|-)?\d+$/.test(num);
  return /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(num);
}

function initalizeSimilarityMatrix() {
  return [
    ['-inf', -1, -1, -1, -1],
    [-1, 1, -1, -1, -1],
    [-1, -1, 1, -1, -1],
    [-1, -1, -1, 1, -1],
    [-1, -1, -1, -1, 1],
  ];
}

export {
  isFloat,
  initalizeSimilarityMatrix,
  VALID_SYMBOLS,
  VALID_SYMBOLS_LOOKUP,

}