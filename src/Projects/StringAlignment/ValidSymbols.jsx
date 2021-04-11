import React from 'react';

export default function ValidSymbols({symbols}) {
  return (
    <section className="possible-symbols">
      <h3>Valid Symbols:</h3>
      <p>
        {
          symbols.map(symbol => <span key={symbol}>{symbol}</span>)
        }
      </p>

    </section>
  );
}