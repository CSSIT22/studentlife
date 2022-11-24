import { Button } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import Zone from "./Zone"

const SelectZone: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Button onClick={ColorChange} mr={2} ml={2} width={"100px"} rounded={"3xl"}>
            {name}
        </Button>
    )
}

function ColorChange() {
    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive(!active)
    }

    return (
        <div>
            <Button onClick={handleClick} style={{ color: active ? "orange" : "gray" }}>
                <Zone name={"+zone"} />
            </Button>
        </div>
    )
}

export default SelectZone
