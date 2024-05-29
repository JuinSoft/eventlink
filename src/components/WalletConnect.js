import React, { useState } from 'react';

const ethers = require('ethers');

function WalletConnect() {
    const [active, setActive] = useState(false);
    const [account, setAccount] = useState(null);

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setActive(true);
            } catch (ex) {
                console.log(ex);
            }
        } else {
            console.log('No Ethereum provider detected');
        }
    }

    async function disconnect() {
        try {
            setAccount(null);
            setActive(false);
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <div>
            {active ? (
                <div>
                    <span>Connected with <b>{account}</b></span>
                    <button onClick={disconnect} className="ml-2 p-2 bg-red-600 hover:bg-red-700 rounded">
                        Disconnect
                    </button>
                </div>
            ) : (
                <button onClick={connect} className="p-2 bg-blue-600 hover:bg-blue-700 rounded">
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default WalletConnect;