import React from 'react';

function Header() {
    return ( 
        <nav className=" top-0 z-50 bg-gradient-to-r from-blue-700 to-sky-400 w-full p-3">     
            <div className="flex items-center justify-between">    
                <div className=" ml-4 flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                    <span className="text-white text-xl font-semibold">Dashboard</span>
                </div>
            </div>
        </nav>
    );
}

export default Header;