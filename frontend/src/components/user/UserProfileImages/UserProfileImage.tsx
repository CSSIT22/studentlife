import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { ChangeProfileImageModal } from "../customModal/ChangeProfileImageModal"
import { userData } from 'src/pages/groups/data'
import { buffer_to_img } from 'src/components/chat/function/64_to_img'

import {
    Flex,
    Box,
    Avatar,
    useDisclosure,
} from "@chakra-ui/react"
import { NavigateFunction } from 'react-router-dom'



const UserProfileImages: React.FC<{ userData: any }> = ({ userData }) => {
    const { isOpen: isProfileOpen, onOpen: onProfileopen, onClose: onProfileClose } = useDisclosure()


    return <Flex>
        <motion.div animate={{ rotate: 360 }} transition={{ type: "spring", duration: 2, bounce: 0.6 }} whileHover={{ scale: 0.9 }}>
            <Avatar
                borderRadius='full'
                mt={{ md: "5px", base: "0" }}
                display="flex"
                position="initial"
                float={"inline-end"}
                boxSize={{ md: '200px', base: '10rem' }}
                shadow="2xl"
                bg='orange.400'
                src={`${buffer_to_img(userData?.image?.data)}`}
                _hover={{ cursor: "pointer" }}
            />
        </motion.div>{" "}

    </Flex>
        ;
}
export default UserProfileImages
