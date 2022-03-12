import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getUser,logout } from "../services/authorize";

const NavbarComponent=()=>{
    let navigate = useNavigate()
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">HOME</Link>
                </li>
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">           
                        <Link to="/create"  className="nav-link">ADD BLOG</Link>
                        </li>
                    )
                }
                {
                    !getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">           
                            <Link to="/login"  className="nav-link">LOGIN</Link>
                        </li>
                    )
                }
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">           
                            <button  className="nav-link" onClick={()=>logout(()=>navigate("/"))}>LOGOUT</button>
                        </li>
                    )
                }
                
                
            </ul>
        </nav>
    )
}

export default NavbarComponent