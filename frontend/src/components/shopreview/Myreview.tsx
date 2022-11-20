import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
    Avatar,
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    Image,
    Spacer,
    Button,
    Collapse,
    useDisclosure,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Link,
    background,
} from "@chakra-ui/react"
import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import ShopName from "./ShopName"

const Myreview: FC<{ image: String; name: String; ment: String; date: String }> = ({ image, name, ment, date }) => {
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const navigate = useNavigate()
    const navigateReview = () => {
        navigate("/shopreview/review")
    }
    return (
        <Box p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
            <Stack mb={3} direction={"row"} spacing={"24px"}>
                <Avatar name="" src={`url('${image}')`} />
                {/* ดีงข้อมูลมาจาก database */}
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {name}
                    </Text>
                    <Text color="gray" size={"sm"}>
                        {date}
                    </Text>
                </Flex>
                <Spacer width={"100%"} as="button" onClick={navigateReview}></Spacer>
                <Flex direction={"column"} justifyContent={"flex-start"}>
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <Box as="button">
                                <Image width={15} src="https://cdn1.iconfinder.com/data/icons/web-and-user-interface-21/512/30-512.png"></Image>
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent width={"100px"}>
                            {/* <PopoverCloseButton /> */}
                            <PopoverHeader textAlign={"center"}>
                                <Box width={"100%"} as="button">
                                    <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                        <EditIcon mr={2} />
                                        Edit
                                    </Flex>
                                </Box>
                            </PopoverHeader>
                            <PopoverBody textAlign={"center"}>
                                <Box color={"red"} width={"100%"} as="button">
                                    <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                        <DeleteIcon mr={2} />
                                        Delete
                                    </Flex>
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Stack>
            <Collapse startingHeight={20} in={show}>
                <Flex direction={"row"} alignItems={"flex-start"}>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} size={"sm"}>
                        {ment}
                    </Text>
                </Flex>
            </Collapse>
            {/* <Button _hover={{ background: "gray.500", color: "white" }} mb={4} size="sm" onClick={handleToggle} mt="1rem">
                Show {show ? "Less" : "More"}
            </Button> */}
            {/* ดีงข้อมูลมาจาก database */}
            <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <Box>
                    <img
                        style={{ width: 20 }}
                        src="https://toppng.com/public/uploads/thumbnail/white-location-icon-png-location-logo-png-white-11562856661b4wsud8br0.png"
                    ></img>
                    {}
                </Box>
                <ShopName name="ข้าวมันไก่ป้าตุ๊ก" />
                <AmountLike am_like={"100"} />
                {/* ดีงข้อมูลมาจาก database */}
                <AmountRate ratting={"5"} />
                {/* ดีงข้อมูลมาจาก database */}
            </Flex>
        </Box>
    )
}

export default Myreview
