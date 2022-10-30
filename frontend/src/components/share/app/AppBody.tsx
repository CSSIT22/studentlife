import { Box, ChakraComponent } from "@chakra-ui/react"
import NavBar from "../navbar/NavBar"

const AppBody: ChakraComponent<"div", {}> = (props) => {
    return (
        <>
            <NavBar />
            <Box {...props}>{props.children}</Box>
        </>
    )
}

export default AppBody
