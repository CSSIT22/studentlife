import { FormControl, FormLabel, Input, Textarea, Flex, Select, Switch, Text, Button, HStack, Box } from '@chakra-ui/react'
import React from 'react'

export const editEventForm = () => {

    return (
        <>
            <FormControl>
                <FormLabel color="black">
                    <Text fontSize="24px">Event name</Text>
                </FormLabel>
                <Input placeholder="Meeting with PM" boxShadow="md"/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel color="black">
                    <Text fontSize="24px">Description</Text>
                </FormLabel>
                <Textarea placeholder="Detail about event" size="md" boxShadow="md"/>
            </FormControl>

            <Box display={{ md: "flex"}}>
                <FormControl mt={4} pr="4">
                    <FormLabel color="black">
                        <Text fontSize="24px">Start Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" 
                    size="xs" 
                    type="datetime-local" 
                    boxShadow="md"/>
                </FormControl>

                <FormControl mt={4} pr="4">
                    <FormLabel color="black">
                        <Text fontSize="24px">End Time</Text>
                    </FormLabel>
                    <Input placeholder="Select time" 
                    size="xs" 
                    type="datetime-local"
                    boxShadow="md" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel color="black">
                        <Text fontSize="24px">Event Type</Text>
                    </FormLabel>
                    <Select placeholder="Select Event Type" 
                    size="sm"
                    boxShadow="md">
                        <option>Course</option>
                        <option>Assignment</option>
                        <option>Activity</option>
                    </Select>
                </FormControl>
            </Box>
                
           
            <FormControl mt={4}>
                <FormLabel color="black">Location</FormLabel>
                <Input placeholder="Place/ Platform"
                boxShadow="md" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <Switch id="notification" size="lg" mt={4} />
                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={"4"}>
                    Notification
                </FormLabel>
            </FormControl>
            <HStack mt={5} w="100%" justifyContent={"flex-end"}>
            <Button colorScheme="blue" width="239px" height="40px" bg="#E1AB20">
                        Edit
                    </Button>
                </HStack>
        </>
    )
}

export default editEventForm