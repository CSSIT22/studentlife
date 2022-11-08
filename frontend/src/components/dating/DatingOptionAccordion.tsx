import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import { DatingOptionMultipleChoose } from "./DatingOptionMultipleChoose"

const DatingOptionAccordion: FC<{
    faculties: string[]
    selectedFac: string[]
    setSelectedFac: React.Dispatch<React.SetStateAction<string[]>>
    getCheckboxProps: any
}> = ({ faculties, selectedFac, setSelectedFac, getCheckboxProps }) => {
    function handleFac(fac: any) {
        let arr: string[] = selectedFac
        if (fac === "All Faculty") {
            if (arr.includes(fac)) {
                setSelectedFac([])
            } else setSelectedFac(faculties)
            return
        }
        console.log("This arr: " + arr)
        if (!arr.includes(fac)) {
            arr = [...arr, fac]
            arr.sort()
            setSelectedFac([...arr])
            console.log("array: " + selectedFac)
            console.log("This add? :" + arr.indexOf(fac))
        } else {
            // filter?
            arr = arr.filter((item) => item !== fac)
            setSelectedFac([...arr])

            console.log("This remove? :" + arr.splice(arr.indexOf(fac), arr.indexOf(fac) + 1))
        }
        let arrWithoutAllfact = faculties.filter((item) => item !== faculties[0])
        let isAll = true
        arrWithoutAllfact.forEach((item) => {
            if (!arr.includes(item)) {
                isAll = false
            }
        })
        if (isAll) {
            setSelectedFac([faculties[0], ...arr])
        } else {
            setSelectedFac(arr.filter((item) => item !== faculties[0]))
        }
        console.log("This :" + arr)
    }

    return (
        <Accordion allowToggle flex="left">
            <AccordionItem>
                <h2>
                    <AccordionButton
                        bg={"orange.200"}
                        color="white"
                        borderRadius="20px"
                        _expanded={{ bg: "orange.200", color: "white" }}
                        _hover={{ bg: "orange.300", color: "white", border: "orange.800" }}
                    >
                        <Box textAlign="left" borderRadius="full">
                            Selected Faculty
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Stack>
                        {/* <Text>You have select from: {selectedFac.sort().join(" , ")}</Text> */}
                        {faculties.map((faculty) => (
                            <DatingOptionMultipleChoose
                                {...getCheckboxProps({ value: faculty })}
                                handelClick={(e: any) => {
                                    handleFac(e)
                                }}
                                isChecked={selectedFac.includes(faculty)}
                            />
                        ))}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default DatingOptionAccordion
