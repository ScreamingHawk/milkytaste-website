//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract MilkToken is ERC721Enumerable, Ownable {
	
	using Strings for uint256;
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	// Used for placeholder
	string private placeholderURI;
	string private baseURI;

	uint256 private _supplyCap;
	uint256 private _revealedTo;

	constructor() ERC721('MilkToken', 'MILK') {
		placeholderURI = 'https://milkytaste.xyz/milktoken/placeholder.json';
		baseURI = 'https://milkytaste.xyz/milktoken/';
		_supplyCap = 100;
		_revealedTo = 1;
		mintToken(_msgSender());
	}

	/**
	 * @dev Only allow one token per address.
	 */
	modifier canOwnMore(address _to) {
		require(ERC721.balanceOf(_to) < 1, 'MilkToken: cannot own more MilkTokens');
		_;
	}

	function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override canOwnMore(to) {
		super._beforeTokenTransfer(from, to, tokenId);
	}

	/**
	 * @dev Update the placeholder URI and clear the baseURI
	 */
	function setPlaceholderURI(string memory newURI) external onlyOwner {
		placeholderURI = newURI;
		baseURI = '';
	}

	/**
	 * @dev Update the base URI
	 */
	function setBaseURI(string memory newURI) external onlyOwner {
		baseURI = newURI;
	}

	/**
	 * @dev Update the base URI
	 */
	function setSupplyCap(uint256 newSupplyCap) external onlyOwner {
		_supplyCap = newSupplyCap;
	}

	/**
	 * @dev Update the base URI
	 */
	function setRevealedTo(uint256 newRevealedTo) external onlyOwner {
		_revealedTo = newRevealedTo;
	}

	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

		if (tokenId > _revealedTo || bytes(baseURI).length == 0) {
			return placeholderURI;
		}

		return string(abi.encodePacked(baseURI, tokenId.toString(), '.json'));
	}

	/**
	 * @dev Mints a new token
	 */
	function mintToken(address addr) public canOwnMore(addr) returns (uint256) {
		require(_tokenIds.current() < _supplyCap, 'MilkToken: supply cap reached');

		_tokenIds.increment();
		uint256 id = _tokenIds.current();

		_safeMint(addr, id);
		return id;
	}

	/**
		* @dev Return the total supply
		*/
	function supplyCap() public view virtual returns (uint256) {
		return _supplyCap;
	}
}
