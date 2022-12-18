import React from "react";
import { motion } from "framer-motion";
import { NavigateFunction } from "react-router-dom";
import {
    Button,
    ButtonGroup
} from "@chakra-ui/react";
import { ShowEditProfileFormModal } from "../customModal/ShowEditProfileFormModal";

export function userProfileButtons(onOpen: () => void, initialRef: React.MutableRefObject<null>, finalRef: React.MutableRefObject<null>, onClose: () => void, isOpen: boolean, navigate: NavigateFunction) {
    return <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
        <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 1.2 }}>
            <Button
                pl={5}
                width={{ xl: "7rem", lg: "5rem", base: "" }}
                height={{ xl: "3rem", lg: "2.5rem", base: "2rem" }}
                fontSize={{ base: "", lg: "lg" }}
                bg="orange.600"
                _hover={{ background: "orange.200" }}
                position="initial"
                value="inside"
                shadow={"lg"}
                onClick={onOpen}
            >
                Edit
            </Button>
        </motion.div>
        {/* Show Edit Form Modal */}
        <ShowEditProfileFormModal initialFocusRef={initialRef} finalFocusRef={finalRef} onClose={onClose} isOpen={isOpen} />
        <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.7 }}>
            <Button
                pl={5}
                bg="orange.600"
                _hover={{ background: "orange.200" }}
                width={{ lg: "9rem", base: "" }}
                height={{ xl: "3rem", lg: "2.5rem", base: "2rem" }}
                fontSize={{ base: "", lg: "lg" }}
                position="initial"
                shadow={"lg"}
                onClick={() => navigate("/blog/create")}
            >
                Create blog
            </Button>
        </motion.div>{" "}
    </ButtonGroup>;
}
