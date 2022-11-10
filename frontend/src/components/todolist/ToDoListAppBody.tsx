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
                    to: "/createtask",
                },
                {
                    name: "Folder",
                    to: "/folder",
                },
            ]}
        >
            {/* Used so that we can show elements inside DatingAppBody */}
        </AppBody>
    )
}

export default ToDoListAppBody
