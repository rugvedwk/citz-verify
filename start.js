const { JsonRpcServer } = require('hardhat/internal/hardhat-network/jsonrpc/server');
const express = require('express');
const cors = require('cors');

// Configuration for the server
const config = { port: 8545, hostname: 'localhost' }; 
const server = new JsonRpcServer(config);

// Set up Express
const app = express();
app.use(cors());
app.use(express.json());

// Sample endpoint for proof
app.post('/api/proof', (req, res) => {
    console.log('Received request:', req.body);
    // Return proof as an array instead of a string
    const mockProofData = [
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
        // Add more proof items as needed
    ];
    res.json({ proof: mockProofData }); // Simulated proof response as an array
});

// Start Express server
const startExpressServer = (port) => {
    return new Promise((resolve) => {
        app.listen(port, () => {
            console.log(`Express server running at http://localhost:${port}`);
            resolve();
        });
    });
};

// Start both servers
Promise.all([
    server.listen(),
    startExpressServer(3001)
])
.then((addresses) => {
    const address = addresses[0];
    console.log(`JSON-RPC Server running at http://${address.address}:${address.port}`);
})
.catch((error) => {
    console.error("Error starting servers:", error);
});
