import { Navigate} from "react-router-dom";
import { getUser } from "./services/authorize";

//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

const AdminRoute=({children })=>{
    return (
        getUser() ? children  : <Navigate to="/login" />
    )
}

export default AdminRoute