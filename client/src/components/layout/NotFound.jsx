import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
const NotFound = () => (
  <>
    <h1 className="x-large text-primary">
      <FaExclamationTriangle className="icon" />
      Page Not Found
    </h1>
    <p className="large">Sorry, this page does not exist</p>
  </>
);

export default NotFound;
