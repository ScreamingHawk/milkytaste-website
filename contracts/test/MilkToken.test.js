const { expect } = require("chai")

const PLACEHOLDER_URI = 'https://milkytaste.xyz/milktoken/placeholder.json'
const BASE_URI = 'https://milkytaste.xyz/milktoken/'

describe("MilkToken", () => {

	let MilkToken, milkToken, owner, addr1, addr2

	const mint = async (from, to) => {
		const tx = await milkToken.connect(from).mintToken(to.address)
		await tx.wait();
	}

	beforeEach(async () => {
		MilkToken = await ethers.getContractFactory("MilkToken")
		milkToken = await MilkToken.deploy()
		;[owner, addr1, addr2] = await ethers.getSigners()

		await milkToken.deployed();

		return milkToken
	})

	it("Should allow ownership transfer", async () => {
		const tx = await milkToken.transferOwnership(addr1.address)
		await tx.wait()
		expect(await milkToken.owner()).to.equal(addr1.address)
	})

	it("Should mint 1 to deployer", async () => {
		expect(await milkToken.totalSupply()).to.equal(1)
		expect(await milkToken.balanceOf(owner.address)).to.equal(1)
	})

	it("Should allow new address to mint", async () => {
		await mint(addr1, addr1)

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should allow owner to mint to new address", async () => {
		await mint(owner, addr1)

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should not allow double minting", async () => {
		await mint(addr1, addr1)

		await expect(
			milkToken.connect(addr1).mintToken(addr1.address)
		).to.be.revertedWith('MilkToken: cannot own more MilkTokens')

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should not allow minting after receiving transfer", async () => {
		let tx = await milkToken.transferFrom(owner.address, addr1.address, 1)
		await tx.wait()

		await expect(
			milkToken.connect(addr1).mintToken(addr1.address)
		).to.be.revertedWith('MilkToken: cannot own more MilkTokens')

		expect(await milkToken.totalSupply()).to.equal(1)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should allow minting after transfer away", async () => {
		let tx = await milkToken.transferFrom(owner.address, addr1.address, 1)
		await tx.wait()

		await mint(owner, owner)

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(owner.address)).to.equal(1)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should not allow transfer to after minting", async () => {
		await mint(addr1, addr1)

		await expect(
			milkToken.transferFrom(owner.address, addr1.address, 1)
		).to.be.revertedWith('MilkToken: cannot own more MilkTokens')

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(owner.address)).to.equal(1)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
	})

	it("Should not exceed supply cap", async () => {
		const tx = await milkToken.setSupplyCap(2)
		await tx.wait()

		await mint(addr1, addr1)

		await expect(
			milkToken.connect(addr2).mintToken(addr2.address)
		).to.be.revertedWith('MilkToken: supply cap reached')

		expect(await milkToken.totalSupply()).to.equal(2)
		expect(await milkToken.balanceOf(owner.address)).to.equal(1)
		expect(await milkToken.balanceOf(addr1.address)).to.equal(1)
		expect(await milkToken.balanceOf(addr2.address)).to.equal(0)
	})

	it("Should get placeholder URI", async () => {
		await mint(addr1, addr1)
		const uri = await milkToken.tokenURI(2)
		expect(uri).to.equal(PLACEHOLDER_URI)
	})

	it("Should get placeholder with only baseURI updated", async () => {
		await mint(addr1, addr1)
		const newBase = 'https://new.milkytaste.xyz/'
		const tx = await milkToken.setBaseURI(newBase)
		await tx.wait()
		let uri = await milkToken.tokenURI(1)
		expect(uri).to.equal(`${newBase}1.json`)
		uri = await milkToken.tokenURI(2)
		expect(uri).to.equal(PLACEHOLDER_URI)
	})

	it("Should update placeholder", async () => {
		const newPlaceholder = 'https://new.milkytaste.xyz/'
		const tx = await milkToken.setPlaceholderURI(newPlaceholder)
		await tx.wait()
		const uri = await milkToken.tokenURI(1)
		expect(uri).to.equal(newPlaceholder)
	})

	it("Should have first token revealed after deployment", async () => {
		const uri = await milkToken.tokenURI(1)
		expect(uri).to.equal(`${BASE_URI}1.json`)
	})

	it("Should not let non-owner reveal", async () => {
		await mint(addr1, addr1)
		
		await expect(
			milkToken.connect(addr2).revealToken(2)
		).to.be.revertedWith('Ownable: caller is not the owner')
	})

	it("Should get placeholder when unrevealed", async () => {
		await mint(addr1, addr1)
		const uri = await milkToken.tokenURI(2)
		expect(uri).to.equal(PLACEHOLDER_URI)
	})

	it("Should reveal a specific token only", async () => {
		await mint(addr1, addr1)
		await mint(addr2, addr2)
		const tx = await milkToken.revealToken(3)
		await tx.wait()
		let uri = await milkToken.tokenURI(2)
		expect(uri).to.equal(PLACEHOLDER_URI)
		uri = await milkToken.tokenURI(3)
		expect(uri).to.equal(`${BASE_URI}3.json`)
	})

	it("Should get real URI with base and revealed", async () => {
		const newBase = 'https://new.milkytaste.xyz/'
		let tx = await milkToken.setBaseURI(newBase)
		await tx.wait()
		await mint(addr1, addr1)
		tx = await milkToken.revealToken(2)
		await tx.wait()
		const uri = await milkToken.tokenURI(2)
		expect(uri).to.equal(`${newBase}2.json`)
	})

	it("Should get placeholder after resetting placeholder", async () => {
		const newBase = 'https://new.milkytaste.xyz/'
		const newPlaceholder = 'https://not.milkytaste.xyz/'
		let tx = await milkToken.setBaseURI(newBase)
		await tx.wait()
		tx = await milkToken.setPlaceholderURI(newPlaceholder)
		await tx.wait()
		const uri = await milkToken.tokenURI(1)
		expect(uri).to.equal(newPlaceholder)
	})

	it("Should get token id of owner", async () => {
		await mint(addr1, addr1)
		let tokenId = await milkToken.tokenOfOwnerByIndex(owner.address, 0)
		expect(tokenId).to.equal(1)
		tokenId = await milkToken.tokenOfOwnerByIndex(addr1.address, 0)
		expect(tokenId).to.equal(2)
		
		await expect(
			milkToken.tokenOfOwnerByIndex(addr2.address, 0)
		).to.be.revertedWith('ERC721Enumerable: owner index out of bounds')
	})
})
