// src/utils/merkleTree.js
import { ethers } from 'ethers';

export function hashCitizen(name, username) {
    return ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
            ['string', 'string'],
            [name, username]
        )
    );
}