import React from 'react';
import { Link } from 'react-router-dom';
import './Thankyou.scss';

function Thankyou() {
  return (
    <div className='bx--grid bx--grid--full-width thankyou'>
      <h2>
        Thank you, you have successfully registered. <Link to='/'>Return to Home</Link>.
      </h2>
    </div>
  );
}

export default Thankyou;
