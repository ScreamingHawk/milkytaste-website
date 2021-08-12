import { Link } from "react-router-dom"
import styled from "styled-components"
import Wave from 'react-wavify'

const Container = styled.div`
	display: flex;
	flex-direction: horizontal;
	justify-content: space-between;
	align-items: center;
	background: #AEC6CF;
	width: 100%;
	height: 2.5em;
	padding: 1em;
	z-index: 1;
`

const StyledLink = styled(Link)`
	text-decoration: none;
`

const StyledWave = styled(Wave)`
	position: absolute;
	top: 0;
	z-index: 0;
`

const Header = ({ hasWave }) => (
	<>
		{hasWave && <StyledWave fill='#FFF' transform="scale (1, -1)" transform-origin="center"
			options={{
				height: 50,
				amplitude: 25,
				speed: 0.5,
				points: 1
			}}/>
		}
		<Container>
			<StyledLink to="/">🥛</StyledLink>
		</Container>
	</>
)

export default Header
