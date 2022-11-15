import { StarIcon } from "@chakra-ui/icons"
import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    AspectRatio,
    Spacer,
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import AmountRate from "src/components/shopreview/AmountRate"
import AmountReview from "src/components/shopreview/AmountReview"
import LocationShop from "src/components/shopreview/LocationShop"
import Myreview from "src/components/shopreview/Myreview"
import Rate from "src/components/shopreview/Rate"
import ShopDetailName from "src/components/shopreview/ShopDetailName"
import AppBody from "../../components/share/app/AppBody"
import Rating from "../rating"

const shopdetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <AppBody>
            <ShopDetailName name={"ป้าตุ๊กข้าวมันไก่"} />
            <Box
                flex={1}
                bgImage={"url('https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSEmAUm74bI2EL8Sb34rOSLQkKjXQF.jpg')"}
                shadow={"lg"}
                w={"100%"}
                height={"sm"}
                p={4}
                color="white"
                padding={5}
            >
                {/* คุยกับโจข้อแก้การเพิ่มขนาด fix box amount rate ใหม่ของตรงนี้ */}
                <Spacer height={"95%"}></Spacer>
                <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end">
                    <Heading color="white">
                        <AmountRate ratting={"4.5"} />
                        {/* ดีงข้อมูลมาจาก database */}
                    </Heading>
                    <Box p={1} minWidth={"60px"} maxWidth={"200px"} height={"25px"} rounded={"2xl"} background={"#FF3939"}>
                        <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                            <Heading textAlign={"center"} size={"xs"} color="white">
                                <AmountReview am_re={"32"} />
                                {/* ดีงข้อมูลมาจาก database */}
                            </Heading>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Flex direction="row" justifyContent={"start"} alignItems="start" shadow={"20"}>
                <Heading padding={10} paddingLeft={"-1"} color={"green"} size={"lg"}>
                    Opening
                </Heading>
                <Heading padding={10} size={"lg"}>
                    (9.00-16.00)
                </Heading>
            </Flex>

            <Box flex={1} shadow={"lg"} color="white" rounded={0}>
                <AspectRatio ratio={16 / 9} w={"100%"} height={"sm"}>
                    <iframe
                        src={
                            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.1066061015226!2d100.49433491529686!3d13.651278603291741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a251bb6b0cf1%3A0xf656e94ff13324ad!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lie4Lij4Liw4LiI4Lit4Lih4LmA4LiB4Lil4LmJ4Liy4LiY4LiZ4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1634524662484!5m2!1sth!2sth"
                        }
                    ></iframe>
                </AspectRatio>
            </Box>

            {/* Box ยังไม่สามารถเอาข้อความมาตรงกลางได้ */}
            <LocationShop location={" 69 m.12 Prachauthid, Bangkok 212510"} phoneNumber={"099-123-4567"} />

            <Rate />
            <Box onClick={onOpen} as="button" mt={3} width={"100%"}>
                <Heading shadow={"md"} bgColor={"white"} padding={"10"} textAlign={"center"} size={"sm"} rounded={10}>
                    + Addyour
                </Heading>
                {/* pop ups  */}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Add Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <Rating />
                    {/* <Flex direction={"row"} justifyContent={"space-around"}>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </Flex> */}

                    <ModalBody>Hello</ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
                <Myreview
                    image={
                        "https://1.bp.blogspot.com/-jE186jY61HE/V89-xKtfUAI/AAAAAAAAAAo/t1SNZhfDyYYd9NW4zdWTkaNtzm316AK3ACEw/s1600/13775898_977718412347249_9051296491442397857_n%2B%25281%2529.jpg"
                    }
                    name={"Joeleely"}
                    ment={"Love this so much!!!"}
                    date={"18 พ.ย. 2022"}
                />
            </SimpleGrid>
        </AppBody>
    )
}

export default shopdetails
