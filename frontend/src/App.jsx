// src/App.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VerificationForm from './components/verification';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

function App() {
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initContract = async () => {
            try {
                // Connect to MetaMask
                if (typeof window.ethereum !== 'undefined') {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    
                    // Create contract instance
                    const verifierContract = new ethers.Contract(
                        CONTRACT_ADDRESS,
                        CONTRACT_ABI,
                        signer
                    );
                    
                    setContract(verifierContract);
                } else {
                    setError('Please install MetaMask!');
                }
            } catch (err) {
                setError('Error connecting to the blockchain');
                console.error(err);
            }
        };

        initContract();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    if (!contract) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl text-center my-8">Citizenship Verification</h1>
            <VerificationForm contract={contract} />
        </div>
    );
}

export default App;