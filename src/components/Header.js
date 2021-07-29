import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: horizontal;
	justify-content: space-between;
	align-items: center;
	background: #AEC6CF;
	width: 100vw;
	height: 2.5em;
	padding: 1em;
`

const StyledLink = styled(Link)`
	text-decoration: none;
`

const Header = () => (
	<Container>
		<StyledLink to="/">🥛</StyledLink>
	</Container>
)

export default Header
