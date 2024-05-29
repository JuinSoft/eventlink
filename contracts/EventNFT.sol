// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

    constructor() ERC721("Event NFT", "ENFT") Ownable(msg.sender) {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        tokenCount++;
        uint256 newItemId = tokenCount;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
