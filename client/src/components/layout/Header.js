import React, { Component } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/play">
        <h1>HitBox</h1>
      </Link>
    </header>
  );
};

export default Header;
