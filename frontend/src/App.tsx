import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './components/Marker';
import api from './services/api';

const App: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.post('', {
      url: 'https://agropoint-csv.s3-sa-east-1.amazonaws.com/sample.test.csv',
    });

    const { data } = response;
    console.log(data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        url:
        <input
          type="text"
          value="https://agropoint-csv.s3-sa-east-1.amazonaws.com/sample.test.csv"
          placeholder="coloque aqui a url para baixar o csv"
        />
        <button type="submit">Enviar</button>
      </form>

      <GoogleMapReact bootstrapURLKeys={{ key: 'add your api key' }}>
        <Marker lat={11.0168} lng={76.9558} name="My Marker" color="blue" />
      </GoogleMapReact>
    </div>
  );
};

export default App;
