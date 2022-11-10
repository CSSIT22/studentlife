import AppBody from "../share/app/AppBody"
import React from "react"

export const ToDoListAppBody = () => {
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
        </AppBody>
    )
}

export default ToDoListAppBody
