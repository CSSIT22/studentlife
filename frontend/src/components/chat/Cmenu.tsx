import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Button } from "@chakra-ui/react"
import { FC } from "react"

const Cmenu: FC<any> = () => {
    return (
        <Menu>
            <MenuButton>:</MenuButton>
            <MenuList color={"black"}>
                <MenuItem>Mute</MenuItem>
                <MenuItem>Deteleroom</MenuItem>
                <MenuItem>Block</MenuItem>
                <MenuItem>Report</MenuItem>
            </MenuList>
        </Menu>
    )
}
export default Cmenu
