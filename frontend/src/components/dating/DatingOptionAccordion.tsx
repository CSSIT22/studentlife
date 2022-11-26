import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { DatingOptionMultipleChoose } from "./DatingOptionMultipleChoose"
import { AllFaculty } from "@apiType/dating"
import { a } from "@react-spring/web"
import API from "src/function/API"

declare global {
    var facs: string[]
}

const DatingOptionAccordion: FC<{
    faculties: AllFaculty[]
    selectedFac: any[]
    setSelectedFac: React.Dispatch<React.SetStateAction<AllFaculty[]>>
    getCheckboxProps: any
}> = ({ faculties, selectedFac, setSelectedFac, getCheckboxProps }) => {
    // setSelectedFac(["All Faculty"])

    globalThis.facs = addFac([])
    function addFac(facultyA: string[]) {
        facultyA.push("All Faculty")
        for (const element of faculties) {
            facultyA.push(element.facultyName)
        }
        // console.log("Fac is " + facultyA)
        return facultyA
    }

    function handleFac(fac: any) {
        let arr: any[] = selectedFac
        if (fac.toString() === "All Faculty") {
            if (arr.includes(fac)) {
                setSelectedFac([])
            } else setSelectedFac(faculties)
            return
        }
        // console.log("This arr: " + arr)
        if (!arr.includes(fac)) {
            arr = [...arr, fac]
            arr.sort()
            setSelectedFac([...arr])
            //console.log("array: " + selectedFac)
            //console.log("This add? :" + arr.indexOf(fac))
        } else {
            // filter?
            arr = arr.filter((item) => item !== fac)
            setSelectedFac([...arr])

            //console.log("This remove? :" + arr.splice(arr.indexOf(fac), arr.indexOf(fac) + 1))
        }
        let arrWithoutAllfact = faculties.filter((item: any) => item.toString() !== faculties[0].toString())
        let isAll = true
        arrWithoutAllfact.forEach((item: any) => {
            if (!arr.includes(item.toString())) {
                isAll = false
            }
        })
        if (isAll) {
            setSelectedFac([faculties[0], ...arr])
        } else {
            setSelectedFac(arr.filter((item: any) => item.toString() !== faculties[0].toString()))
        }
        // console.log("This :" + arr)
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
                        //_expanded={{ color: "white" }}
                        stroke={"#E2E8F0"}
                        _hover={{ border: "#E2E8F0" }}
                    >
                        <Box textAlign="left" borderRadius="full" color="black">
                            Selected Faculty
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Stack>
                        {/* <Text>You have select from: {selectedFac.sort().join(" , ")}</Text> */}
                        {/* {faculties.map((faculty) => ( */}
                        {/* <DatingOptionMultipleChoose
                            key={Math.random()}
                            {...getCheckboxProps({ value: "All Faculty" })}
                            // {{...getCheckboxProps({ value: faculty.facultyName })}
                            handelClick={(e: any) => {
                                handleFac(e)
                            }}
                            isChecked={true}
                        /> */}

                        {globalThis.facs.map((faculty) => (
                            <DatingOptionMultipleChoose
                                key={Math.random()}
                                {...getCheckboxProps({ value: faculty })}
                                handelClick={(e: any) => {
                                    handleFac(e)
                                }}
                                // isChecked={(e: any) => { selectedFac.includes(e.target.value.facultyName) }}
                                isChecked={selectedFac.includes(faculty)}
                            // isChecked={(e: any) => { selectedFac.includes(e.target.value) }}
                            />
                        ))}

                        {/* {faculties.map((faculty) => ( */}
                        {/* {faculties.map((faculty) => (
                            <DatingOptionMultipleChoose
                                key={Math.random()}
                                {...getCheckboxProps({ value: faculty.facultyName })}
                                // {{...getCheckboxProps({ value: faculty.facultyName })}
                                handelClick={(e: any) => {
                                    handleFac(e)
                                }}
                                isChecked={selectedFac.includes(faculty)}
                            // isChecked={(e: any) => { selectedFac.includes(e.target.value) }}
                            // isChecked={selectedFac.includes(faculty)}
                            // isChecked={(e: any) => { selectedFac.includes(e.target.value) }}
                            />
                        ))} */}
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default DatingOptionAccordion
