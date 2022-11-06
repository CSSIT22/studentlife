import AppBody from "../../components/share/app/AppBody"
import YouAreMatchWithWhiteImg from "../../components/dating/pic/youarematchwithwhite.png"
import YouAreMatchWithBlackImg from "../../components/dating/pic/youarematchwithblack.png"
import HeartCheckingWhiteImg from "../../components/dating/pic/heartcheckingwhite.png"
import HeartCheckingBlackImg from "../../components/dating/pic/heartcheckingblack.png"
import ActivityPollWhiteImg from "../../components/dating/pic/activitypollwhite.png"
import ActivityPollBlackImg from "../../components/dating/pic/activitypollblack.png"
import RandomizationWhiteImg from "../../components/dating/pic/randomizationwhite.png"
import RandomizationBlackImg from "../../components/dating/pic/randomizationblack.png"
import TagOfInterestWhiteImg from "../../components/dating/pic/tagofinterestwhite.png"
import TagOfInterestBlackImg from "../../components/dating/pic/tagofinterestblack.png"
import DatingOptionsWhiteImg from "../../components/dating/pic/datingoptionwhite.png"
import DatingOptionsBlackImg from "../../components/dating/pic/datingoptionblack.png"
import DatingTutorialWhiteImg from "../../components/dating/pic/datingtutorialwhite.png"
import DatingTutorialBlackImg from "../../components/dating/pic/datingtutorialblack.png"
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
    FormControl,
    FormLabel,
    Code,
    Select,
    color,
    border,
    Tooltip,
    Wrap,
    WrapItem,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { RadioBox } from "../../components/dating/RadioBox"
import { useRadioGroup } from "@chakra-ui/react"

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
            "Age min =" +
                globalThis.age[0] +
                " | Age max =" +
                globalThis.age[1] +
                " | Use age: " +
                globalThis.useAge +
                " | Gender : " +
                globalThis.gender
        )
    }

    return (
        <AppBody
            secondarynav={[
                {
                    name: "Randomization",
                    to: "/dating",
                    Icon: isMobile ? RandomizationWhiteImg : RandomizationBlackImg,
                },
                {
                    name: "Heart checking",
                    to: "/dating/likedyou",
                    Icon: isMobile ? HeartCheckingWhiteImg : HeartCheckingBlackImg,
                },
                {
                    name: "You are match with",
                    to: "/dating/match",
                    Icon: isMobile ? YouAreMatchWithWhiteImg : YouAreMatchWithBlackImg,
                },
                {
                    name: "Activity poll",
                    to: "/dating/poll",
                    Icon: isMobile ? ActivityPollWhiteImg : ActivityPollBlackImg,
                },
                {
                    name: "Tag of interest",
                    to: "/dating/interest",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? TagOfInterestWhiteImg : TagOfInterestBlackImg,
                },
                {
                    name: "Option",
                    to: "/dating/option",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingOptionsWhiteImg : DatingOptionsBlackImg,
                },
                {
                    name: "Tutorial",
                    to: "/dating/tutorial/welcome",
                    isRight: true,
                    disableText: true,
                    Icon: isMobile ? DatingTutorialWhiteImg : DatingTutorialBlackImg,
                },
            ]}
        >
            <Stack pt="5">
                {/* Heading and heading description part */}
                <Heading>Dating Option</Heading>
                <Box pt="3">
                    <Text>Set the criteria to be used for the profile randomization.</Text>
                </Box>

                {/* DON'T CHANGE "columns" to "column" OR ELSE IT WILL NOT RESPONSIVE*/}
                <SimpleGrid gap={12} pt={8} columns={{ base: "1", md: "2" }}>
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
                                        defaultChecked
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
                                        <RadioBox key={value} {...radio} onClick={handleGender}>
                                            {value}
                                        </RadioBox>
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
                                    <AccordionPanel pb={4}>Use select here</AccordionPanel>
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
        </AppBody>
    )
}

export default DatingOption
