import React from "react"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Heading, SimpleGrid, Textarea } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import { Input, Switch, Flex, Spacer, Grid, GridItem } from "@chakra-ui/react"
import { Select, Text } from "@chakra-ui/react"
//import { ChevronRightIcon } from "@chakra-ui/icons"
//import { AddIcon } from "@chakra-ui/icons"
const theme = extendTheme({
    radii: {
        none: "0",
        sm: "0.125rem",
        base: "14px",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
    },
    component: {
        Modal: {
            size: {
                xl: {
                    h: "689px",
                    w: "824px",
                },
            },
        },
    },
    colors: {
        brand: {
            "200": "#9AE6B4",
        },
    },
})

const timetable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <AppBody>
            <SimpleGrid columns={[1, 6]} spacing="40px">
                <IconButton aria-label="previous" icon={<ChevronLeftIcon />} />

                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Date
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Month
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Year
                </Box>
                <IconButton aria-label="next" icon={<ChevronRightIcon />} />
                <IconButton
                    onClick={onOpen}
                    w="60px"
                    h="62px"
                    bg="#6CF5B4"
                    //colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon color="#828282" />}
                    borderRightRadius="55"
                    borderLeftRadius="55"
                />
                <Modal id="addButton" initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Heading color="black">Add Event</Heading>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel color="black">
                                    <Text fontSize="24px">Event name</Text>
                                </FormLabel>
                                <Input ref={initialRef} placeholder="Meeting with PM" />
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
                                    <Input placeholder="Select time" size="xs" type="datetime-local" />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel color="black">
                                        <Text fontSize="24px">End Time</Text>
                                    </FormLabel>
                                    <Input placeholder="Select time" size="xs" type="datetime-local" />
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
                                <FormLabel htmlFor="notification" mb="0" color="#5A5A5A" mt={4}>
                                    Notification
                                </FormLabel>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" width="239px" height="40px" bg="#E65300">
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </SimpleGrid>

            <Box boxShadow="md" p="6" rounded="md" bg="white">
                <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                    <h4> </h4>
                    <h4>SUN</h4>
                    <h4>MON</h4>
                    <h4>TUE</h4>
                    <h4>WED</h4>
                    <h4>THU</h4>
                    <h4>FRI</h4>
                    <h4>SAT</h4>
                </Grid>
            </Box>

            {/* <Button onClick={onOpen}>Delete</Button>
      

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <h4>Are you sure that you would like to delete this event?</h4>
            <h4>You might not be able to recover it back</h4>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='#38A169' mr={3}>
              Yes
            </Button>
            <Button onClick={onClose} colorScheme='#E53E3E'>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
        </AppBody>
    )
    // }
}

export default timetable
