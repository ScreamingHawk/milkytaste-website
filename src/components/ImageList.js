import { RoundedImg } from "./Image"

const ImageList = ({ children }) => {
	const childs = children.map ? children : [children]

	return (
		<p>
			{childs.map(c => (
				<>
					<RoundedImg src={c} />
					<br/>
				</>
			))}
		</p>
	)
}

export default ImageList
