import { createBrowserRouter, RouteObject } from "react-router-dom"
import NotFound from "./pages/NotFound"

const ROUTES: Record<string, any> = import.meta.globEager("/src/pages/**/[a-z[]*.tsx")

const routes: RouteObject[] = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, "")
        .replace(/\[\.{3}.+\]/, "*")
        .replace(/\[(.+)\]/, ":$1")
    const Element = ROUTES[route].default
    return { path, element: <Element /> }
})

export const router = createBrowserRouter([...routes, { path: "*", element: <NotFound /> }])
