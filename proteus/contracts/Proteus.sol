// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Proteus is ERC20, Ownable {
    constructor(string memory _tokenName, string memory _tokenShortName, uint256 _totalSupply)
    ERC20(_tokenName, _tokenShortName) Ownable(msg.sender) {
        // msg.sender 合约调用者
        _mint(msg.sender, _totalSupply * 10 ** 18);
    }
}
