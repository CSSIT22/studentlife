import {
    Heading,
    Text,
    Box,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Stack,
    Center,
    Checkbox,
    Button,
    RangeSliderMark,
    SimpleGrid,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Accordion,
    Tooltip,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { DatingOptionRadioBox } from "../../components/dating/DatingOptionRadioBox"
import { useRadioGroup } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"
import { useCheckboxGroup } from "@chakra-ui/react"
import { DatingOptionMultiChose } from "../../components/dating/DatingOptionMultiChose"

declare global {
    var age: number[], gender: string, faculty: string[], useAge: boolean
}
const DatingOption = () => {
    //set default value from database by using condition from here
    const options = ["Male", "Female", "Everyone"] // Gender type
    const faculties = [
        "All Faculty",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Industrial Education and Technology",
        "School of Information Technology (SIT)",
        "School of Architecture and Design",
        "Faculty of Energy, Environment and Materials",
        "School of Bioresources and Technology ",
        "School of Liberal Arts",
        "Graduate School of Management and Innovation (GMI)",
        "Faculty of Industrial Education and Technology",
        "Institute of FIeld RoBOtics (FIBO)",
        "The Joint Graduate School of Energy and Environment (JGSEE)",
        "Collage of Multidiscliplinary Sciences",
    ] // All faculties

    //For RadioBox
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Gender",
        defaultValue: globalThis.gender,
        //onChange: console.log,
    })
    const group = getRootProps()

    //For faculty
    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: globalThis.faculty,
    })

    globalThis.useAge = true //need db + condition
    globalThis.age = [19, 25] //need db + condition
    globalThis.gender = "Everyone" //need db + condition
    globalThis.faculty = ["All Faculty"] //need db + condition
    const [useAgeValue, setUseAgeValue] = useState<boolean>(globalThis.useAge) //For use age to be criteria
    const [sliderValue, setSliderValue] = useState<number[]>(globalThis.age) //For age min,max
    const [selected, setSelected] = useState<string>(globalThis.gender) //For gender
    const [selectedFac, setSelectedFac] = useState<string[]>(globalThis.faculty) //For Faculties

    useEffect(() => {
        setSelectedFac(faculties)
    }, [])
    function handleAge() {
        //Passing data + debug
        globalThis.age = sliderValue
        // console.log(globalThis.age)
    }

    function handleCheck() {
        //Passing data + debug
        globalThis.useAge = useAgeValue
        // console.log(globalThis.useAge)
    }

    function handleGender(gender: string) {
        //Passing data
        setSelected(gender)
    }

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

    function handleSubmit() {
        //Submit data to database + show the alert result (debug)
        globalThis.useAge = useAgeValue
        globalThis.age = sliderValue
        globalThis.gender = selected
        globalThis.faculty = selectedFac
        console.log(selectedFac)
        if (globalThis.faculty[0] == "All Faculty") {
            console.log("All Fac")
        }
        alert(
            "Age min =" +
                globalThis.age[0] +
                " | Age max =" +
                globalThis.age[1] +
                " | Use age: " +
                globalThis.useAge +
                " | Gender : " +
                globalThis.gender +
                " | Selected Faculty: " +
                globalThis.faculty
        )
    }

    return (
        <DatingAppBody>
            <Stack pt="5">
                {/* Heading and heading description part */}
                <Heading>Dating Option</Heading>
                <Box pt="3">
                    <Text>Set the criteria to be used for the profile randomization.</Text>
                </Box>

                {/* DON'T CHANGE "columns" to "column" OR ELSE IT WILL NOT RESPONSIVE*/}
                <SimpleGrid gap={12} pt={8} columns={{ base: 1, md: 2 }}>
                    <Box>
                        <Box pb={5}>
                            <Text fontSize="xl" as="b">
                                Age Preference
                            </Text>
                        </Box>
                        <Center bg="orange.200" h={20} borderRadius="20px">
                            {/* Is user use age as criteria? */}
                            <Tooltip label="Use age as a criteria?" aria-label="A tooltip">
                                <span tabIndex={0}>
                                    <Checkbox
                                        colorScheme="white"
                                        defaultChecked={globalThis.useAge}
                                        p="30px"
                                        size="lg"
                                        onChange={(val) => {
                                            handleCheck(), setUseAgeValue(!useAgeValue)
                                        }}
                                    ></Checkbox>
                                </span>
                            </Tooltip>

                            {/* Age min and Age max */}
                            <RangeSlider
                                aria-label={["min", "max"]}
                                min={16}
                                max={40}
                                defaultValue={[19, 25]}
                                onChange={(val) => {
                                    handleAge(), setSliderValue(val)
                                }}
                                ml={"20px"}
                                mr={"45px"}
                            >
                                <RangeSliderMark value={sliderValue[0]} textAlign="center" color="white" mt="-10" ml="-5" w="12">
                                    {sliderValue[0]}
                                </RangeSliderMark>
                                <RangeSliderMark value={sliderValue[1]} textAlign="center" color="white" mt="-10" ml="-5" w="12">
                                    {sliderValue[1]}
                                </RangeSliderMark>
                                <RangeSliderTrack bg="red.100">
                                    <RangeSliderFilledTrack bg="tomato" />
                                </RangeSliderTrack>
                                <RangeSliderThumb boxSize={6} index={0}>
                                    <Box color="tomato" />
                                </RangeSliderThumb>
                                <RangeSliderThumb boxSize={6} index={1}>
                                    <Box color="tomato" />
                                </RangeSliderThumb>
                            </RangeSlider>
                        </Center>
                    </Box>
                    <Box>
                        <Box pb={5}>
                            <Text fontSize="xl" as="b">
                                Gender Preference
                            </Text>
                            {/* Gender preference radio box*/}
                            <Stack {...group} direction="column">
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                        <DatingOptionRadioBox key={value} {...radio} onClick={handleGender}>
                                            {value}
                                        </DatingOptionRadioBox>
                                    )
                                })}
                            </Stack>
                        </Box>
                    </Box>
                    <Box>
                        {/* Chose multi Faculty preference */}
                        <Box pb={5}>
                            <Text fontSize="xl" as="b">
                                Faculty Preference
                            </Text>
                        </Box>
                        <Box>
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
                                            <Box textAlign="left">Selected Faculty</Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Stack>
                                            {/* <Text>You have select from: {selectedFac.sort().join(" , ")}</Text> */}
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[0] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[0])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[1] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[1])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[2] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[2])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[3] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[3])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[4] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[4])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[5] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[5])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[6] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[6])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[7] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[7])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[8] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[8])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[9] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[9])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[10] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[10])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[11] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[11])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[12] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[12])}
                                            />
                                            <DatingOptionMultiChose
                                                {...getCheckboxProps({ value: faculties[13] })}
                                                handelClick={(e: any) => {
                                                    handleFac(e)
                                                }}
                                                isChecked={selectedFac.includes(faculties[13])}
                                            />
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                    </Box>
                </SimpleGrid>
                {/* Submit button */}
                <Center>
                    <Button type="submit" form="new-note" onClick={() => handleSubmit()} m={"80px"}>
                        Done
                    </Button>
                </Center>
            </Stack>
        </DatingAppBody>
    )
}

export default DatingOption
