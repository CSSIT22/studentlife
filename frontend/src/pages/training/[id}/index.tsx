import { Heading, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"

const ShowWithIds = () => {
    const param = useParams()
    const [student, setstudents] = useState<any>(null)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    useEffect(() => {
        API.get("/training/searchstudent/" + param.id)
            .then((item) => setstudents(item.data))
            .catch((err) => on())
            .finally(off)
    }, [])
    if (isLoading)
        return (
            <AppBody>
                <Heading>Loading</Heading>
            </AppBody>
        )
    if (isError)
        return (
            <AppBody>
                <Heading color={"red"}>There is an Error</Heading>
            </AppBody>
        )
    return <AppBody>{student && <Heading>{student.name}</Heading>}</AppBody>
}

export default ShowWithIds
