import React from 'react';
import './index.scss';
import utils from '../../../utils/common';

const PokemonCard = (props: any) => {
  const { image, name } = props;

  return (
    <div className="card">
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <p>{utils.setCapitalLetter(name)}</p>
    </div>
  );
};

export default PokemonCard;
