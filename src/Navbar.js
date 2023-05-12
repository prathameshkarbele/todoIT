import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#120fb0e0',}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">toDoApp</a>    
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

