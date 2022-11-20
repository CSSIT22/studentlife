import { Heading, useBoolean } from "@chakra-ui/react"
import { createContext, FC, ReactNode, useCallback, useEffect, useLayoutEffect, useState } from "react"

import API from "../function/API"

import { InitUserResponse } from "@apiType/user/index"
import { Navigate, useNavigate } from "react-router-dom"
import Loading from "src/components/backendService/Loading"

export const authContext = createContext<InitUserResponse | null>({} as any)

const AuthContextProvider: FC<{ children: ReactNode }> = (props) => {
    const [user, setUser] = useState<InitUserResponse | null>()
    const [loading, { off, on }] = useBoolean(true)
    const initUser = useCallback(async () => {
        try {
            const user = await API.get<InitUserResponse>("/user")
            setUser({ ...user.data })
        } catch (err) {
            console.log(err)
        }
    }, [API])
    useLayoutEffect(() => {
        initUser().finally(off)
    }, [initUser])
    const naviagte = useNavigate()
    useEffect(() => {
        off()
        naviagte("/auth", { replace: true })
    }, [])
    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/auth" />
    }
    return <authContext.Provider value={user as any} {...props} />
}

export default AuthContextProvider
