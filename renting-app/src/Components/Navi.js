import React from 'react';
import { Container,Navbar,Nav,Button } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {signOut } from "firebase/auth";
import { auth } from '../Firebase/Config';
import { useNavigate } from 'react-router-dom';


const Navi=(props)=>{
  const state=useSelector(state=>state.Reducer)
  // console.log("Login State",state.useraccount)
const navigate=useNavigate();
  const Logout= async()=>{
    await signOut(auth);
    navigate('/Homepage',{repalce:true})

}
    return(
        <>        
        <Navbar bg="light" variant="light" className='Navee' style={{color:'white'}}>
        <Container >
          <Navbar.Brand href="#home" style={{fontSize:'35px', color:'#d79609'}}>CAP-RENT</Navbar.Brand>
          {/* <Nav className="me-auto" style={{color:'#b556ec'}}>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
          <Navbar.Collapse className="justify-content-end">
          
            {state.useraccount.map((user)=>{
              return(
                <Navbar.Text>
                Signed in as: {user.Firstname+" "+user.Lastname}

                </Navbar.Text>
              )
            })}
            
          
        </Navbar.Collapse>
        <Button variant="danger" style={{width:'10%',marginLeft:'3%'}} onClick={Logout}>
        Sign Out
      </Button>
        </Container>
      </Navbar>
        </>
    )
}

export default Navi;