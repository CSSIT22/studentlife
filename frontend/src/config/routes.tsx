import { createBrowserRouter, RouteObject } from "react-router-dom"

const ROUTES: Record<string, any> = import.meta.globEager("/src/pages/**/[a-z[]*.tsx")

const routes: RouteObject[] = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, "")
        .replace(/\[\.{3}.+\]/, "*")
        .replace(/\[(.+)\]/, ":$1")

    return { path, element: ROUTES[route].default() }
})

export const router = createBrowserRouter(routes)
