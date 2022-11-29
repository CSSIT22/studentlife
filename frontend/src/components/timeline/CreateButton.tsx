import { Button, Text } from "@chakra-ui/react"
import { AiFillSmile, AiFillPlusCircle } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/blog/create/';
        navigate(path);
    }
    return (
        // <Button onClick={routeChange} size="lg" colorScheme="orange" p="1" borderRadius="50%" float="right" position="fixed" right="20%" bottom="5%">
        //     <Text fontSize='2xl' textAlign="center"> + </Text>
        // </Button>

        <Button onClick={routeChange} size="85px" bg="who" color="tomato" float="right" position="fixed" right="5%" bottom="5%" borderRadius={100} _hover={{ color: "black" }}>
            <AiFillPlusCircle size="85px" />
        </Button>
    )
}


export default CreateButton
