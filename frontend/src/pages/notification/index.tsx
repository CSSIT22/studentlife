import { Box, Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react"
import React from "react"
import NotiTable from "../../components/notification/NotiTable"
import AppBody from "../../components/share/app/AppBody"

const notiTable = () => {
    return (
        <AppBody>
            <Box textAlign={"right"}>
                <Popover>
                    <PopoverTrigger>
                        <Button>🍒</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent bg="whiteAlpha.200" shadow={"2xl"}>
                            <PopoverBody>
                                <NotiTable />
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </Box>
        </AppBody>
    )
}

export default notiTable
