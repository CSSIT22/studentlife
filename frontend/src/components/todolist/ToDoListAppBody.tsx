import AppBody from "../share/app/AppBody"
import { Flex, Container } from '@chakra-ui/react';
import { useBreakpointValue } from "@chakra-ui/react"
import React from "react"

export const ToDoListAppBody = (props: any) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    return (
        <AppBody
            secondarynav={[
                {
                    name: "To Do List",
                    to: "/todolist",
                },
                {
                    name: "Create Task",
                    to: "/todolist/createtask",
                },
                {
                    name: "Folder",
                    to: "/todolist/folderpage",
                },
            ]}
        >
            {/* Used so that we can show elements inside DatingAppBody */}
            {props.children}
        </AppBody>
    )
}

export default ToDoListAppBody
