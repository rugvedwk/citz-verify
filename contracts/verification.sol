// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CitizenshipVerifier {
    bytes32 public merkleRoot;
    address public admin;
    
    event VerificationResult(address indexed user, bool verified);
    
    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }
    
    function updateMerkleRoot(bytes32 _newRoot) external onlyAdmin {
        merkleRoot = _newRoot;
    }
    
    function verifyProof(bytes32[] calldata proof, bytes32 leaf) public returns (bool) {
        bool result = processProof(proof, leaf) == merkleRoot;
        emit VerificationResult(msg.sender, result);
        return result;
    }
    
    function processProof(bytes32[] calldata proof, bytes32 leaf) internal pure returns (bytes32) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        return computedHash;
    }
    
    function _hashPair(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return a < b ? keccak256(abi.encodePacked(a, b)) : keccak256(abi.encodePacked(b, a));
    }
}
