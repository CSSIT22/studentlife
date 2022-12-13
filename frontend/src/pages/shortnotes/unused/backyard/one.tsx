import { Box, Grid, Button, chakra, Flex, GridItem, Heading, Stack, Text, useCheckbox, useCheckboxGroup, Spacer, Select } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { BsCheckLg } from "react-icons/bs"
import { GrRadialSelected } from "react-icons/gr"

const data = {
    sn: [
        {
            id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
            topic: "How to make ER diagram in 10 minutes.",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: false,
        },
        {
            id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
            topic: "Network foro eginner.",
            course: "CSC220",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
        {
            id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
            topic: "Productive with agile.",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
        {
            id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
            topic: "How to make ER diagram in 10 minutes.",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: false,
        },
        {
            id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
            topic: "Network foro eginner.",
            course: "CSC220",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
        {
            id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
            topic: "Productive with agile.",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
    ],

    rsn: [
        {
            id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
            topic: "How to make ER diagram in 10 minutes.",
            course: "CSC218",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
        {
            id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
            topic: "Shortest path",
            course: "CSC210",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: false,
        },
        {
            id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
            topic: "Java programming",
            course: "CSC110",
            owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            createAt: "10-6-22",
            isPublic: true,
        },
    ],

    course: ["CSC210", "CSC213", "CSC218", "CSC220", "CSC110", "MTH110"],
}
const pg = () => {
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

                            {state.isChecked ? <BsCheckLg fontSize={30} color={"#e65d10"} /> : null}
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

// const [pName, setName] = useState("")
// const [people, setPeoples] = useState<string[]>([])
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

// const pg = () => {
//     const [coursePicked, setCoursePicked] = useState("")

//     const [filtered, setFiltered] = useState<any>([])
//     useEffect(() => {
//         dataFiltered() //what to do
//     }, [coursePicked]) // what to track
//     const picked = (e: any) => {
//         setCoursePicked(e.target.value)
//     }
//     const dataFiltered = () => {
//         setFiltered(data.sn.filter((items) => items.course == coursePicked))
//     }

//     return (
//         <Box>
//             <Select variant="filled" placeholder="All" onChange={(e) => picked(e)}>
//                 {data.course.map((course, key) => (
//                     <option value={course}>{course}</option>
//                 ))}
//             </Select>
//             <Button value={"CSC218"} onClick={(e) => picked(e)}>
//                 X
//             </Button>
//             <Button value={"CSC220"} onClick={picked}>
//                 X
//             </Button>
//             <Button value={""} onClick={picked}>
//                 X
//             </Button>

//             {coursePicked == "" ? (
//                 <>
//                     {data.sn.map((sn: any) => (
//                         <Text>{sn.topic}</Text>
//                     ))}
//                 </>
//             ) : (
//                 <>
//                     {filtered.map((f: any) => (
//                         <Text>{f.topic}</Text>
//                     ))}
//                 </>
//             )}
//         </Box>
//     )
// }
