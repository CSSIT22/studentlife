import { ChakraTheme, extendTheme } from "@chakra-ui/react"

const styles: ChakraTheme["styles"] = {
    global: (props) => ({
        "html, body": {
            background: "gray.50",
            color: "gray.600",
        },
        "::-webkit-scrollbar": {
            width: "10px",
        },
        "::-webkit-scrollbar-track ": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
    }),
}

const colors: ChakraTheme["colors"] = {
    orange: {
        50: "#FFF2E5",
        100: "#E69C73",
        200: "#E68E5C",
        300: "#E67F45",
        400: "#E6702E",
        500: "#E65D10",
        600: "#E65300",
        700: "#CC4900",
        800: "#B24000",
        900: "#8C3200",
    },
}

export const theme = extendTheme({
    styles,
    colors,
})
