import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
type navBarContext = {
    countUnread: number
    setcountUnread: Dispatch<SetStateAction<number>>
}
export const NavBarContext = createContext<navBarContext>({} as any)