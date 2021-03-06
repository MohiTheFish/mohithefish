import React, {useState, useEffect} from 'react';
import Switch from '@material-ui/core/Switch';

import Loading from 'components/Loading/loading';
import redArrow from 'assets/red_arrow.svg';
import blueArrow from 'assets/blue_arrow.svg';
import greenArrow from 'assets/green_arrow.svg';

function RedArrowImage() {
  return <img src={redArrow} alt="Red arrow" className="arrow red-arrow"/>
}
function BlueArrowImage({ up }) {
  return <img src={blueArrow} alt="Blue arrow" className={`arrow blue-arrow-${up ? 'up' : 'left'}`}/>
}
function GreenArrowImage() {
  return <img src={greenArrow} alt="Green arrow" className="arrow green-arrow"/>
}


const BACKPOINTER_UP = 0;
const BACKPOINTER_DIAG = 1;
const BACKPOINTER_LEFT = 2;

function getArrow(bpEntry) {
  if (bpEntry === BACKPOINTER_DIAG) {
    return <GreenArrowImage />;
  }
  if (bpEntry === -BACKPOINTER_DIAG) {
    return <RedArrowImage />;
  }
  if (bpEntry === BACKPOINTER_UP) {
    return <BlueArrowImage up />
  }
  return <BlueArrowImage />;
}

function Answer({string1, string2, solution}) {
  let solutionIndex = 0;
  let s1Index = solution[solutionIndex][1];
  let s2Index = solution[solutionIndex][0];
  let nextS1Index = s1Index;
  let nextS2Index = s2Index;
  const ans = [[],[]];


  solutionIndex++;
  while (solutionIndex < solution.length) {
    nextS1Index = solution[solutionIndex][1];
    nextS2Index = solution[solutionIndex][0];
    
    if ((nextS1Index === s1Index+1) && (nextS2Index === s2Index+1)) {
      ans[0].push(string1[nextS1Index]);
      ans[1].push(string2[nextS2Index]);
    }
    else if((nextS1Index === s1Index+1)) {
      ans[0].push(string1[nextS1Index]);
      ans[1].push("_");
    }
    else {
      ans[0].push("_");
      ans[1].push(string2[nextS2Index]);
    }

    solutionIndex++;
    s1Index = nextS1Index;
    s2Index = nextS2Index;
  }
  const n = ans[0].length;
  const grid = [];
  for(let i=0; i<n-1; i++) {
    grid.push(
      <p className="answer-entry top-row" key={i}>{ans[0][i]}</p>
    )
  }
  grid.push(
    <p className="answer-entry top-row no-border-right" key={n-1}>{ans[0][n-1]}</p>
  )
  for(let i=0; i<n; i++) {
    grid.push(
      <p className="answer-entry" key={n+i}>{ans[1][i]}</p>
    )
  }
  return (
    <section className="answer-alignment" style={{ gridTemplateColumns: `repeat(${n}, 30px)`}}>
      {grid}
    </section>
  );
}

export default function OutputMatrix({decoder, similarityMatrix, string1, string2, isComputing, setIsComputing}) {
  const [dpTable, setdpTable] = useState({
    score: [],
    bp: [],
    solution: [],
  });
  const [showOnlySolutionArrows, setShowOnlySolutionArrows] = useState(true);
  
  useEffect(() => {
    console.log('start computing');
    setIsComputing(true);

    async function computeDPTable() {
      function decode(symbol1, symbol2) {
        return similarityMatrix[decoder[symbol1]][decoder[symbol2]];
      }
    
      //compute here
      
      const s1 = string1.length;
      const s2 = string2.length;
      const table = [[]];
      const bpointer = [[]];
      const solution = [];

      table[0].push(0);
      for (let j=1; j<s1; j++) {
        bpointer[0].push(BACKPOINTER_LEFT);
        table[0].push(table[0][j-1] + decode('-', string1[j]));
      }
      
      for(let i=1; i<s2; i++) {
        bpointer.push([]);
        table.push([]);

        bpointer[i].push(BACKPOINTER_UP);
        table[i].push(table[i-1][0] + decode('-', string2[i]));
        for (let j=1; j<s1; j++) {
          bpointer[i].push(-1.23);
          table[i].push(0);
        }
      }
  
      for (let i=1; i<s2; i++) {
        for (let j=1; j<s1; j++) {
          const downDir = table[i-1][j] + decode('-', string2[i]);
          const rightDir = table[i][j-1] + decode('-', string1[j]);
          const diagonal = table[i-1][j-1] + decode(string1[j], string2[i]);
          let choice = rightDir;
          let backpointer = BACKPOINTER_LEFT;
          
          if (downDir >= rightDir && downDir >= diagonal) {
            choice = downDir;
            backpointer = BACKPOINTER_UP;
          }
          else if (diagonal >= downDir && diagonal >= rightDir) {
            choice = diagonal;
            backpointer = string1[j] === string2[i] ? BACKPOINTER_DIAG : -BACKPOINTER_DIAG;
          }
  
          table[i][j] = choice;
          bpointer[i][j]= backpointer;
        }
      }
      let curr_row = s2 - 1;
      let curr_col = s1 - 1;
      while(curr_row !== 0 && curr_col !== 0) {
        // console.log([curr_row, curr_col]);
        solution.push([curr_row, curr_col]);
        const dir = bpointer[curr_row][curr_col];
        switch(dir) {
          case BACKPOINTER_UP: {
            curr_row--;
            break;
          }
          case BACKPOINTER_LEFT: {
            curr_col--;
            break;
          }
          case BACKPOINTER_DIAG:
          case -BACKPOINTER_DIAG: {
            curr_row--;
            curr_col--;
            break;
          }
          default:
        }
      }
      while(curr_col !== 0) {
        // console.log([curr_row, curr_col]);
        solution.push([curr_row, curr_col]);
        curr_col--;
      }
      while(curr_row !== 0) {
        // console.log([curr_row, curr_col]);
        solution.push([curr_row, curr_col]);
        curr_row--;
      }
      
      // console.log([curr_row, curr_col]);
      solution.push([0,0]);
      solution.reverse();
      setdpTable({
        score: table,
        bp: bpointer,
        solution,
      });
      setIsComputing(false);
    }
    computeDPTable();
  }, [similarityMatrix, setIsComputing, string1, string2, decoder]);

  
  const s1 = string1.length;
  const s2 = string2.length;
  const grid = [<p key="empty" className="empty" />,];
  for (let i=0; i<s1; i++) {
    const symbol = string1[i];
    grid.push(<p key={`${symbol}${i}-top`} className="category output output-top">{symbol}</p>);
  }

  if (!isComputing) {
    const {score, bp, solution} = dpTable;
    let solutionIndex = 0;
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output output-side">{string2[i]}</p>);
  
      for (let j=0; j<s1; j++) {
        const [solrow, solcol] = solution[solutionIndex];
        const isSol = (i===solrow) && (j===solcol)
        if (isSol) {
          solutionIndex++;
        }
        
        const entryClass = `output${isSol ? ' answer' : ''}`;
        const key = i*s1+j;
        if (i > 0 || j > 0){
          grid.push(
            <p key={key} className={entryClass}>
              {score[i][j]}
              {(showOnlySolutionArrows && isSol) || (!showOnlySolutionArrows) ? getArrow(bp[i][j]) : null}
            </p>
          );
        }
        else {
          grid.push(
            <p key={key} className={entryClass}>{score[i][j]}</p>
          );
        }
      }
    }
  }
  else {
    for (let i=0; i<s2; i++) {
      grid.push(<p key={`${string2[i]}${i}-side`} className="category output output-side">{string2[i]}</p>);
    }
    grid.push(<Loading key="loading" style={{gridColumnEnd: `${s1 + 2}`, gridRowEnd: `${s2+ 2}`}} id="matrix-loading"/>);
  }

  return (
    <div className="output-matrix">
      <section className="matrix" style={{ gridTemplateColumns: `repeat(${s1+1}, 60px)`, gridTemplateRows: `repeat(${s2+1}, 45px)`}}>
        {grid}
      </section>
      <div className="switch-wrapper">
        <Switch
          onChange={() => setShowOnlySolutionArrows(!showOnlySolutionArrows)}
          checked={showOnlySolutionArrows}
          color="primary"
        />
        <p>Only show solution arrows?</p>
      </div>
      <section>
        <h2>Answer:</h2>
        {
          isComputing
          ? null
          : <Answer string1={string1} string2={string2} solution={dpTable.solution} />
        }
      </section>
    </div>
  )
}
