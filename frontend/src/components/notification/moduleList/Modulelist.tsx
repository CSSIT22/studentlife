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
                {/* <Box as="button"
            bg={"white"}
            height="100%" 
            overflow="auto"
            _hover={{ bg: "#E69C73", transitionDuration: "0.2s" }}
            transitionDuration="0.2s"
            borderRadius="2xl"> */}
                <Box w="100%" height="40vh" overflow="auto" background={"#E69C73"}>
                    <Stack direction={"column"} padding={4}>
                        {MODULES.map((el) => {
                            return (
                                <MenuItem onClick={() => onClick(el.name)} key={el.id} bg={"white"} as={Button}>
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
