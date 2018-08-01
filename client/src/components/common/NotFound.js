import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found...</h1>
      <Link to="/" className="btn btn-lg btn-info">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
