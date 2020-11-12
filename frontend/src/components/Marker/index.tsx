import React from 'react';

import './styles.css';

const Marker: React.FC = (props: any) => {
  const { color, name, id } = props;

  return (
    <div
      key={id}
      className="marker"
      style={{ backgroundColor: color, cursor: 'pointer' }}
      title={name}
    />
  );
};

export default Marker;
