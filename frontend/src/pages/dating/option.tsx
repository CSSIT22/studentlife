import { Heading, Text, Box, Stack, Center, Button, SimpleGrid, useRadioGroup, useCheckboxGroup, useToast, useBoolean } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DatingOptionRadioBox } from "../../components/dating/DatingOptionRadioBox"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingOptionRangeSlider from "../../components/dating/DatingOptionRangeSlider"
import DatingOptionAccordion from "../../components/dating/DatingOptionAccordion"
import { AllFaculty, UserOption } from "@apiType/dating"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"
import React from "react"

declare global {
    var age: number[], gender: string, faculty: AllFaculty[], useAge: boolean, firstTime: boolean
}
const DatingOption = () => {
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
    const didMount = useDidMount()
    const navigate = useNavigate()

    globalThis.useAge = true //need db + condition
    globalThis.age = [19, 25] //need db + condition
    globalThis.gender = "Everyone" //need db + condition
    const [useAgeValue, setUseAgeValue] = useState<boolean>(globalThis.useAge) //For use age to be criteria
    const [sliderValue, setSliderValue] = useState<number[]>(globalThis.age) //For age min,max
    const [selected, setSelected] = useState<string>(globalThis.gender) //For gender
    const [selectedFac, setSelectedFac] = useState<AllFaculty[]>([]) //For Faculties

    useEffect(() => {
        if (didMount) {
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                if (!datingEnroll.data.hasCompleteTutorial) {
                    navigate("/dating/tutorial");
                }
            })
            API.get("/dating/option/getOption").then((userSelectedOption) => {
                const selectedOption = userSelectedOption.data
                if (userSelectedOption.data.length < 1) {
                    globalThis.firstTime = true
                    return;
                }
                else {
                    globalThis.firstTime = false
                    setUseAgeValue(selectedOption.useAge)
                    setSliderValue([selectedOption.ageMin, selectedOption.ageMax])
                    setSelected(selectedOption.genderPref)
                    globalThis.useAge = selectedOption.useAge
                    globalThis.age = [selectedOption.ageMin, selectedOption.ageMax]
                    globalThis.gender = selectedOption.genderPref
                }
            })
            API.get("/dating/option/getFaculty").then((allFaculty) => {
                setFaculties(allFaculty.data)
                // setSelectedFac()
            })
                .catch((err) => console.log(err));
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    //set default value from database by using condition from here

    // const [isError, { on }] = useBoolean()
    // const [isLoading, { off }] = useBoolean(true)
    const options = ["Male", "Female", "Everyone"] // Gender type
    const [faculties, setFaculties] = useState<AllFaculty[] | AllFaculty[]>([]) //For Faculties
    // globalThis.faculty


    // const faculties = [
    //     "All Faculty",
    //     "Faculty of Engineering",
    //     "Faculty of Science",
    //     "Faculty of Industrial Education and Technology",
    //     "School of Information Technology (SIT)",
    //     "School of Architecture and Design",
    //     "Faculty of Energy, Environment and Materials",
    //     "School of Bioresources and Technology ",
    //     "School of Liberal Arts",
    //     "Graduate School of Management and Innovation (GMI)",
    //     "Institute of FIeld RoBOtics (FIBO)",
    //     "The Joint Graduate School of Energy and Environment (JGSEE)",
    //     "Collage of Multidiscliplinary Sciences",
    // ] // All faculties

    //For RadioBox
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Gender",
        defaultValue: "Everyone",
        // defaultValue: globalThis.gender,
        value: selected,
        //onChange: console.log,
    })
    const group = getRootProps()
    const toast = useToast()

    //For faculty
    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: ["All Faculty"],
    })

    // globalThis.useAge = true //need db + condition
    // globalThis.age = [19, 25] //need db + condition
    // globalThis.gender = "Everyone" //need db + condition
    // globalThis.faculty = ["All Faculty"] //need db + condition


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
        //console.log(selectedFac)
        console.log(
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
        if (globalThis.firstTime) {
            API.post<UserOption>("/dating/option/setOption", { ageMin: globalThis.age[0], ageMax: globalThis.age[1], genderPref: globalThis.gender, useAge: globalThis.useAge, facultyPref: globalThis.faculty })
                .then(() => navigate("/dating/"))
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request " + err) }))
        }
        else {
            API.put<UserOption>("/dating/option/updateOption", { ageMin: globalThis.age[0], ageMax: globalThis.age[1], genderPref: globalThis.gender, useAge: globalThis.useAge, facultyPref: globalThis.faculty })
                .then(() => navigate("/dating/"))
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("WRONG! " + err) }))
        }

        toast({
            title: "Options are selected.",
            description: "You have successfully submitted your options.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        })
    }

    return (
        <DatingAppBody>
            <Stack pt="5" color="black">
                {/* Heading and heading description part */}
                <Heading fontSize="36px">Option</Heading>
                <Box>
                    <Text fontSize="18px">Set the criteria to be used for the profile randomization</Text>
                </Box>

                {/* DON'T CHANGE "columns" to "column" OR ELSE IT WILL NOT RESPONSIVE*/}
                <SimpleGrid gap={12} pt={5} columns={{ base: 1, md: 2 }}>
                    <Box>
                        <Box pb={5}>
                            <Text fontSize="30px" as="b">
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
                            <Text fontSize="30px" as="b">
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
                            <Text fontSize="30px" as="b">
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
                        isDisabled={isDisabled}
                        onClick={() => { handleSubmit(), setIsDisabled(!isDisabled) }}
                        m="80px"
                        p="30px"
                        pr="50px"
                        pl="50px"
                    >
                        Done
                    </Button>
                </Center>
            </Stack>
        </DatingAppBody >
    )
}

export default DatingOption