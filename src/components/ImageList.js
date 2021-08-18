import styled from "styled-components"
import { RoundedImg } from "./Image"

const ImgContainer = styled.p`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const SpacedImg = styled(RoundedImg)`
	margin: 4px 0;
`

const ImageList = ({ children }) => {
	const childs = children.map ? children : [children]

	return (
		<ImgContainer>
			{childs.map(c => (
				<SpacedImg src={c} />
			))}
		</ImgContainer>
	)
}

export default ImageList
