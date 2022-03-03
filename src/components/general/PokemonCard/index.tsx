import React from 'react';
import './index.scss';

const PokemonCard = (props: any) => {
  const { image, name } = props;
  return (
    <div className="card">
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default PokemonCard;
