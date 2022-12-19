import AppConfig from "./config/_app"
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import { router } from "./config/routes"
import AuthContextProvider from "./context/AuthContext"

function App() {
    return (
        <AppConfig>
            <BrowserRouter>
                <AuthContextProvider>
                    <h1>test3</h1>
                    <Routes>
                        {router.map((item) => (
                            <Route key={item.path} element={item.element} path={item.path} />
                        ))}
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
            {/* <RouterProvider router={router} /> */}
        </AppConfig>
    )
}

export default App
