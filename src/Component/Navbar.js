import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className="navbar">
            <nav>
                <h3>FE task</h3>
                <Router>
                    <div>
                        <Link to="" className="info">info</Link>
                        <Link to="" className="task">task</Link>
                    </div>

                </Router>
            </nav>
        </div>
    )
}

export default Navbar;
