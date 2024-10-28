// scripts/deploy.js
const hre = require("hardhat");
const { generateMerkleTree } = require('./generateMerkleTree');

async function main() {
    // Get the deployer's signer
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Generate Merkle tree and get root
    const { root } = generateMerkleTree();
    console.log("Merkle Root:", root);

    // Deploy the contract
    const CitizenshipVerifier = await hre.ethers.getContractFactory("CitizenshipVerifier");
    const verifier = await CitizenshipVerifier.deploy(root);

    await verifier.waitForDeployment();

    // Get the deployed contract address
    const verifierAddress = await verifier.getAddress();
    console.log("CitizenshipVerifier deployed to:", verifierAddress);

    // Log additional information for verification
    console.log("\nDeployment Information:");
    console.log("------------------------");
    console.log("Contract Address:", verifierAddress);
    console.log("Merkle Root:", root);
    console.log("Deployer Address:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });