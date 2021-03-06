import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({ imageUrl, boxes }) => (
  <div className='center ma'>
    <div className='absolute mt2'>
      <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
      {boxes.map(box => (
        <div
          key={box.topRow}
          className='bounding-box'
          style={{
            top: box.topRow,
            left: box.leftCol,
            bottom: box.bottomRow,
            right: box.rightCol
          }}
        />
      ))}
    </div>
  </div>
);

export default FaceRecognition;
