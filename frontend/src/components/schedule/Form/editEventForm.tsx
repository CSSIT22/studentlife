import { FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, Text, Button, Box, HStack, useBreakpointValue, useBoolean } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import API from 'src/function/API'

export const editEventForm = () => {
    const [event, setEvent] = useState("")

    const [description, setDescriptionInput] = useState("")

    const [location, setLocationInput] = useState("")

    const [time, setStartTimeInput] = useState("")

    const [endtime, setEndTimeInput] = useState("")

    const [type, setType] = useState<any>({});

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
    const [isError, { on }] = useBoolean()

    // const getEvent = API.get("/schedule/getNewEvent/" + param.eventId)
    // useEffect(() => {
    //     console.log(param);
    //     getEvent.then((res) => {
    //         setEvent(res.data)
    //         console.log(res.data)
    //     })
    //     getEvent.catch((err) => on())
    // }, [])

    let { eventId } = useParams()
    useEffect(() => {
        API.post("/schedule/getNewEvent", { eventId: eventId }).then((res) => {
            setEvent(res.data.eventName);
            setDescriptionInput(res.data.desc);
            setLocationInput(res.data.place);
            setType(res.data.eventTypeId);
            console.log(res.data);
        })
    })

    const editEvent = (eventId: string) => {
        API.post("/schedule/editEvent", { eventId: eventId }).then((res) => {
            console.log(res.data);
        }).catch((err => console.log("Error")))
            .then(() => {
                navigate({
                    pathname: "/schedule"
                })
            })
    }

    const submit = () => {
        API.post("/schedule/editEvent", {
            eventName: event,
            stTime: time,
            endTime: endtime,
            desc: description,
            eventTypeId: type,
            place: location,
            isNoti: isNoti
        }).then((res) => console.log(res))
            .catch((err => console.log("Error")))

            .then(() => {
                navigate({
                    pathname: "/schedule"
                })
            })
    }

    return (
        <>
            <FormControl>
                <FormLabel color="black">
                    <Text fontSize="24px">Event name</Text>
                </FormLabel>
                <Input
                    id="name"
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    maxLength={100}
                    placeholder={event}
                    boxShadow="md"
                    bgColor="white"
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel color="black">
                    <Text fontSize="24px">Description</Text>
                </FormLabel>
                <Textarea
                    id="description"
                    isRequired
                    value={description}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    placeholder="Description"
                    size="md"
                    boxShadow="md"
                />
                <Textarea placeholder="Detail about event" size="md" boxShadow="md" />
            </FormControl>

            <Box display={{ md: "flex" }}>
                <FormControl mt={4} pr="4">
                    <FormLabel color="black">
                        <Text fontSize="24px">Start Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" size="s"
                        id="time"
                        type="datetime-local"
                        value={time}
                        onChange={(e) => setStartTimeInput(e.target.value)}
                        boxShadow="md" />
                </FormControl>

                <FormControl mt={4} pr="4">
                    <FormLabel color="black">
                        <Text fontSize="24px">End Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time"
                        size="s"
                        type="datetime-local"
                        onChange={(e) => setEndTimeInput(e.target.value)}
                        boxShadow="md" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color="black">
                        <Text fontSize="24px">Event Type</Text>
                    </FormLabel>
                    <Select placeholder="Select event type"
                        boxShadow="md"
                        onChange={(e) => setType(e.target.value)}
                        size='sm'>
                        <option value="Course">Course</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Activity">Activity</option>
                    </Select>
                </FormControl>
            </Box>


            <FormControl mt={4}>
                <FormLabel color="black">Location</FormLabel>
                <Input
                    id="name"
                    type="text"
                    value={location}
                    onChange={(e) => setLocationInput(e.target.value)}
                    maxLength={100}
                    placeholder={location}
                    boxShadow="md"
                    bgColor="white"
                />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <Switch id="notification" size="lg" mt={4} />
                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={"4"}>
                    Notification
                </FormLabel>
            </FormControl>
            <HStack mt={5} w="100%" justifyContent={"flex-end"}>
                <Button colorScheme="blue" width="239px" height="40px" bg="#E1AB20" onClick={submit}>
                    Edit
                </Button>
            </HStack>
        </>
    )
}

export default editEventForm