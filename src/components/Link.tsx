import { Link as ReactRouterLink } from "react-router-dom"
import { Link as MuiLink } from '@mui/material'

const Link = (props) => {return (
        <MuiLink component={ReactRouterLink} underline="none" {...props}>{props.children}</MuiLink>
)}

export default Link