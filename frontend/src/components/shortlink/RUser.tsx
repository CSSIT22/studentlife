import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "src/function/API";


const param = useParams();
const [userData, setUserData] = useState({
    userId: "",
    studentId: "",
    username: "",
    fName: "",
    lName: "",
    email: "",
    image: "",
    majorId: "",
})

export const std = [
    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/friendprofile/${param.userID}`);
            setUserData({ ...res.data.user });
        }

        fetch();
    }, [])
]
export default std