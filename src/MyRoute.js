import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminRoute from "./AdminRoute"
import App from "./App"
import EditComponent from "./components/EditComponent"
import FormComponent from "./components/FormComponent" 
import LoginComponent from "./components/LoginComponent"
import SingleComponent from "./components/SingleComponent"

const MyRoute=()=>{
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App/>}/>
            <Route path="/create"  element={<AdminRoute><FormComponent/></AdminRoute>}/>
            <Route path="/blog/:slug" exact element={<SingleComponent/>}/>
            <Route path="/blog/edit/:slug" exact element={<AdminRoute><EditComponent/></AdminRoute>}/>
            <Route path="/login" exact element={<LoginComponent/>}/>
        </Routes>
    </BrowserRouter>
    )
}
export default MyRoute