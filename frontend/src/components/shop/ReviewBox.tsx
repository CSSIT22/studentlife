import { Post_Product_Review, Shop_Product, Shop_Product_Review } from '@apiType/shop'
import { Text, Flex, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, SimpleGrid, useBoolean, useDisclosure, IconButton, Avatar } from '@chakra-ui/react'
import { FC, useState } from 'react'
import ContentBox from 'src/components/shop/ContentBox'
import ReviewItem from 'src/components/shop/ReviewItem'
import API from 'src/function/API'



const ReviewBox: FC<{ product: Shop_Product, reviews: Shop_Product_Review[] | null }> = ({ product, reviews }) => {
    const [form, setForm] = useState<Post_Product_Review>({
        productId: product.productId,
        reviewRating: 1,
        reviewName: "",
        reviewDesc: "",
        image: ""
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [countReviews, setCountReviews] = useState(4)
    const [actionText, setActionText] = useState("Show All")

    const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>  | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        API.post("/shop/postUserReview", {
            productId: form.productId,
            reviewRating: parseInt(form.reviewRating.toString()),
            reviewName: form.reviewName,
            reviewDesc: form.reviewDesc,
            image: form.image,
            reviewAt: new Date()
        }).then(res => {console.log(res);  alert("Review Submitted! Please Reload to see your Review");onClose()}).catch(err => {console.log(err); alert("There was an Error!")})
    }

    function modalWriteReview(product: Shop_Product) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
                <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur="2px" />
                <ModalContent>
                    <ModalHeader>Write Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text align="center" fontSize="xl" fontWeight="bold" pb="4">
                            {product.productName}{" "}
                        </Text>
                        <form onSubmit={onSubmit}>
                            <Flex gap={3} direction="column" justify="space-evenly">
                                <FormControl isRequired>
                                    <FormLabel>Choose Rating</FormLabel>
                                    <Select name="reviewRating" value={form.reviewRating} onChange={onUpdateField}>
                                        <option value={1}>1 Star</option>
                                        <option value={2}>2 Star</option>
                                        <option value={3}>3 Star</option>
                                        <option value={4}>4 Star</option>
                                        <option value={5}>5 Star</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Review Title</FormLabel>
                                    <Input type="text" name="reviewName" value={form.reviewName} onChange={onUpdateField}></Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Tell us your experience</FormLabel>
                                    <Textarea name= "reviewDesc" value = {form.reviewDesc} onChange={onUpdateField}></Textarea>
                                </FormControl>
                                <FormControl>
                                    <Text>Paste Image Url</Text>
                                    <Input type="url"  value= {form.image} name="image" onChange={onUpdateField}/>
                                </FormControl>
                                <Button type='submit' w="full" colorScheme="blue" mr={3}>
                                    Submit
                                </Button>
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
    return (
        <ContentBox >
            <Flex direction="column" gap={3} p={6}>
                <Text fontWeight="500" color="black" fontSize="lg">
                    Reviews of {product.productName}
                </Text>
                {generateReviews(countReviews, reviews)}
                <Flex justify="space-between" mt="7" wrap="wrap" gap="5">
                    <Button variant="link" onClick={onOpen}>
                        Write Your Own Review
                    </Button>
                    {modalWriteReview(product)}
                    <Button
                        variant="link"
                        onClick={function () {
                            if (countReviews == -1) {
                                setActionText("Show All")
                                setCountReviews(4)
                            } else {
                                setCountReviews(-1)
                                setActionText("Hide")
                            }
                        }}
                    >
                        {actionText}
                    </Button>
                </Flex>
            </Flex>
        </ContentBox>
    )
}


function generateReviews(count: number, reviews: Shop_Product_Review[] | null) {
    try {
        if (reviews != null && reviews.length > 0) {
            const returnReviews = []
            for (let i = 0; i < reviews.length; i++) {
                returnReviews.push(
                    <ReviewItem
                        userName={reviews[i].user.fName + " " + reviews[i].user.lName}
                        userId={reviews[i].user.userId}
                        reviewTitle={reviews[i].reviewName}
                        reviewBody={reviews[i].reviewDesc}
                        rating={reviews[i].reviewRating}
                        image={reviews[i].image}
                        reviewDate={reviews[i].reviewAt.toString()}
                    ></ReviewItem>)
            }
            return (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    {count == -1 ? returnReviews : returnReviews.slice(0, count)}
                </SimpleGrid>
            )
        }
        return (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                No Reviews Found
            </SimpleGrid>
        )
    } catch (error) {
        console.log(error)
        return (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                No Reviews Found
            </SimpleGrid>
        )
    }

}



export default ReviewBox