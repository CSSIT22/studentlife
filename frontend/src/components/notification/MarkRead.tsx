import { Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { useParams } from "react-router-dom"
import API from "src/function/API"

const MarkRead: FC<{ module: string; onClick: Function }> = ({ module, onClick }) => {
    function readAll() {
        API.post("/notification/markallasRead/" + module)
    }
    return (
        <Button
            color={"orange.500"}
            bg={"transparent"}
            size="sm"
            onClick={() => {
                readAll(), onClick()
            }}
        >
            {" "}
            Mark all as read
        </Button>
    )
}

export default MarkRead
