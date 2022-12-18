import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Button, FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import API from "src/function/API";

// TODO: FIX btnRef in Following Modal
export const ShowEditProfileFormModal: React.FC<{ initialFocusRef: React.MutableRefObject<null>; finalFocusRef: React.MutableRefObject<null>; isOpen: boolean; onClose: VoidFunction; }> = ({ initialFocusRef, finalFocusRef, isOpen, onClose }) => {
    const [phone, setPhone] = useState<string>()
    const [birthDate, setBirthDate] = useState<string>()
    const [sex, setSex] = useState<string>()
    const [hobby, setHobby] = useState<string>()
    const [address, setAddress] = useState<string>()

    function phoneHandler(user_phone: string) {
        setPhone(user_phone)
    }

    function birthDateHandler(user_birthdate: string) {
        setBirthDate(user_birthdate)

    }

    function sexHandler(user_sex: string) {
        setSex(user_sex)

    }

    function hobbyHandler(user_hobby: string) {
        setHobby(user_hobby)

    }

    function addressHandler(user_address: string) {
        setAddress(user_address)

    }

    async function submitHandler() {
        await API.put("/user/profile/edit", {
            address: address,
            birth: birthDate,
            hobby: hobby,
            phone: phone,
            gender: sex,
        }).then((res) => {
            console.log(res)
        }).catch(err => console.error("Error happend during updating user profile", err))

    }

    return (
        <Modal initialFocusRef={initialFocusRef} finalFocusRef={finalFocusRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>About Me</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={(e) => { e.preventDefault(); submitHandler(); onClose() }}>
                    <ModalBody pb={6}>

                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input ref={initialFocusRef} placeholder="Phone Number" value={phone} onChange={(e) => phoneHandler(e.target.value)} />
                        </FormControl>

                        <HStack mt={4}>
                            <FormControl>
                                <FormLabel>Birth Date</FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => birthDateHandler(e.target.value)}
                                />
                            </FormControl>
                        </HStack>

                        <FormControl mt={4}>
                            <FormLabel>Sex</FormLabel>
                            <Select value={sex} onChange={(e) => sexHandler(e.target.value)}>
                                <option> </option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>LGBTQ+</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Hobby</FormLabel>
                            <Input placeholder="your favorite free time activity" value={hobby} onChange={(e) => hobbyHandler(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder="your address" value={address} onChange={(e) => addressHandler(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <motion.div whileHover={{ scale: 0.9 }}>
                            <Button type='submit' color="white" bg="orange.600"
                                _hover={{ background: "orange.200" }} mr={3}>
                                Save
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 0.9 }}>
                            <Button onClick={onClose} _hover={{ background: "gray.300" }}>Cancel</Button>
                        </motion.div>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
