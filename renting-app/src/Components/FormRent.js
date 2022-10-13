import{  React,useEffect } from 'react';
import {Form,Button,Card} from 'react-bootstrap';
import { useState } from 'react';
import { getStorage, ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { v4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore,onSnapshot } from "firebase/firestore";
import app from "../Firebase/Config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const FormRent=({close})=>{
  const storage = getStorage();
    const[HouseType, setHouseType]=useState('');
    const [Location,setLocation]=useState('');
    const[Amount, setAmount]=useState('');
    const [Duration,setDuration]=useState('');
    const [imageUploads,SetImageUploads]=useState([]);
    const [imagelista,SetImagelista]=useState([]);
    const [preview,SetPreview]=useState([]);
    const [Firstname,setFirstname]=useState('');
    const [Contact, SetContact]=useState('');
    const [HseAddress,SetHseAddress]=useState('');
    const [userid,SetuserID]=useState('');
   
    const state=useSelector(state=>state.Reducer)
    
   // const User12= state.useraccount;
   const Usr=state.useraccount;
    console.log('Test:',state.useraccount);
     const auth = getAuth();
     const NewRent=
     {
       HouseType:HouseType,
        Location:Location,
          Amount:Amount,
         Duration:Duration,
         UserID:userid,
         id:v4(),
         HouseID:v4(),
         OwnerName:Firstname,
         Contact:Contact,
         OwnerHseAddress:HseAddress,
         Status:'Available',
         imageUrl:imagelista

         // Imageid:imageIdentifier
       }
       const navigate =useNavigate();

    //  onAuthStateChanged(auth, (user) => {
            
    //      if (user) {
    //        // User is signed in, see docs for a list of available properties
    //        // https://firebase.google.com/docs/reference/js/firebase.User
    //        const uid = user.uid;          
    //        SetUserIdentifier(user.uid);
        
    //   } else {
    //       // User is signed out
    //       // ...
    //    }
    //  });

    useEffect(() => {
     
     Usr.map((user)=>{
     setFirstname(user.Firstname+' '+user.Lastname)
     SetContact(user.Telephone)
     SetHseAddress(user.HouseAddress)
     SetuserID(user.id)
     })
    }, []);

    const handleChange=(e)=>{
        e.preventDefault();
       for (let i = 0; i < e.target.files.length; i++){
          const newImage=e.target.files[i]
            newImage["id"]=Math.random();
             SetImageUploads((prevState)=>[...prevState,newImage]);
            
        }

        const fileArray=Array.from(e.target.files).map((file)=>URL.createObjectURL(file))
        SetPreview((prevImages)=>prevImages.concat(fileArray))
        //SetImageUploads([...e.target.files])
         console.log("images:",imageUploads)
        // console.log("props",props)
         //SetImageUpload(e.target.files[0])
     };


     const SaveData=async(e)=>{

      e.preventDefault();
      const db = getFirestore(app);
      
      const metadata = {
          contentType: 'image/jpeg'
        };
        
     
      imageUploads.map((imageUpload)=>{
          if (imageUpload==null) return;
       const storageRef = ref(storage,`RentImg/${imageUpload.name + v4()}`);
          let img=[]
            uploadBytes(storageRef, imageUpload).then((snapshot) => {
              // SetImageidentifier(Imager);
                //alert('Uploaded file succesfully!');
                getDownloadURL(snapshot.ref).then((url)=>{
                   SetImagelista((prev)=>[...prev,url])
                  //img.push({...url})
                  //SetImagelista(img)

                  const unsub = onSnapshot(doc(db, "Useraccount", state.useraccount.id), (doc) => {
                    console.log("Current data: ", doc.data());
                  
                    //SetUser12(unsub)
                    
                });
                console.log('hfhfh',unsub);
                   console.log(imagelista);
                })
              });
  
          // }
         
      })
      console.log('Image List:',imagelista)

     
   
      
         try{
            setDoc(doc(db, "RoomInfo", NewRent.id), NewRent)
            .then((res)=>{
              close()
            })

          navigate('/DisplayRent',{replace:true})
          
      }
      catch (e) {
     
         console.error("Error adding document: ", e);
         
        }
     
   // alert('Files Uploaded succesfully!');
        
  }


    return(
            <div>
            <Form onSubmit={SaveData}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type of House</Form.Label>
        <Form.Control type="text" name="HouseType" value={HouseType} placeholder="Enter Type of House" onChange={(e)=>{setHouseType(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" name="Location" value={Location} placeholder="Enter Location" onChange={(e)=>{setLocation(e.target.value);}} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" name="Amount" value={Amount} placeholder="Enter Amount" onChange={(e)=>{setAmount(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Duration</Form.Label>
        <Form.Control type="text" name="Duration" value={Duration} placeholder="Enter Duration" onChange={(e)=>{setDuration(e.target.value);}} />
      </Form.Group>

      <div className='Formimg'>
        <Card>
            <Card.Body>
            <input type='file' multiple onChange={handleChange} accept='image/*'/>
            <br/>
            {preview.map((imrg)=>{
                return(
                    <img src={imrg} className="LoadImage" key={imrg} style={{marginRight:'4%',marginTop:'2%',border:'solid 1px',borderRadius:'10px'}}/>
                  
                )
            })}
            </Card.Body>
        </Card>
                               
      </div>

      <Button variant="primary" type="submit" style={{width:'30%',marginTop:'2%'}}>
        Upload
      </Button>
      </Form>

     
        </div>
    );
}

export default FormRent;