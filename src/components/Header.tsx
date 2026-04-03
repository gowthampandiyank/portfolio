import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Welcome to My Portfolio</h1>
            <nav>
                <ul>
                    <li><a href="/portfolio/gowtham-pandiyan.docx">Download Resume</a></li>
                    {/* Other navigation items */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;