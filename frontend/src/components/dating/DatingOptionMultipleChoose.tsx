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
            bg="orange.50"
            border="1px solid"
            borderColor="orange.500"
            rounded="lg"
            borderRadius="full"
            px={3}
            py={1}
            cursor="pointer"
            {...htmlProps}
            onClick={(e: any) => {
                props.handelClick(props.value)
                console.log("Original : " + props.value)
            }}
        >
            <Flex alignItems="center" justifyContent="center" border="2px solid" borderColor="orange.500" w={4} h={4} {...getCheckboxProps()}>
                {state.isChecked && <Box w={2} h={2} bg="orange.500" />}
            </Flex>
            <Text color="gray.700" {...getLabelProps()}>
                {props.value}
            </Text>
        </chakra.label>
    )
}
