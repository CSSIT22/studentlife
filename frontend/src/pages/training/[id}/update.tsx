import { Button, Input, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"

const update = () => {
    const param = useParams()
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const submit = () => {
        API.post("/training/editstudent", {
            name: name,
            id: param.id,
        })
            .then((res) => navigate("/training" + res.data.id))
            .catch((err) => toast({ status: "error", title: "Error", description: "Not authenticated" }))
    }
    return (
        <AppBody>
            <Input placeholder={name} onChange={(e) => setName(e.target.value)} value={name} />
            <Button>Submit</Button>
        </AppBody>
    )
}

export default update
