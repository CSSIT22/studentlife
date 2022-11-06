/* A custom radio button component. */
import { Box } from "@chakra-ui/react"
import { useRadio } from "@chakra-ui/react"

// RadioBox component for dating option page
export function DatingRadioBox(props: any) {
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
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "orange.200",
                    color: "white",
                    borderColor: "yellow.600",
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
