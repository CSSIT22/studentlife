import { Box, ChakraProvider } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { theme } from "./chakra/theme"

const AppConfig: FC<{ children: ReactNode }> = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default AppConfig
