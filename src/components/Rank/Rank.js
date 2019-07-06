import React from 'react';

const Rank = ({ name, rank }) => (
  <div>
    <div className='white f3'>{`${name}, Your current entry count is...`}</div>
    <div className='white f3'>{rank}</div>
  </div>
);

export default Rank;
