// src/config.js
// Replace this address with your deployed contract address from the deployment output
export const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

export const CONTRACT_ABI = [
    // Core functions
    "function verifyProof(bytes32[] calldata proof, bytes32 leaf) public returns (bool)",
    "function merkleRoot() public view returns (bytes32)",
    // Admin functions
    "function updateMerkleRoot(bytes32 _newRoot) external",
    "function admin() public view returns (address)",
    // Events
    "event VerificationResult(address indexed user, bool verified)"
];