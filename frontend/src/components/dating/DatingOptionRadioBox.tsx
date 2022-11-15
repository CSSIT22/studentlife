/* A custom radio button component. */
import { Box, useRadio } from "@chakra-ui/react"

// RadioBox component for dating option page
export function DatingOptionRadioBox(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                onClick={() => {
                    props.onClick(props.children)
                }}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="15px"
                //boxShadow="md"
                backgroundColor="#E65300"
                color="white"
                _checked={{
                    bg: "#B24000",
                    color: "white",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}
