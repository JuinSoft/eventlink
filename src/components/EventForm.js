import React, { useState } from 'react';
import Event from '../artifacts/contracts/EventLink.sol/Event.json';
import Constants from '../artifacts/contracts/EventLink.sol/Constants.json';

const eventAddress = Constants.event;
const ethers = require('ethers');

function EventForm({ fetchEvents }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    async function createEvent() {
        if (!name || !description || !date || !location || !capacity) return;
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider =new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(eventAddress, Event.abi, signer);
            const transaction = await contract.createEvent(name, description, location, new Date(date).getTime() / 1000, capacity, isPrivate);
            await transaction.wait();
            fetchEvents();
        }
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <input
                type="text"
                placeholder="Event Name"
                className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Event Description"
                className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="date"
                className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Capacity"
                className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
            />
            <div className="mb-4">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                />
                <label>Private Event</label>
            </div>
            <button
                className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
                onClick={createEvent}
            >
                Create Event
            </button>
        </div>
    );
}

export default EventForm;
