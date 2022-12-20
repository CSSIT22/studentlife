import { Avatar, Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "src/function/API";
import { buffer_to_img } from "./function/64_to_img";

export type Restaurants = {
    resId: string
    resName: string
    images: [
        {
            image: string
        }
    ]
    detail: {
        website: string
        vicinity: string
    }
}


const ResCard: FC<any> = (props: any) => {
    const navigate = useNavigate()
    const { resId, from, myId, image } = props
    const [detail, setDetail] = useState<Restaurants[]>([])
    useEffect(() => {
        API.get(`restaurant/${resId}`).then((e) => setDetail(e.data))
    }, [])
    const isMe = from === myId
    const align = isMe ? "flex-end" : "flex-start"
    function rederAvatar(e: any) {
        if (e == false) {
            return <Avatar src={(image != null) ? buffer_to_img(image.data) : ""} />
        }
    }
    return (
        <VStack alignItems={align} alignSelf={align}>
            {rederAvatar(isMe)}
            <Card
                direction={'column'}
                rounded={'lg'}
                overflow='hidden'
                variant='outline'
                bg={'#fafaf7'}
                maxW={{ base: '70vh', sm: '200px' }}
                maxH={{ base: '990vh', sm: '250px' }}
                onClick={() => window.open(`${detail[0]?.detail.website}`)}
            >
                <Image
                    objectFit='cover'
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${detail[0]?.images[0]?.image}&key=AIzaSyAqb4YbGEyTrN-YuD1HJPimROcG4hVMaTM`}
                    alt='RestaurantShop'
                />

                <Stack>
                    <CardBody>
                        <Divider orientation='vertical' />
                        <Heading size='sm'>{detail[0]?.resName}</Heading>
                        <Flex alignItems={'center'}><FaMapMarkerAlt /><Text py='2'>Location</Text></Flex>
                        <Divider />
                        <Flex justifyContent={'center'} >
                        </Flex>
                    </CardBody>

                </Stack>
            </Card>
        </VStack>
    )
}
export default ResCard;