import React from 'react';
import { useState } from 'react';
import {Container,Button,Form,Card} from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import app from "../Firebase/Config";





// import LoginModal from './LoginModal';




const Signup=()=>{



  const navigate=useNavigate();
    const[username, setUsername]=useState('');
    const [password,setPassword]=useState('');
    const[Firstname, setFirstname]=useState('');
    const [Lastname,setLastname]=useState('');
    const[Telephone, setTelephone]=useState('');
    const [HouseAddress,setHouseAddress]=useState('');

    const auth = getAuth();

    const db = getFirestore(app);
    const LoginUser= async (e)=>{
        e.preventDefault();
      const auth =  await getAuth();
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...

          const NewAccount=
          {
            Firstname:Firstname,
             Lastname:Lastname,
               HouseAddress:HouseAddress,
              Telephone:Telephone,
              id:user.uid
            }
             try{
                setDoc(doc(db, "Useraccount", NewAccount.id), NewAccount);
                alert('Sign up completed')
              navigate('/Homepage',{replace:true})
          }
          catch (e) {
           // alert(e.message)
             console.error("Error adding document: ", e);
             
           }
          // try {
          //   const docRef = addDoc(collection(db, "Useraccount",user.uid), {
          //     Firstname:Firstname,
          //     Lastname:Lastname,
          //     HouseAddress:HouseAddress,
          //     Telephone:Telephone,
              
          //   });
          //   console.log("Useraccount ", docRef.id);
          //   navigate('/Homepage',{replace:true})
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }



        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

        
        
  
    }

  

    return(
        <>
        <Container className='cont1' fluid>
            <center>
        <Card style={{ width: '40rem',height:'100%',margin:'0% 5% 5% 5%' }}>
      <Card.Body>
        <label className='a'>CREATE ACCOUNT</label>
        <Form onSubmit={LoginUser}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="username" value={username} placeholder="Enter username / Email" onChange={(e)=>{setUsername(e.target.value)}} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value);}} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Firstname</Form.Label>
        <Form.Control type="text" name="Firstname" value={Firstname} placeholder="Enter Firstname" onChange={(e)=>{setFirstname(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lastname</Form.Label>
        <Form.Control type="text" name="Lastname" value={Lastname} placeholder="Enter Lastname" onChange={(e)=>{setLastname(e.target.value);}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Telephone</Form.Label>
        <Form.Control type="text" name="Telephone" value={Telephone} placeholder="Enter Telephone" onChange={(e)=>{setTelephone(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>House Address</Form.Label>
        <Form.Control as="textarea" name="HouseAddress" value={HouseAddress} placeholder="Enter HouseAddress" onChange={(e)=>{setHouseAddress(e.target.value);}} />
      </Form.Group>

      <Button variant="primary" type="submit" style={{width:'30%',marginTop:'2%'}}>
        Sign up
      </Button>
    </Form>
    
      </Card.Body>
      </Card>
      </center>
            </Container>

        </>
    )
}

export default Signup;