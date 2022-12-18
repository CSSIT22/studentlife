import { Flex, Icon } from "@chakra-ui/react"
import { MdTabletMac } from "react-icons/md"

const TabletToken = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Icon as={MdTabletMac} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
    </Flex>
  );
}

export default TabletToken