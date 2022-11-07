/* A custom multiple choose button component. */
import { chakra, useCheckbox, Flex, Box, Text } from "@chakra-ui/react"
import { useState } from "react"

export function DatingOptionMultiChose(props: any) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)
    // const [selectedFac, setSelectedFac] = useState<string[]>(["All Faculty"])

    // function handleFac(fac: string) {
    //     let arr: string[] = selectedFac
    //     console.log("This arr: " + arr)
    //     if (arr.includes(fac) == false) {
    //         arr.push(fac)
    //         arr.sort()
    //         console.log("This add? :" + arr.indexOf(fac))
    //     } else if (arr.includes(fac) == true) {
    //         console.log("This remove? :" + arr.splice(arr.indexOf(fac), arr.indexOf(fac) + 1))
    //         // arr.splice(arr.indexOf(fac), arr.indexOf(fac) + 1)
    //     } else {
    //         console.log("WRONG!")
    //     }
    //     setSelectedFac(arr)
    //     console.log("This :" + arr)
    // }

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
            px={3}
            py={1}
            cursor="pointer"
            {...htmlProps}
            onClick={(e: any) => {
                props.handelClick(props.value)
                console.log("Original : " + props.value)
                // e.preventDefault()
            }}
        >
            {/* <input {...getInputProps()} hidden /> */}
            <Flex alignItems="center" justifyContent="center" border="2px solid" borderColor="orange.500" w={4} h={4} {...getCheckboxProps()}>
                {state.isChecked && <Box w={2} h={2} bg="orange.500" />}
            </Flex>
            <Text color="gray.700" {...getLabelProps()}>
                {props.value}
            </Text>
        </chakra.label>
    )
}
