import styled from "styled-components"

const LinkContainer = styled.div`
	display: flex;
	flex-direction: horizontal;
	justify-content: center;
	align-items: center;
`

const LinkItem = styled.span`
	display: inline-block;
	margin: 0 1em;
`

const LineLinks = ({children}) => (
	<LinkContainer>
		{children.map ? children.map(link => (<LinkItem>{link}</LinkItem>)) : (<LinkItem>{children}</LinkItem>)}
	</LinkContainer>
)

export default LineLinks
