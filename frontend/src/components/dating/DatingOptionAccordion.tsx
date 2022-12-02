import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { DatingOptionMultipleChoose } from "./DatingOptionMultipleChoose"
import { AllFaculty } from "@apiType/dating"

declare global {
    var facs: any[]
}

const DatingOptionAccordion: FC<{
    faculties: AllFaculty[]
    selectedFac: AllFaculty[]
    // setSelectedFac: React.Dispatch<React.SetStateAction<string[]>>
    setSelectedFac: React.Dispatch<React.SetStateAction<AllFaculty[]>>
    getCheckboxProps: any
}> = ({ faculties, selectedFac, setSelectedFac, getCheckboxProps }) => {
    // setSelectedFac(["All Faculty"])
    // useEffect(() => {
    //     setFac(setFacs)
    //     console.log(selectedFac)
    // }, [])

    function handleCheck(SF: string) {
        // for (let index = 0; index < selectedFac.length; index++) {
        //     for (let index2 = 0; index2 < faculties.length; index2++) {
        //         // console.log(selectedFac[index])
        //         if (SF === (selectedFac[index] + "")) {
        //             // console.log("Ma value: " + selectedFac[index])
        //             return true
        //         }
        //     }
        // }
        // return false

        for (const element of selectedFac) {
            for (let index2 = 0; index2 < faculties.length; index2++) {
                // console.log(selectedFac[index])
                if (SF === (element + "")) {
                    // console.log("Ma value: " + selectedFac[index])
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
        // console.log(globalThis.facs)
        return facultyA
    }

    function handleFac(fac: string) {
        let arr: any[] = selectedFac
        // console.log(arr)
        if (fac === "All Faculty") {
            if (arr.includes(fac)) {
                setSelectedFac([])
            } else {
                // setSelectedFac(faculties)
                setSelectedFac(globalThis.facs)
                // setSelectedFac(handleSelectFac)
            }
            return
        }
        // console.log("This arr: " + arr)
        if (!arr.includes(fac)) {
            arr = [...arr, fac]
            arr.sort()
            setSelectedFac([...arr])
            // console.log("array: " + selectedFac)
            //console.log("This add? :" + arr.indexOf(fac))
        } else {
            // filter?
            arr = arr.filter((item) => item !== fac)
            setSelectedFac([...arr])
            //console.log("This remove? :" + arr.splice(arr.indexOf(fac), arr.indexOf(fac) + 1))
        }
        let arrWithoutAllfact = globalThis.facs.filter((item) => item !== "All Faculty")
        //        let arrWithoutAllfact = faculties.filter((item) => item.facultyName !== faculties[0].facultyName)
        let isAll = true
        arrWithoutAllfact.forEach((item) => {
            // console.log(arrWithoutAllfact)
            if (!arr.includes(item)) {
                isAll = false
                // console.log(isAll)
            }
        })
        if (isAll) {
            // setSelectedFac([faculties[0].facultyName, ...arr])
            // console.log(globalThis.facs[0])
            setSelectedFac([globalThis.facs[0], ...arr])
        } else {
            // setSelectedFac(arr.filter((item) => item !== faculties[0]))
            setSelectedFac(arr.filter((item) => item !== globalThis.facs[0]))
        }
        // console.log("This :" + arr)
    }

    // console.log(selectedFac)

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
                                isChecked={
                                    handleCheck(faculty)
                                }
                            // isChecked={selectedFac.includes(faculty)}
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
