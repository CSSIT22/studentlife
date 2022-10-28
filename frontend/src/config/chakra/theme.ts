import { ChakraTheme, extendTheme } from "@chakra-ui/react"

const styles: ChakraTheme["styles"] = {
    global: (props) => ({
        "html, body": {
            background: "gray.50",
            color: "gray.600",
        },
    }),
}

export const theme = extendTheme({
    styles,
})
