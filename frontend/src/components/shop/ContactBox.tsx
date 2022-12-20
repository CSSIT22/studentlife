import { Shop_Product } from '@apiType/shop'
import { Text,Flex } from '@chakra-ui/react'
import { FC } from 'react'
import ContentBox from 'src/components/shop/ContentBox'

const ContactBox:FC<{product: Shop_Product}> = ({product}) => {
  return (
    <ContentBox>
            <Flex p="6" direction="column" gap="3">
                <Text color="black" fontWeight="500" fontSize="lg">
                    Contact Details of {product.productName}
                </Text>
                {product != null ? <Flex direction="column">
                    <Text>Name: {product.contactTo.contactPerson}</Text>
                    <Text>Phone no: {product.contactTo.phoneNo}</Text>
                    {product.contactTo.lineId ? <Text>Line Id: {product.contactTo.lineId}</Text> : <Text></Text>}
                    {product.contactTo.address ? <Text>Address: {product.contactTo.address}</Text> : <Text></Text>}
                </Flex> : <>Cannot Find Contact Details</>
                }
            </Flex>
        </ContentBox>
  )
}

export default ContactBox