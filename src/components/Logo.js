import styled from "styled-components"

const Dot = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: #AEC6CF;
	border-radius: 50%;
	font-size: 5em;
	height: 2em;
	width: 2em;
`

const Logo = ({ children }) => (
	<Dot>{children || '🥛'}</Dot>
)

export default Logo
