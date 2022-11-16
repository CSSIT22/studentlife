import { Button, Input, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"
import { Student } from "@apiType/training"

const update = () => {
    const param = useParams()
    const [name, setname] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const submit = () => {
        API.post<Student>("/training/editstudent", {
            name: name,
            id: param.id,
        })
            .then((res) => navigate("/training/" + res.data.id))
            .catch((err) => toast({ status: "error", title: "Error", description: "Not authenticated" }))
    }
    return (
        <AppBody>
            <Input placeholder="name" onChange={(e) => setname(e.target.value)} value={name} />
            <Button onClick={submit}>Submit</Button>
        </AppBody>
    )
}

export default update
