import React from 'react';

const Round = ({ round, fastAnimation, result }) => {
  const arr = (n) => {
    const array = [];
    for (let i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 10));
    }
    return array;
  };
  return (
    <div className="block" style={(round === '0' && { opacity: 1 }) || (round === '1' && { ...fastAnimation })}>
      <div className="ball">{result === null ? 0 : result}</div>
      {arr(40).map((i, index) => {
        return (
          <div className="ball" key={index}>
            {i}
          </div>
        );
      })}
    </div>
  );
};

export default Round;
