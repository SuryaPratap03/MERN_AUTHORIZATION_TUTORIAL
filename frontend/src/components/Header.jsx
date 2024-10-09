import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const handlelogout = async () => {
        
        try {
          const response = await fetch("http://localhost:3000/api/user/logout", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">MERNAUTH</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink 
                to="/login" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-bold"
                // activeClassName="text-white font-bold"
                onClick={()=>handlelogout()}
              >
                LOGIN
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/signup" 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-bold"
               
                onClick={()=>handlelogout()}
              >
                SIGNUP
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
