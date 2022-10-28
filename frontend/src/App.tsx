import AppConfig from "./config/_app"
import { RouterProvider } from "react-router-dom"
import { router } from "./config/routes"

function App() {
    return (
        <AppConfig>
            <RouterProvider router={router} />
        </AppConfig>
    )
}

export default App
