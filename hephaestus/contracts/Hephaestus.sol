// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// NFT 合约
contract Hephaestus is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public maxSupply = 100;
    uint256 public mintedCount;
    uint256 public price;
    mapping(uint256 => string) private _tokenURIs;

    event TokenURIChanged(uint256 tokenId, string URI);
    event PublicSaleMint(address minter, uint256 amountOfNFTs);

    constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol) Ownable(msg.sender) {}

    function getPricePerNFT() public view returns (uint256) {
        return price;
    }

    // 设置单个 NFT 的价格
    function setPricePerNFT(uint256 _pricePerNFT) public onlyOwner {
        price = _pricePerNFT;
    }

    function mint(uint256 amountOfNFTs) external payable {
        require(totalSupply() < maxSupply, "All tokens have been minted");
        require(totalSupply() + amountOfNFTs <= maxSupply, "Minting would exceed max supply");
        require(amountOfNFTs > 0, "Must mint at least one nft");
        require(price * amountOfNFTs == msg.value, "Matic amount is incorrect");

        console.log("pricePerNFT : %d, amountOfNFTs : %d, msg.value : %d", price, amountOfNFTs, msg.value);
        for (uint256 i = 0; i < amountOfNFTs; i++) {
            uint256 tokenID = mintedCount + 1;
            _safeMint(msg.sender, tokenID);
            mintedCount += 1;
        }
        emit PublicSaleMint(msg.sender, amountOfNFTs);
    }

    // 提现账户所有的 ETH 到合约拥有者的账户
    function withdrawAll() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool success,) = owner().call{value : balance}("");
        require(success, "Failed to widthdraw Ether");
    }

    function singleMint(address recipientAddress, uint256 tokenId, string memory URI) public onlyOwner {
        _safeMint(recipientAddress, tokenId);
        mintedCount += 1;
        _tokenURIs[tokenId] = URI;
        emit TokenURIChanged(tokenId, URI);
    }

    function batchMint(address[] memory recipients, uint256[] memory ids, string[] memory URIs) external onlyOwner {
        require(recipients.length > 0, "At least one recipient");
        require(recipients.length == ids.length, "Recipients and amounts count not matched");
        require(totalSupply() + ids.length <= maxSupply, "Minting would exceed max supply");
        for (uint256 i = 0; i < recipients.length; ++i) {
            singleMint(recipients[i], ids[i], URIs[i]);

        }
    }

    // 设置 URI 的地址
    function setTokenURI(uint256 tokenId, string memory URI) public onlyOwner {
        _tokenURIs[tokenId] = URI;
        emit TokenURIChanged(tokenId, URI);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
