
import {React, useState } from 'react';
import {Container,Button,Form,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged,signOut,signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../Firebase/Config';
import { useNavigate } from 'react-router-dom';
// import { doc, getDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore"; 
import { doc, onSnapshot } from "firebase/firestore";
import app from '../Firebase/Config';
import { getFirestore } from 'firebase/firestore';
import { Login } from '../Action/Action';
import { useDispatch } from 'react-redux';


// import LoginModal from './LoginModal';


const Homepage=()=>{

  const db=getFirestore(app)
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const[username, setUsername]=useState('');
    const [password,setPassword]=useState('');

    const Newuser={
        email:username,
        password:password,
    }

    const [userlog,setUserlog]=useState({});

    //  onAuthStateChanged(auth, (user) => {
            
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       const uid = user.uid;
  
        

        
          
    //       setUserlog(user);
        
    //     } else {
    //       // User is signed out
    //       // ...
    //      }
    //    });

   //const auth = getAuth();

    const LogUser= async (e)=>{
        e.preventDefault();
        const Logus={};
           await signInWithEmailAndPassword(auth, username,password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                const unsub = onSnapshot(doc(db, "Useraccount", user.uid), (doc) => {
                  console.log("Current data: ", doc.data());
                  dispatch(Login(doc.data()))
                  
                  
              });
              
                navigate('/DisplayRent',{replace:true})
                // const docRef = doc(db, "Useraccount", user.uid);
                // const docSnap = getDoc(docRef);
                
                // if (docSnap.exists()) {
                //   console.log("Document data:", docSnap.data());
                // } else {
                //   // doc.data() will be undefined in this case
                //   console.log("No such document!");
                // }

                // console.log(Newuser)
            })
            
     
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
                    
    }

           

    return(
        <>
        <Container className='cont' fluid>
           
            <center>
        <Card style={{ width: '40rem',height:'100%',margin:'0% 5% 5% 5%' }}>
      <Card.Body>
        <Form.Group>
      <label>User Logged in : {userlog.email}</label>
      </Form.Group>
        <label className='a'>Login with your credentials</label>
        <Form onSubmit={LogUser}>
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
     <Form.Group><Link to="/Signup">If you do not have an account click here to Sign up</Link>
     </Form.Group>

      <Button variant="primary" type="submit" style={{width:'30%',marginTop:'10%'}}>
        Login
      </Button>{'   '}
    
    </Form>
    
      </Card.Body>
      </Card>
      </center>
            </Container>

        {/* <LoginModal
        show={modalShow}
        onHide={() => setModalShow(false)}/> */}
        </>
    )
}

export default Homepage;