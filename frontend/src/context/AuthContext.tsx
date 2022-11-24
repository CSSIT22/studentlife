import { Heading, useBoolean } from "@chakra-ui/react"
import { createContext, FC, ReactNode, useCallback, useEffect, useLayoutEffect, useState } from "react"

import API from "../function/API"

import { InitUserResponse } from "@apiType/user/index"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import Loading from "src/components/backendService/Loading"
import SocketContextProvider from "./SocketContext"
import { setToken } from "src/function/socket"

export const authContext = createContext<InitUserResponse>({} as any)

const AuthContextProvider: FC<{ children: ReactNode }> = (props) => {
    const [user, setUser] = useState<InitUserResponse | null>()
    let location = useLocation()
    const [loading, { off, on }] = useBoolean(true)
    const initUser = useCallback(async () => {
        try {
            const user = await API.get<InitUserResponse>("/user")
            setToken(user.data.socketToken)
            setUser({ ...user.data })
        } catch (err) {
            console.log(err)
        }
    }, [API])
    useLayoutEffect(() => {
        initUser().finally(off)
    }, [initUser])

    if (loading) {
        return <Loading />
    }
    if (!user && !(location.pathname === "/auth")) {
        return <Navigate to="/auth" />
    }
    return <authContext.Provider value={user as any} {...props}>
        <SocketContextProvider>
            {props.children}
        </SocketContextProvider>
    </authContext.Provider>
}

export default AuthContextProvider
