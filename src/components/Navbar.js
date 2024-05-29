import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';

function Navbar() {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <WalletConnect/>
                <h1 className="text-xl font-bold">
                    <Link to="/">Event Manager</Link>
                </h1>
                <div>
                    <Link to="/" className="mr-4">Home</Link>
                    <Link to="/create" className="mr-4">Create Event</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
