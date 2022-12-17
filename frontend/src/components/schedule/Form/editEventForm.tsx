import { FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, Text } from '@chakra-ui/react'
import React from 'react'

export const editEventForm = () => {

    return (
        <>
            <FormControl>
                <FormLabel color="black">
                    <Text fontSize="24px">Event name</Text>
                </FormLabel>
                <Input placeholder="Meeting with PM" />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel color="black">
                    <Text fontSize="24px">Description</Text>
                </FormLabel>
                <Textarea placeholder="Detail about event" size="md" />
            </FormControl>

            <Flex>
                <FormControl mt={4}>
                    <FormLabel color="black">
                        <Text fontSize="24px">Start Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" size="xs" type="time" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color="black">
                        <Text fontSize="24px">End Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" size="xs" type="time" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color="black">
                        <Text fontSize="24px">Event Type</Text>
                    </FormLabel>
                    <Select placeholder="Select Event Type" width="151px" height="32px">
                        <option>Course</option>
                        <option>Assignment</option>
                        <option>Activity</option>
                    </Select>
                </FormControl>
            </Flex>
            <FormControl mt={4}>
                <FormLabel color="black">Location</FormLabel>
                <Input placeholder="Place/ Platform" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <Switch id="notification" size="lg" mt={4} />
                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={"4"}>
                    Notification
                </FormLabel>
            </FormControl>
        </>
    )
}

export default editEventForm