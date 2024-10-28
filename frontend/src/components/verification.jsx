const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const hash = hashCitizen(formData.name, formData.username);
        
        // Get proof from backend
        const response = await fetch('http://localhost:3001/api/proof', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const { proof } = await response.json();

        // Ensure proof is an array
        if (!Array.isArray(proof)) {
            throw new Error("Proof data is not an array");
        }

        // Initialize Ethereum provider and contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract('YOUR_CONTRACT_ADDRESS', YourContract.abi, signer);

        // Verify on blockchain
        const tx = await contract.verifyProof(proof, hash);
        await tx.wait();
        
        setVerificationStatus('Verification successful!');
    } catch (error) {
        console.error(error);
        setVerificationStatus('Verification failed');
    }
    setLoading(false);
};
