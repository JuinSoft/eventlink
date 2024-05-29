import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Event from '../artifacts/contracts/EventLink.sol/Event.json';
import Constants from '../artifacts/contracts/EventLink.sol/Constants.json';

const eventAddress = Constants.event;
const ethers = require('ethers');

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [tokenURI, setTokenURI] = useState('');

    useEffect(() => {
        fetchEvent();
    }, []);

    async function fetchEvent() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(eventAddress, Event.abi, provider);
            try {
                const data = await contract.getEvent(id);
                setEvent(data);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    async function rsvpEvent() {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider =new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(eventAddress, Event.abi, signer);
            const transaction = await contract.rsvpEvent(id);
            await transaction.wait();
            fetchEvent();
        }
    }

    async function buyEventNFT() {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider =new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(eventAddress, Event.abi, signer);
            const transaction = await contract.buyEventNFT(id, tokenURI, { value: ethers.utils.parseEther("0.1") });
            await transaction.wait();
            fetchEvent();
        }
    }

    async function distributePOAP() {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider =new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(eventAddress, Event.abi, signer);
            const transaction = await contract.distributePOAP(id, tokenURI);
            await transaction.wait();
            fetchEvent();
        }
    }

    return (
        event ? (
            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
                <p className="mb-4">{event.description}</p>
                <p className="mb-4">Location: {event.location}</p>
                <p className="mb-4">Date: {new Date(event.date * 1000).toLocaleDateString()}</p>
                <p className="mb-4">Capacity: {event.capacity}</p>
                <button
                    className="w-full p-2 bg-green-600 hover:bg-green-700 rounded mb-4"
                    onClick={rsvpEvent}
                >
                    RSVP
                </button>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="NFT Metadata URI"
                        className="w-full p-2 bg-gray-700 text-white rounded mb-4"
                        value={tokenURI}
                        onChange={(e) => setTokenURI(e.target.value)}
                    />
                    <button
                        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={buyEventNFT}
                    >
                        Buy Event NFT
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="POAP Metadata URI"
                        className="w-full p-2 bg-gray-700 text-white rounded mb-4"
                        value={tokenURI}
                        onChange={(e) => setTokenURI(e.target.value)}
                    />
                    <button
                        className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded"
                        onClick={distributePOAP}
                    >
                        Distribute POAP
                    </button>
                </div>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default EventDetail;

