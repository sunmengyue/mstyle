import React from 'react';
import { Link } from 'react-router-dom';

const MenuExpand = () => {
  return (
    <ul className="bg-brown-light block md:hidden">
      <Link to="/shopAll">
        <li className="link tracking-wide py-3 border-gray-300 border-b border-t">
          Shop All
        </li>
      </Link>
      <Link to="/login">
        <li className="link tracking-wide pt-3 pb-6">Sign In</li>
      </Link>
    </ul>
  );
};

export default MenuExpand;
