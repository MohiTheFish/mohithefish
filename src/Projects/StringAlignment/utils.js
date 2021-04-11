const VALID_SYMBOLS = ['A', 'T', 'C', 'G'];
const VALID_SYMBOLS_LOOKUP = new Set(VALID_SYMBOLS);
const DEFAULT_STRING_1 = 'GGTAG';
const DEFAULT_STRING_2 = 'GGCAGT';

// const DEFAULT_STRING_1 = 'GGTAGGTACCTATACTGTA';
// const DEFAULT_STRING_2 = 'GGCAGTACTTGTA';

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

function initalizeDecoder() {
  const map = {
    '-': 0,
    'A': 1,
    'T': 2,
    'C': 3.,
    'G': 4,
  };
  return map;
}


function convertToFloatMatrix(matrix) {
  const simMatrix = [];
  const n = matrix.length;
  for (let i=0; i<n; i++) {
    const newRow = [];
    for (let j=0; j<n; j++) {
      if (i+j === 0) {
        newRow.push(-999999999);
      }
      else {
        newRow.push(Number.parseFloat(matrix[i][j]));
      }
    }
    simMatrix.push(newRow);
  }

  // const simMatrix = [];
  // matrix.forEach((row) => {
  //   const newRow = [];
  //   row.forEach((col) => {
  //     newRow.push(Number.parseFloat(col));
  //   });
  //   simMatrix.push(newRow);
  // });
  return simMatrix;
}

export {
  isFloat,
  initalizeSimilarityMatrix,
  VALID_SYMBOLS,
  VALID_SYMBOLS_LOOKUP,
  DEFAULT_STRING_1,
  DEFAULT_STRING_2,
  initalizeDecoder,
  convertToFloatMatrix,
}