import { Box, ChakraComponent, Container, ContainerProps, useBreakpointValue } from "@chakra-ui/react"
import NavBar from "../navbar/NavBar"

const AppBody: ChakraComponent<"div", ContainerProps> = (props) => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })

    return (
        <>
            <NavBar />
            <Box h={!isMobile ? "64px" : "120px"} mb={5}></Box>
            <Container w="100%" maxW="container.lg" {...props}>
                {props.children}
            </Container>
        </>
    )
}

export default AppBody
