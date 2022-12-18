import { Text, Box } from "@chakra-ui/react"

const Card: React.FC<{ title: string | number, detail: string }> = ({ title, detail }) => {
  return (
    <Box bg="white" p={4} width={"100%"} borderRadius="lg" boxShadow="lg" border="1px" borderColor="gray.300">
      <Box>
        <Text fontSize={"3xl"}>{title}</Text>
      </Box>
      <Box>
        <Text as={"b"} fontSize={"xl"}>
          {detail}
        </Text>
      </Box>
    </Box>
  )
}

export default Card