import { Box, ChakraComponent, Container, ContainerProps, useBreakpointValue } from "@chakra-ui/react"
import { IconType } from "react-icons"
import NavBar from "../navbar/NavBar"

export interface secondaryNavProps {
    name: string
    Icon?: IconType
    to?: string
    subNav?: {
        name: string
        Icon?: IconType
        to: string
    }[]
}

interface AppBodyProps extends ContainerProps {
    disableNav?: boolean
    secondarynav?: secondaryNavProps[]
}

const AppBody: ChakraComponent<"div", AppBodyProps> = (props) => {
    const isMobile = useBreakpointValue({ base: false, md: true }, { ssr: false })

    return (
        <>
            {!props.disableNav && <NavBar secondarynav={props.secondarynav} />}
            {!props.disableNav && <Box h={!isMobile ? "64px" : `${120 + (props.secondarynav ? 30 : 0)}px`} mb={5}></Box>}
            <Container w="100%" maxW="container.lg" {...(props as ContainerProps)}>
                {props.children}
            </Container>
            {!isMobile && !props.disableNav && <Box h={"60px"} mb={5}></Box>}
        </>
    )
}

export default AppBody
