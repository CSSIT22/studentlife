import { Heading, Text, Box, Stack, Center, Button, SimpleGrid, useRadioGroup, useCheckboxGroup, useToast, useBoolean, Container, GridItem, Grid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DatingOptionRadioBox } from "../../components/dating/DatingOptionRadioBox"
import DatingAppBody from "../../components/dating/DatingAppBody"
import DatingOptionRangeSlider from "../../components/dating/DatingOptionRangeSlider"
import DatingOptionAccordion from "../../components/dating/DatingOptionAccordion"
import { AllFaculty, UserOption } from "@apiType/dating"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"
import React from "react"
import DatingWentWrong from "src/components/dating/DatingWentWrong"
import Lottie from "lottie-react"
import DatingLoading from "../../components/dating/lottie/DatingLoading.json"
import { motion } from "framer-motion"

declare global {
    var age: number[], gender: string, faculty: AllFaculty[], useAge: boolean, firstTime: boolean, hasSetInterest: string
}
const DatingOption = () => {
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
    const didMount = useDidMount()
    const navigate = useNavigate()

    globalThis.hasSetInterest = "/dating/"
    globalThis.useAge = true //need db + condition
    globalThis.age = [19, 25] //need db + condition
    globalThis.gender = "Everyone" //need db + condition
    const [useAgeValue, setUseAgeValue] = useState<boolean>(globalThis.useAge) //For use age to be criteria
    const [sliderValue, setSliderValue] = useState<number[]>(globalThis.age) //For age min,max
    const [selected, setSelected] = useState<string>(globalThis.gender) //For gender
    const [selectedFac, setSelectedFac] = useState<AllFaculty[]>([]) //For Faculties
    const [isLoading, setIsLoading] = useState(true)
    const [isError, { on }] = useBoolean()

    let count = 1
    useEffect(() => {
        if (didMount && count != 0) {
            count--
            window.scrollTo(0, 0)
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDetail").then((detail) => {
                    function getAge(dateString: Date) {
                        var today = new Date()
                        var birthDate = new Date(dateString)
                        var age = today.getFullYear() - birthDate.getFullYear()
                        var m = today.getMonth() - birthDate.getMonth()
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            age--
                        }
                        return age
                    }
                    if (!detail.data.sex || !detail.data.birth) {
                        toast({
                            title: "It looks like some of your details are missing!",
                            status: "warning",
                            duration: 10000,
                            isClosable: true,
                            position: "top",
                            description: "Please specify your \"birth date\" and \"sex\" before using Dating & Finding Friend."
                        })
                        navigate("/user")
                    }
                    else if (getAge(detail.data.birth) < 18) {
                        toast({
                            title: "You don't meet the minimum age requirement!",
                            status: "warning",
                            duration: 10000,
                            isClosable: true,
                            position: "top",
                            description: "You are required to be at least 18 years old to use Dating & Finding Friend."
                        })
                        navigate("/")
                    }
                    else if (getAge(detail.data.birth) > 40) {
                        toast({
                            title: "You don't meet the maximum age requirement!",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                            description: "You are required to be at most 40 years old to use Dating & Finding Friend."
                        })
                        navigate("/")
                    }
                    else if (!datingEnroll.data.hasCompleteTutorial) {
                        toast({
                            title: "Welcome!",
                            status: "info",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                            description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend."
                        })
                        navigate("/dating/tutorial");
                    }

                })

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


                    setSelectedFac(
                        selectedOption.faculties.length === globalThis.facs.length - 1 ?
                            globalThis.facs :
                            selectedOption.faculties.map((item: any) => (item.facultyPref))
                    )
                    globalThis.useAge = selectedOption.useAge
                    globalThis.age = [selectedOption.ageMin, selectedOption.ageMax]
                    globalThis.gender = selectedOption.genderPref
                    globalThis.faculty = selectedOption.faculties
                    // console.log(globalThis.faculty)
                }
            })
            API.get("/dating/option/getFaculty").then((allFaculty) => {
                setFaculties(allFaculty.data)
                // setSelectedFac()
            })
                .catch(on).finally(() => setIsLoading(false));
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
    const options = ["Male", "Female", "LGBTQ+", "Everyone"] // Gender type
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

    function sendFac(SF: any[]) {
        //console.log(SF)
        let arr: string[] = []
        if (SF[0] !== null && Object.keys(SF[0]).length !== 0) {
            for (let index = 0; index < selectedFac.length; index++) {
                for (let index2 = 0; index2 < faculties.length; index2++) {
                    if (SF[index] === faculties[index2].facultyName) {
                        arr.push(faculties[index2].facultyId)
                    }
                }
            }
        }
        else {
            //console.log("Oh no")
            for (let index = 0; index < faculties.length; index++) {
                arr.push(faculties[index].facultyId)
            }

        }
        //console.log("Heh " + arr)
        return arr
    }

    function handleSubmit() {
        //Submit data to database + show the alert result (debug)
        globalThis.useAge = useAgeValue
        globalThis.age = sliderValue
        globalThis.gender = selected
        globalThis.faculty = selectedFac
        //console.log(selectedFac)
        // console.log(
        //     "Age min =" +
        //     globalThis.age[0] +
        //     " | Age max =" +
        //     globalThis.age[1] +
        //     " | Use age: " +
        //     globalThis.useAge +
        //     " | Gender : " +
        //     globalThis.gender +
        //     " | Selected Faculty: " +
        //     globalThis.faculty
        // )
        if (globalThis.faculty.length < 1) {
            toast({
                title: "Faculty Setting Incomplete!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                description: "You are required to set your faculty Preference first."
            })
        }
        else {
            setIsLoading(true)
        }

        // console.log("Test str " + sendFac(selectedFac))
        if (globalThis.firstTime) {
            API.post<UserOption | AllFaculty>("/dating/option/setOption", { ageMin: globalThis.age[0], ageMax: globalThis.age[1], genderPref: globalThis.gender, useAge: globalThis.useAge, facultyPref: sendFac(globalThis.faculty) })
                .then(() => navigate("/dating/interests"))
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request " + err) }))
        }
        else {
            API.put<UserOption | AllFaculty>("/dating/option/updateOption", { ageMin: globalThis.age[0], ageMax: globalThis.age[1], genderPref: globalThis.gender, useAge: globalThis.useAge, facultyPref: sendFac(globalThis.faculty) })
                .then(() => navigate(globalThis.hasSetInterest))
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request " + err) }))
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                if (!datingEnroll.data.hasCompleteSetting) {
                    globalThis.hasSetInterest = "/dating/interests"
                }
            })

        }
    }


    return (
        <DatingAppBody>
            {isLoading || isError ? <></> : <Stack pt="5" color="black">
                {/* Heading and heading description part */}
                <Box display="flex" justifyContent="center">
                    <Box zIndex="2" position="fixed" w="100%" justifyContent="space-between" top={{ base: 21, md: 157 }} >
                        <Container w="container.lg" maxW={"100%"}>
                            <Box maxW="100%" bg="#FFF2E6" pt={{ base: "70px", md: "35px" }}>
                                <Grid
                                    templateAreas={`"topic button" "desc desc"`}
                                    gridTemplateRows={"50px 50px"}
                                    gridTemplateColumns={"12rem px"}
                                    h={{ base: "100px", md: "125px" }}
                                >
                                    {/* Interests topic */}
                                    <GridItem area={"topic"}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <Heading color="Black" fontWeight="700" fontSize={{ base: "36px", md: "43px" }} lineHeight="120%">
                                                Option
                                            </Heading>
                                        </motion.div>
                                    </GridItem>
                                    <GridItem area={"desc"}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <Heading pl={0.5} color="black" fontWeight="500" fontSize={{ base: "15px", md: "18px" }} lineHeight="150%" pt={{ base: "0px", md: "5px" }}>
                                                Please select your preferences
                                            </Heading>
                                        </motion.div>
                                    </GridItem>
                                    {/* DatingInterestDynamicButton component: Skip & Done button */}

                                    <GridItem area={"button"} mt={{ base: "6px", md: "10px" }}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 360,
                                                damping: 20,
                                            }}>
                                            <Button
                                                colorScheme="orange"
                                                width={{ base: "79px", md: "200px" }}
                                                height={{ base: "33px", md: "70px" }}
                                                borderRadius="5px"
                                                float="right"
                                                type="submit"
                                                form="new-note"
                                                isDisabled={isDisabled}
                                                onClick={() => {
                                                    handleSubmit()
                                                        , setIsDisabled(!isDisabled)
                                                }}
                                            >
                                                <Box fontWeight="700" fontSize={{ base: "14px", md: "22px" }} line-height="120%">
                                                    Done
                                                </Box>
                                            </Button>
                                        </motion.div>
                                    </GridItem>
                                </Grid>
                                <Box>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Box>

                <Box pt={{ base: "80px", md: "100px" }} />
                {/* DON'T CHANGE "columns" to "column" OR ELSE IT WILL NOT RESPONSIVE*/}
                <SimpleGrid gap={12} pt={5} columns={{ base: 1, md: 2 }}>
                    <Box>
                        <Box pb={5}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Text fontWeight="700"
                                    fontSize="30px"
                                    lineHeight={{ base: "133%", md: "120%" }} as="b">
                                    Age Preference
                                </Text>
                            </motion.div>
                        </Box>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 360,
                                damping: 20,
                            }}>
                            <DatingOptionRangeSlider
                                sliderValue={sliderValue}
                                useAgeValue={useAgeValue}
                                setUseAgeValue={setUseAgeValue}
                                setSliderValue={setSliderValue}
                            />
                        </motion.div>
                    </Box>
                    <Box>
                        <Box pb={5}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Text fontWeight="700"
                                    fontSize="30px"
                                    lineHeight={{ base: "133%", md: "120%" }} as="b">
                                    Gender Preference
                                </Text>
                            </motion.div>
                            <Box pb={5} />
                            {/* Gender preference radio box*/}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
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
                            </motion.div>
                        </Box>
                    </Box>
                    <Box>
                        {/* Chose multi Faculty preference */}
                        <Box pb={5}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <Text fontWeight="700"
                                    fontSize="30px"
                                    lineHeight={{ base: "133%", md: "120%" }} as="b">
                                    Faculty Preference
                                </Text>
                            </motion.div>
                        </Box>
                        <Box>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}>
                                <DatingOptionAccordion
                                    faculties={faculties}
                                    selectedFac={selectedFac}
                                    setSelectedFac={setSelectedFac}
                                    // setSelectedFac={setSelectedFac}
                                    getCheckboxProps={getCheckboxProps}
                                />
                            </motion.div>
                        </Box>
                    </Box>
                </SimpleGrid>
                {/* Submit button */}
                <Center>

                </Center>
            </Stack>}

            {
                (isLoading) && !isError ? (
                    <>
                        <Box w="800px" h="400px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "450px", md: "400px" }}>
                            <Lottie animationData={DatingLoading} loop={true} style={{ scale: "0.6" }} />
                        </Box>
                        <Box w="350px" h="100px" display="block" position="fixed" left="50%" transform="translateX(-50%)" bottom={{ base: "180px", md: "125px" }}>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: `0.25em`
                                }}
                                animate={{
                                    opacity: 1,
                                    y: `0em`,
                                    transition: {
                                        duration: 1,
                                        ease: [0.2, 0.65, 0.3, 0.9],
                                    }
                                }}
                            >
                                <Text mt="-25%" textAlign="center" color="black" fontWeight="700" fontSize={{ base: "2xl", md: "5xl" }} lineHeight="120%" pl="18px" >
                                    LOADING . . .
                                </Text>
                            </motion.div>
                        </Box>
                    </>
                ) : (
                    <></>
                )
            }

            {
                isError ? (
                    <Box display="flex" h="66vh" justifyContent="center" alignItems="center">
                        <DatingWentWrong />
                    </Box>
                ) : (
                    <></>
                )
            }

        </DatingAppBody >
    )
}

export default DatingOption