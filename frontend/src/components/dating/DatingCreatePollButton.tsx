import { Button, Center, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"
import { BsPencil } from "react-icons/bs"

const DatingCreatePollButton = () => {
    return (
        <Box position="fixed">
            <Link to="/dating/poll/create" style={{ textDecoration: "none" }}>
                <Button
                    display="flex-end"
                    type="submit"
                    form="new-note"
                    borderRadius="full"
                    colorScheme="orange"
                    // onClick={() => handleSubmit()}
                    m="10px"
                    p="10px"
                    mt="30px"
                >
                    <Center>
                        <BsPencil size="25px" />
                    </Center>
                </Button>
            </Link>
        </Box>
    )
}

export default DatingCreatePollButton
