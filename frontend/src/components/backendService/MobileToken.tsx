import { Flex, Icon } from "@chakra-ui/react"
import { MdPhoneIphone } from "react-icons/md"

const MobileToken = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Icon as={MdPhoneIphone} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
    </Flex>
  );
}

export default MobileToken