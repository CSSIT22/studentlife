import { Box, Grid, Button, chakra, Flex, GridItem, Heading, Stack, Text, useCheckbox, useCheckboxGroup, Spacer } from "@chakra-ui/react"
import { FC, useState } from "react"
import { BsCheckLg } from "react-icons/bs"
import { GrRadialSelected } from "react-icons/gr"

let nextId = 0

const pg = () => {
    // const [pName, setName] = useState("")
    // const [people, setPeoples] = useState<string[]>([])
    const li = [
        { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", name: "csc120 week 2", owner: "grehg343-gj54-4bad-9gre-fkg9fidhjd89" },
        { id: "grehg343-gj54-4bad-9gre-fkg9fidhjd89", name: "csc210 week 6", owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
    ]
    const inLi = [
        {
            topic: "How to make ER diagram in 10 minutes.",
            liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
        {
            topic: "How to make ER diagram in 10 minutess.",
            liId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
        {
            topic: "How to make ER diagram in 10 minutesss.",
            liId: "grehg343-gj54-4bad-9gre-fkg9fidhjd89",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        },
    ]
    function CustomCheckbox(props: any) {
        const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

        return (
            <chakra.label gridColumnGap={2} bg="white" h={100} shadow={"xl"} rounded={8} p={2} cursor="pointer" {...htmlProps}>
                <input {...getInputProps()} hidden />

                <Grid templateColumns="repeat(3, 1fr)" h={"100%"} w={"100%"}>
                    <Spacer />
                    <GridItem>
                        <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <Heading size={"md"}>{props.name}</Heading>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex w={"100%"} h={"100%"} justifyContent={"end"} alignItems={"center"} pr={30}>
                            {/* {state.isChecked && <Box w={"100%"} h={"100%"} bg="orange.500" rounded={8} />} */}

                            {state.isChecked && (
                                // <Box bg={"white"} p={4} shadow={"md"}>
                                <BsCheckLg fontSize={30} color={"#e65d10"} />
                                // </Box>
                            )}
                        </Flex>
                    </GridItem>
                </Grid>
            </chakra.label>
        )
    }

    const { value, getCheckboxProps } = useCheckboxGroup({
        // defaultValue: [""],
    })

    return (
        <>
            <Stack>
                {/* <Text>The selected checkboxes are: {value.sort().join(" and ")}</Text> */}
                {li.map((li, key) => (
                    <CustomCheckbox {...getCheckboxProps({ value: li.id, name: li.name })} onClick={console.log(value)} />
                ))}
            </Stack>
        </>
    )
}

export default pg

// <>
//     <h1>Inspiring sculptors:</h1>
//     <input value={pName} onChange={(e) => setName(e.target.value)} />
//     <button
//         onClick={() => {
//             let x = people.concat(pName) //add to last
//             const newPeople = [pName, ...people] //add to begin
//             console.log(x)
//             console.log(newPeople)
//             setPeoples(newPeople)
//             setName("")
//         }}
//     >
//         Add
//     </button>
//     <ul>
//         {people.map((people, key) => (
//             <li key={key}>{people}</li>
//         ))}
//     </ul>
// </>
