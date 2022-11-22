/* A custom multiple choose button component. */
import { chakra, useCheckbox, Flex, Box, Text } from "@chakra-ui/react"

export function DatingOptionMultipleChoose(props: any) {
    const { state, getCheckboxProps, getLabelProps, htmlProps } = useCheckbox(props)

    // For multiple chose of faculties
    return (
        <chakra.label
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridColumnGap={2}
            w="100%"
            bg="white"
            border="1px solid"
            borderColor="#E65300"
            rounded="lg"
            borderRadius="15px"
            px={3}
            py={1}
            cursor="pointer"
            {...htmlProps}
            onClick={(e: any) => {
                props.handelClick(props.value)
                console.log("Original : " + props.value)
            }}
        >
            <Flex alignItems="center" justifyContent="center" border="2px solid" borderColor="#E65300" w={4} h={4} {...getCheckboxProps()}>
                {state.isChecked && <Box w={2} h={2} bg="#E65300" />}
            </Flex>
            <Text color="black" {...getLabelProps()}>
                {props.value}
            </Text>
        </chakra.label>
    )
}
