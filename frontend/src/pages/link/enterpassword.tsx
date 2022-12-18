import { useState, useMemo } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import API from "src/function/API";
import { useLocation } from "react-router-dom";

const EnterPassword = () => {
    const [password, setPassword] = useState<any>()

    function useQuery() {
        const { search } = useLocation();
        const memo = useMemo(() => new URLSearchParams(search), [search])
        return memo;
      }

    const query = useQuery()

    function handleSubmit() {
        API.post(`/shortlink/checkpassword`, {
            data: {
                password: password,
                shorten: query.get("shorten")
            }
        }).then(((res) => window.location.href = res.data.link)).catch(() => alert("Wrong password or link not found"))
        setPassword("")
    }

    return (
        <>
            <Flex width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                <Flex width="40vw" height="40vh" border="2px solid black" justifyContent={"center"} alignItems={"center"} >
                    <Box>
                        <label>Enter Password: <br /></label>
                        <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default EnterPassword;