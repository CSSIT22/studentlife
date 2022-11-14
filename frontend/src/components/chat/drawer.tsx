import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react"
import { useDisclosure, Button, Box } from "@chakra-ui/react"
import React from "react"
import Nmodal from "./Nmodal"

function DrawerExample(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { btnRef }: any = React.useRef()
    const room = props.item
    function DeleteRoom(e: any) {
        const result = props.userRoom.filter((el: any) => el.roomID !== e.roomID)
        props.setuserRoom(result)
    }
    return (
        <>
            <Button ref={btnRef} onClick={onOpen} variant={"ghost"} _hover={{ background: "transparent" }} _active={{ background: "transaprent" }}>
                :
            </Button>
            <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Report</DrawerHeader>

                    <DrawerBody textAlign={"center"}>
                        <Box>
                            <Button width={"100%"} marginBottom={2}>Mute</Button>
                        </Box>
                        <Box>
                            <Button width={"100%"} marginBottom={2} onClick={()=>DeleteRoom(room)}>
                                Deleteroom
                            </Button>
                        </Box>
                        <Box>
                            <Button width={"100%"} marginBottom={2}>
                                <Nmodal />
                            </Button>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default DrawerExample
