import React,{useState} from 'react'
import { useCart } from './ContextReducer';
import {Link, useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../modal';



export default function Navbar() {

  const [cartView, setCartView] = useState(false)

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
 
  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor:'#F58F1D'}}>
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand fs-1 fst-italic color-white" style={{color:'#222'}}  to="/">Indian Curry</Link>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mt-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" style={{color:'#222'}} aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" style={{color:'#222'}} aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              :""}

            </ul>

            {(!localStorage.getItem("authToken"))?
              <div className='d-flex'>
                <Link className="nav-link fs-5" style={{color:'#222'}} to="/login">Login</Link>
                <Link className="nav-link fs-5" style={{color:'#222'}} to="/createUser">SignUp</Link>
              </div>
            :
              <div className='d-flex'>
                <Link className="nav-link fs-5" style={{color:'#222',marginRight:'10px'}}  onClick={()=>setCartView(true)}>
                My Cart{""}
                <Badge pill bg='success'>{items.length}</Badge>
                </Link>

                
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                <Link className="nav-link fs-5" style={{color:'#222'}} onClick={handleLogout}>LogOut</Link>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}

