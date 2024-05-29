import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../artifacts/contracts/EventLink.sol/Event.json';
import Constants from '../artifacts/contracts/EventLink.sol/Constants.json';

const eventAddress = Constants.event;
const ethers = require('ethers');

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    console.log("fetching event", eventAddress)
    async function fetchEvents() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(eventAddress, Event.abi, provider);
            try {
                const data = await contract.getEvents();
                setEvents(data);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    function viewEvent(id) {
        navigate(`/event/${id}`);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            {events.map((event, index) => (
                <div key={index} className="bg-gray-800 p-4 mb-4 rounded-lg cursor-pointer" onClick={() => viewEvent(event.id)}>
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <p>{event.description}</p>
                    <p>{new Date(event.date * 1000).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">Location: {event.location}</p>
                </div>
            ))}
        </div>
    );
}

export default EventList;
