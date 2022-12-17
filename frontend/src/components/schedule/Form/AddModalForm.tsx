import { FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, Text, Button, Box, HStack, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import API from 'src/function/API'

const AddModalForm = () => {
    const [event, setEvent] = useState("")
    const handleInputEventChange = (e: any) => setEvent(e.target.value)

    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)

    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [time, setStartTimeInput] = useState("")
    const handleInputTimeChange = (e: any) => setStartTimeInput(e.target.value)

    const [endtime, setEndTimeInput] = useState("")
    const handleInputEndTimeChange = (e: any) => setEndTimeInput(e.target.value)

    const [type, setType] = useState();
    const handleSelectType = (e: any) => setType(e.target.value)

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

    const handleSubmit = () => {
        console.log(time, endtime);

        API.post<Event>("/schedule/createEvent", {
            eventName: event,
            stTime: time,
            endTime: endtime,
            desc: description,
            eventTypeId: type,
            placeId: location,
            isNoti: isNoti
        }).then((res) => console.log(res))
            .catch((err => console.log("Error")))
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
           
               <FormControl isRequired>
                <FormLabel color="black">
                    <Text fontSize={{ base: "20px", md: "24px" }}>Event name</Text>
                </FormLabel>
                <Input
                    id="name"
                    type="text"
                    value={event}
                    onChange={(e) => handleInputEventChange(e)}
                    maxLength={100}
                    isRequired
                    placeholder="What's your event?"
                    boxShadow="md"
                    bgColor="white"
                />
            </FormControl>

            <FormControl mt={4}>
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
                <FormControl mt={4} pr="4">
                    <FormLabel color="black">
                        <Text fontSize={{ base: "20px", md: "24px" }}>Start Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" size="xs"
                        id="time"
                        type="datetime-local"
                        value={time}
                        onChange={(e) => { handleInputTimeChange(e) }}
                        boxShadow="md" />
                </FormControl>

                <FormControl mt={4} pr="4">
                    <FormLabel color="black" >
                        <Text fontSize={{ base: "20px", md: "24px" }}>End Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time"
                        size="xs"
                        type="datetime-local"
                        onChange={(e) => { handleInputEndTimeChange(e) }} 
                        boxShadow="md"/>

                </FormControl>

                <FormControl mt={4} >
                    <FormLabel color="black">
                        <Text fontSize={{ base: "20px", md: "24px" }}>Event Type</Text>
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


            <FormControl mt={4}>
                <FormLabel color="black">
                    <Text fontSize={{ base: "20px", md: "24px" }}>Location</Text>
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
                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={4}>
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
                    onClick={handleSubmit}>
                    Add
                </Button>
            </HStack> 
            
            


        </>
    )
}

export default AddModalForm