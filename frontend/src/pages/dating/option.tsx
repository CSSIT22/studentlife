import {
    Heading,
    useBreakpointValue,
    Text,
    Box,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Stack,
    Center,
    Grid,
    Flex,
    Spacer,
    Checkbox,
    Button,
    RangeSliderMark,
    Divider,
    SimpleGrid,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Accordion,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { RadioBox } from "../../components/dating/RadioBox"
import { useRadioGroup } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"
declare global {
    var age: number[], gender: string, faculty: string[], useAge: boolean
}
const DatingOption = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    //set default value from database by using condition from here
    //
    //
    const options = ["Male", "Female", "Everyone"] // Gender type

    //For RadioBox
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Gender",
        defaultValue: globalThis.gender,
        //onChange: console.log,
    })
    const group = getRootProps()

    //For faculty

    globalThis.useAge = true //need db + condition
    globalThis.age = [19, 25] //need db + condition
    globalThis.gender = "Everyone" //need db + condition
    const [useAgeValue, setUseAgeValue] = useState(globalThis.useAge) //For use age to be criteria
    const [sliderValue, setSliderValue] = useState(globalThis.age) //For age min,max
    const [selected, setSelected] = useState(globalThis.gender) //For gender

    function handleAge() {
        //Passing data + debug
        globalThis.age = sliderValue
        console.log(globalThis.age)
    }

    function handleCheck() {
        //Passing data + debug
        globalThis.useAge = useAgeValue
        console.log(globalThis.useAge)
    }

    function handleGender(gender: string) {
        //Passing data
        setSelected(gender)
    }

    function handleSubmit() {
        //Submit data to database + show the alert result (debug)
        globalThis.useAge = useAgeValue
        globalThis.age = sliderValue
        globalThis.gender = selected

        alert(
            "Age min =" + globalThis.age[0] + " Age max =" + globalThis.age[1] + " Use age: " + globalThis.useAge + " Gender : " + globalThis.gender
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

                <SimpleGrid gap={12} pt={8} columns={{ base: "1", md: "2" }}>
                    <Box>
                        <Box pb={5}>
                            <Text fontSize="xl" as="b">
                                Age Preference
                            </Text>
                        </Box>
                        <Center bg="orange.200" h={20} borderRadius="20px">
                            {/* Is user use age as criteria? */}
                            <Checkbox
                                colorScheme="white"
                                defaultChecked
                                p="30px"
                                size="lg"
                                onChange={(val) => {
                                    handleCheck(), setUseAgeValue(!useAgeValue)
                                }}
                            ></Checkbox>
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
                                        <RadioBox key={value} {...radio} onClick={handleGender}>
                                            {value}
                                        </RadioBox>
                                    )
                                })}
                            </Stack>
                        </Box>
                    </Box>
                    <Box>
                        <Center>
                            {/* Chose multi Faculty preference */}
                            <Box pb={5}>
                                <Text fontSize="xl" as="b">
                                    Faculty Preference
                                </Text>
                            </Box>
                        </Center>
                    </Box>
                    {/* Submit button */}
                    <Center>
                        <Button type="submit" form="new-note" onClick={() => handleSubmit()}>
                            Done
                        </Button>
                    </Center>
                </SimpleGrid>
            </Stack>
        </DatingAppBody>
    )
}

export default DatingOption
