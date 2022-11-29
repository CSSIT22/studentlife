import AppBody from "../share/app/AppBody"
import React from "react"

export const ToDoListAppBody = (props: any) => {
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
