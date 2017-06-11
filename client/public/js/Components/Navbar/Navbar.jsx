import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';

const Navbar = () => (
    <AppBar
        title={<span>Shops</span>}
        iconElementLeft={<div></div>}
        iconElementRight={<Link to="/signout" className="logout-link">Sign Out</Link>}
    />
);

export default Navbar;