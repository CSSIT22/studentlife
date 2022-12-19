import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { DatingOptionMultipleChoose } from "./DatingOptionMultipleChoose"
import { AllFaculty } from "@apiType/dating"

declare global {
    var facs: any[]
}

const DatingOptionAccordion: FC<{
    faculties: AllFaculty[]
    selectedFac: AllFaculty[]
    setSelectedFac: React.Dispatch<React.SetStateAction<AllFaculty[]>>
    getCheckboxProps: any
}> = ({ faculties, selectedFac, setSelectedFac, getCheckboxProps }) => {

    function handleCheck(SF: string) {
        for (const element of selectedFac) {
            for (let index2 = 0; index2 < faculties.length; index2++) {
                if (SF === (element + "")) {
                    return true
                }
            }
        }
        return false
    }


    globalThis.facs = addFac([])
    function addFac(facultyA: string[]) {
        facultyA.push("All Faculty")
        for (const element of faculties) {
            facultyA.push(element.facultyName)
        }
        return facultyA
    }

    function handleFac(fac: string) {
        let arr: any[] = selectedFac
        if (fac === "All Faculty") {
            if (arr.includes(fac)) {
                setSelectedFac([])
            } else {
                setSelectedFac(globalThis.facs)
            }
            return
        }
        if (!arr.includes(fac)) {
            arr = [...arr, fac]
            arr.sort()
            setSelectedFac([...arr])
        } else {
            // filter?
            arr = arr.filter((item) => item !== fac)
            setSelectedFac([...arr])
        }
        let arrWithoutAllfact = globalThis.facs.filter((item) => item !== "All Faculty")
        let isAll = true
        arrWithoutAllfact.forEach((item) => {
            if (!arr.includes(item)) {
                isAll = false
            }
        })
        if (isAll) {
            setSelectedFac([globalThis.facs[0], ...arr])
        } else {
            setSelectedFac(arr.filter((item) => item !== globalThis.facs[0]))
        }
    }

    return (
        <Accordion allowToggle flex="left">
            <AccordionItem border={0}>
                <h2>
                    <AccordionButton
                        color="#2D3748"
                        bg="white"
                        borderRadius="15px"
                        shadow="black"
                        stroke={"#E2E8F0"}
                        _hover={{ border: "#E2E8F0" }}
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        mb="15px"
                    >
                        <Box textAlign="left" borderRadius="full" color="black" w="100%">
                            <Text color="black" fontWeight="400"
                                fontSize="16px"
                                lineHeight="20px">
                                Faculty
                            </Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Stack>
                        {globalThis.facs.map((faculty) => (
                            <DatingOptionMultipleChoose
                                key={Math.random()}
                                {...getCheckboxProps({ value: faculty })}
                                handelClick={(e: any) => {
                                    handleFac(e)
                                }}
                                isChecked={
                                    handleCheck(faculty)
                                }
                            />
                        ))}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default DatingOptionAccordion
