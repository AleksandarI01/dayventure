import React from 'react';
import SignUpImage from '../../assets/images/SignUpImage.jpg';

const AnimatedSignUpImage = ({ src, alt}) => {
  return <img className={`w-[400px] h-auto`} src={SignUpImage} alt={alt} />
}

export default AnimatedSignUpImage;
