import { Heading, Text, Box, Stack, Center, Button, SimpleGrid, useRadioGroup, useCheckboxGroup } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DatingOptionRadioBox } from "../../components/dating/DatingOptionRadioBox"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingOptionRangeSlider from "../../components/dating/DatingOptionRangeSlider"
import DatingOptionAccordion from "../../components/dating/DatingOptionAccordion"

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

    function handleGender(gender: string) {
        //Passing data
        setSelected(gender)
    }

    function handleSubmit() {
        //Submit data to database + show the alert result (debug)
        globalThis.useAge = useAgeValue
        globalThis.age = sliderValue
        globalThis.gender = selected
        globalThis.faculty = selectedFac
        console.log(selectedFac)
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
            <Stack pt="5" color="black">
                {/* Heading and heading description part */}
                <Heading>Option</Heading>
                <Box pt="3">
                    <Text>Set the criteria to be used for the profile randomization.</Text>
                </Box>

                {/* DON'T CHANGE "columns" to "column" OR ELSE IT WILL NOT RESPONSIVE*/}
                <SimpleGrid gap={12} pt={5} columns={{ base: 1, md: 2 }}>
                    <Box>
                        <Box pb={5}>
                            <Text fontSize="xl" as="b">
                                Age Preference
                            </Text>
                        </Box>
                        <DatingOptionRangeSlider
                            sliderValue={sliderValue}
                            useAgeValue={useAgeValue}
                            setUseAgeValue={setUseAgeValue}
                            setSliderValue={setSliderValue}
                        />
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
                            <DatingOptionAccordion
                                faculties={faculties}
                                selectedFac={selectedFac}
                                setSelectedFac={setSelectedFac}
                                getCheckboxProps={getCheckboxProps}
                            />
                        </Box>
                    </Box>
                </SimpleGrid>
                {/* Submit button */}
                <Center>
                    <Button
                        type="submit"
                        form="new-note"
                        borderRadius="15px"
                        colorScheme="orange"
                        onClick={() => handleSubmit()}
                        m="80px"
                        p="30px"
                        pr="50px"
                        pl="50px"
                    >
                        Done
                    </Button>
                </Center>
            </Stack>
        </DatingAppBody>
    )
}

export default DatingOption
