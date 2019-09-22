import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onClick, onInput }) => (
  <div>
    <p className='f3'>
      {'This Magic Brain will detect faces in your picture,Gift a try'}
    </p>
    <div className='center'>
      <div className='form center pa4 br3 shadow-5'>
        <input className='fa pa2 w-70 center' onChange={onInput} />
        <button
          className='w-30 grow f4 link ph3 pv2 dib white  bg-light-purple'
          onClick={onClick}
        >
          Detect
        </button>
      </div>
    </div>
  </div>
);

export default ImageLinkForm;
