import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <a href="/">Point Mall</a>
            <div className="header-right">
                <Link to="/login">Login</Link>
            </div>
        </header>
    );
}

export default Header;