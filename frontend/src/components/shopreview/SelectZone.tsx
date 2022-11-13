import { Button } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import Zone from "./Zone"

const SelectZone: FC<{
    name: String
    handleSetZones: Function
}> = ({ name, handleSetZones }) => {
    const [active, setActive] = useState(false)
    const handleClick = (e: React.MouseEvent) => {
        setActive(!active)
        handleSetZones(name)
        if (e.stopPropagation) {
            e.stopPropagation()
            console.log(name)
        }
    }
    return (
        <Button
            onClick={(e) => handleClick(e)}
            style={{ background: active ? "#FF7E20" : "", color: active ? "white" : "" }}
            mr={2}
            ml={2}
            transitionDuration="300ms"
            width={"100px"}
            rounded={"3xl"}
        >
            {name}
        </Button>
    )
}

export default SelectZone
