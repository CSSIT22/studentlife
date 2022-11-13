import { Box, Button, filter, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import { MODULES } from "./moduleTest"

const Modulelist: FC<{ onClick: Function; selectedModule: string }> = ({ onClick, selectedModule }) => {
    return (
        <Menu>
            <MenuButton color={"orange.500"} size="sm" as={Button} bg={"transparent"}>
                {selectedModule}
            </MenuButton>
            <MenuList background={"#E69C73"}>
                <Box w="100%" height="100%" overflow="auto" background={"#E69C73"}>
                    <Stack direction={"column"} padding={4}>
                        {MODULES.map((el) => {
                            return (
                                <MenuItem onClick={() => onClick(el.name)} 
                                key={el.id} 
                                bg={"white"} 
                                as={Button}>
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
