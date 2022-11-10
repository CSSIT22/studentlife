import { Box, Button, filter, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import { MODULES } from "./moduleTest"

const Modulelist = () => {
    const [selectedModule, setSelectedModule] = React.useState("All")
    // console.log(selectedModule)
    function showSelectedModule(module: string) {
        setSelectedModule(module)
    }
    return (
        <Menu>
            <MenuButton size="sm" as={Button} bg={"transparent"}>
                {selectedModule}
            </MenuButton>
            <MenuList>
                <Box height="30vh" overflow="auto">
                    <Stack direction={"column"} padding={4}>
                        {MODULES.map((el) => {
                            return (
                                <MenuItem onClick={() => showSelectedModule(el.name)} key={el.id}>
                                    {el.name}
                                </MenuItem>
                            )
                        })}
                    </Stack>
                </Box>
            </MenuList>
        </Menu>
    )
}

export default Modulelist
