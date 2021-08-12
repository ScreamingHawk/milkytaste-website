const trimAddress = addr => addr ? `${addr.substr(0, 6)}...${addr.substr(addr.length-5, addr.length-1)}` : ''

export {
	trimAddress,
}
