/* A custom radio button component. */
import { Box, Text, useRadio } from "@chakra-ui/react"
import { motion } from "framer-motion"

// RadioBox component for dating option page
export function DatingOptionRadioBox(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <motion.div
                initial={
                    { cursor: "pointer" }
                }
                whileHover={{ scale: 1.05, }}
                whileTap={{
                    scale: 0.95,
                }}
            >
                <Box
                    {...checkbox}
                    onClick={() => {
                        props.onClick(props.children)
                    }}
                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    cursor="pointer"
                    borderRadius="15px"
                    backgroundColor="#B24000"
                    color="white"
                    _checked={{
                        bg: "#E65300",
                        color: "white",
                    }}
                    _focus={{
                        boxShadow: "outline",
                    }}
                    px={5}
                    py={3}
                >
                    <Text fontWeight="700"
                        fontSize="16px"
                        lineHeight="120%" pl="5px">
                        {props.children}
                    </Text>
                </Box></motion.div>
        </Box>

    )
}
