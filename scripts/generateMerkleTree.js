// scripts/generateMerkleTree.js
const { MerkleTree } = require('merkletreejs');
const { ethers } = require('ethers');

// Sample citizen data
const citizens = [
    { name: "John Doe", username: "john_doe" },
    { name: "Jane Smith", username: "jane_smith" }
];

// Function to hash citizen data
function hashCitizen(name, username) {
    const hash = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
            ['string', 'string'],
            [name, username]
        )
    );
    console.log("Hash generated for:", name, username, "->", hash);
    return hash;
}

// Function to generate the Merkle tree
function generateMerkleTree() {
    const leaves = [];

    // Log the generation of hashes for each citizen
    citizens.forEach(citizen => {
        const leafHash = hashCitizen(citizen.name, citizen.username);
        console.log("Generating hash for:", citizen.name, citizen.username);
        console.log("Hash generated:", leafHash);
        leaves.push(leafHash);  // Add the generated hash to the leaves array
    });

    const merkleTree = new MerkleTree(leaves, ethers.keccak256, { sortPairs: true });
    const root = merkleTree.getHexRoot();
    
    console.log("Generated Merkle Root:", root);
    console.log("Leaves:", leaves);
    
    return { merkleTree, root, leaves };
}

// Run the function and log the Merkle root
const { merkleTree, root, leaves } = generateMerkleTree();

module.exports = { generateMerkleTree, hashCitizen };
