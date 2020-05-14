import React from 'react';

import './header.css';

const Header = ({ onApiChange }) => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#/">
          Star&nbsp;DB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="#/people">People</a>
        </li>
        <li>
          <a href="#/planets">Planets</a>
        </li>
        <li>
          <a href="#/starships">Starships</a>
        </li>
      </ul>
      <button
        onClick={onApiChange}
        className="btn btn-primary btn-sm" >
        Test&nbsp;Service
      </button>
    </div>
  );
};

export default Header;