import React from 'react';
import { IStats } from 'interfaces/IStats';

import './index.scss';

const ProgressBar = (props: IStats) => {
  const { base, name } = props;
  const percentage = (base / 200) * 100;

  return (
    <tr>
      <td>{name}</td>
      <td className="base-column">{base}</td>
      <td className="bar-column">
        <div className="bar-container">
          <div
            className={`bar-container__bar bar-container__bar--${name}`}
            style={{ height: '24px', width: `${percentage}%` }}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProgressBar;
