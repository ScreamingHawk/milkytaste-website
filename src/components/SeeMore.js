import { Link } from "react-router-dom"

const SeeMore = ({ link }) => (
	<p>
		See more {link} or <Link to="/contact">contact me</Link> to get your own.
	</p>
)

export default SeeMore
