import React from 'react';

const sizes = {
  '6': 'w-6 h-6',
  // Add more sizes as needed
};

const colors = {
  'venture-black': 'text-venture-black',
  'venture-green': 'text-venture-green',
  'venture-red': 'text-venture-red',
  // Add more colors as needed
};

const Icon = ({ icon: IconComponent, size = '6', color = 'venture-black' }) => {
  return <IconComponent className={`${sizes[size]} ${colors[color]}`} />;
};

export default Icon;


