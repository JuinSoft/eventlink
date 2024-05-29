import React, { useState, useEffect } from 'react';
import Event from '../artifacts/contracts/EventLink.sol/Event.json';
import Constants from '../artifacts/contracts/EventLink.sol/Constants.json';

const eventAddress = Constants.event;
const ethers = require('ethers');

function UserProfile() {
    const [userEvents, setUserEvents] = useState([]);
    const [account, setAccount] = useState('');

    useEffect(() => {
        fetchUserEvents();
    }, []);

    async function fetchUserEvents() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            const provider =new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(eventAddress, Event.abi, provider);
            try {
                const data = await contract.getEvents();
                const userEvents = data.filter(event => event.creator === accounts[0]);
                setUserEvents(userEvents);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <p className="mb-4">Account: {account}</p>
            <h3 className="text-xl font-bold mb-4">Your Events</h3>
            {userEvents.map((event, index) => (
                <div key={index} className="bg-gray-700 p-4 mb-4 rounded-lg">
                    <h4 className="text-lg font-bold">{event.name}</h4>
                    <p>{event.description}</p>
                    <p>{new Date(event.date * 1000).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default UserProfile;
