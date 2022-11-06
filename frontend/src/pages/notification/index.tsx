import { Box, Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react"
import React from "react"
import NotiTable from "../../components/notification/NotiTable"
import AppBody from "../../components/share/app/AppBody"

const notiTable = () => {
    return (
        <AppBody>
            <Popover>
                <PopoverTrigger>
                    <Button>Noti</Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent bg="whiteAlpha.200" shadow={"2xl"}>
                        <PopoverBody>
                            <NotiTable />
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </AppBody>
    )
}

export default notiTable
