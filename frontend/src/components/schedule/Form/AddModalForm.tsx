import { FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, Text, Button, Box, HStack, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import API from 'src/function/API'
import { useNavigate, useParams } from "react-router-dom";

const AddModalForm : FC<{modal1:any}>= ({modal1}) => {
    const { onClose: onAddClose } = useDisclosure()
    const [event, setEvent] = useState("")
    const handleInputEventChange = (e: any) => setEvent(e.target.value)

    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)

    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [time, setStartTimeInput] = useState("")
    const handleInputTimeChange = (e: any) => setStartTimeInput(e.target.value + ":41.000Z")

    const [endtime, setEndTimeInput] = useState("")
    const handleInputEndTimeChange = (e: any) => setEndTimeInput(e.target.value + ":41.000Z")

    const [type, setType] = useState();
    const handleSelectType = (e: any) => setType(e.target.value)

    const [course, setCourse] = useState<string | null>(null);

    const [courses, setCourses] = useState([]);
    // const handleInputCourseChange = (e: any) => setCourse(e.target.value)

    const [assignment, setAssignment] = useState();
    const handleInputAssignmentChange = (e: any) => setAssignment(e.target.value)

    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })

    function handleTime() {
        const starttime = new Date(time)
        return starttime
    }
    function handleEndTime() {
        const etime = new Date(endtime)
        return etime
    }
    const [isNoti, setIsNoti] = useState(false)
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/schedule/getCourseName/").then((res) => {
            setCourses(res.data)
            console.log(res.data)
        }).catch((err) => console.log(err))
    }, [])

    const handleSubmit = () => {
        console.log(time, endtime);
        onAddClose()
        const body: any = {
            eventName: event,
            stTime: time,
            endTime: endtime,
            desc: description,
            eventTypeId: type,
            place: location,
            isNoti: isNoti
        }

        if (type == "Assignment") {
            body.courseId = course
            body.assignmentName = assignment
        }
        if(type == "Course"){
            body.courseId = course
            
            console.log(body);
            
        }

        API.post<Event>("/schedule/createEvent", body).then((res) => console.log(res))
            .catch((err => console.log("Error")))
        // .then(() => {
        //     navigate({
        //         pathname: "/schedule"
        //     })
        // })
        if (type == "Assignment") {
            API.post<{
                taskName: string,
                taskDesc: string,
                created: any,
                due: any,
                taskType: any
            }>("/schedule/createTask", {
                taskName: event,
                taskDesc: description,
                created: time,
                due: endtime,
                taskType: "individual",

            }).then((res) => console.log(res))
                .catch((err => console.log("Error")))

        }

    }
    return (
        <>

            <FormControl >

                <FormLabel color="black">
                    <Box display="flex">
                        <Text fontSize={{ base: "20px", md: "24px" }} pr="2">Event name</Text>
                        <Text color="red">*</Text>
                    </Box>
                </FormLabel>

                <Input
                    id="name"
                    type="text"
                    value={event}
                    onChange={(e) => handleInputEventChange(e)}
                    maxLength={100}
                    placeholder="What's your event?"
                    boxShadow="md"
                    bgColor="white"
                />
            </FormControl>



            <FormControl mt={4} >
                <FormLabel color="black">
                    <Text fontSize={{ base: "20px", md: "24px" }}>Description</Text>
                </FormLabel>
                <Textarea
                    id="description"
                    isRequired
                    value={description}
                    onChange={handleInputDescriptionChange}
                    placeholder="Description"
                    size="md"
                    boxShadow="md"

                />
            </FormControl>

            <Box display={{ md: "flex" }} >
                <FormControl mt={4} pr="4" >
                    <FormLabel color="black">
                        <Box display="flex">
                            <Text fontSize={{ base: "20px", md: "24px" }}>Start Time</Text>
                            <Text color="red">*</Text>
                        </Box>
                    </FormLabel>
                    <Input placeholder="Select time" size="s"
                        id="time"
                        type="datetime-local"
                        
                        onChange={(e) => { handleInputTimeChange(e) }}
                        boxShadow="md" />
                </FormControl>

                <FormControl mt={4} pr="4" >
                    <FormLabel color="black" >
                        <Box display="flex">
                            <Text fontSize={{ base: "20px", md: "24px" }}>End Time</Text>
                            <Text color="red">*</Text>
                        </Box>

                    </FormLabel>
                    <Input placeholder="Select time"
                        size="s"
                        type="datetime-local"
                        onChange={(e) => { handleInputEndTimeChange(e) }}
                        boxShadow="md" />

                </FormControl>

                <FormControl mt={4} >
                    <FormLabel color="black" >
                        <Box display="flex">
                            <Text fontSize={{ base: "20px", md: "24px" }}>Event Type</Text>
                            <Text color="red">*</Text>
                        </Box>

                    </FormLabel>
                    <Box>
                        <Select placeholder="Select Event Type"
                            boxShadow="md"
                            onChange={(e) => { handleSelectType(e) }}
                            size='sm'>
                            <option value="Course">Course</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Activity">Activity</option>
                        </Select>
                    </Box>

                </FormControl>
            </Box>
            <Box display={{ md: "flex" }}>
                <FormControl mt={4} >
                    <FormLabel color="black">
                        <Text fontSize={{ base: "20px", md: "24px" }}>Assignment</Text>
                    </FormLabel>
                    <Input
                        id="assignment"
                        isRequired
                        value={assignment}
                        onChange={handleInputAssignmentChange}
                        placeholder="Assignment"
                        size="md"
                        boxShadow="md"

                    />
                </FormControl>
                <FormControl mt={4} >
                    <FormLabel color="black">
                        <Text fontSize={{ base: "20px", md: "24px" }}>Course</Text>
                    </FormLabel>
                    <Box>
                        <Select placeholder="Select course"
                            boxShadow="md"
                            onChange={(e) => { setCourse(e.target.value) }}
                            size='sm'>
                            {
                                courses.map((el: any) => (
                                    <option value={el.courseId}>{el.courseName}</option>
                                ))
                            }

                        </Select>
                    </Box>
                </FormControl>


            </Box>



            <FormControl mt={4}>
                <FormLabel color="black">
                    <Box display="flex">
                        <Text fontSize={{ base: "20px", md: "24px" }}>Location</Text>
                        <Text color="red">*</Text>
                    </Box>

                </FormLabel>
                <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => {
                        setLocationInput("")
                        handleInputLocationChange(e)
                    }}
                    maxLength={100}
                    isRequired
                    placeholder="Place/ Platform"
                    boxShadow="md"
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <Switch id="notification" size="lg" mt={4} onChange={() => setIsNoti(!isNoti)} />
                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={4} pl="3">
                    Notification
                </FormLabel>
            </FormControl>
            <HStack mt={5} w="100%" justifyContent={"flex-end"}>
                <Button
                    colorScheme="blue"
                    width="239px"
                    height="40px"
                    bg="#E65300"
                    type="submit"
                    onClick={() => {
                        // onAddClose()
                        handleSubmit()
                        modal1.onClose()
                        
                    }}

                // onClick={handleSubmit onAddClose()}>

                >Add
                </Button>
            </HStack>




        </>
    )
}

export default AddModalForm