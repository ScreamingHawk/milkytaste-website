const { expect } = require("chai")

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
		const uri = await milkToken.tokenURI(1)
		expect(uri).to.equal('https://raw.githack.com/ScreamingHawk/milkytaste-website/master/contracts/placeholder.json')
	})

	it("Should get real URI", async () => {
		const newBase = 'https://milkytaste.xyz/'
		const tx = await milkToken.setBaseURI(newBase)
		await tx.wait()
		const uri = await milkToken.tokenURI(1)
		expect(uri).to.equal(`${newBase}1.json`)
	})
})
