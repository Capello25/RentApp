import {React,useEffect} from 'react'
import { Container,Card,Button,Modal,InputGroup,Form,Row,Col } from 'react-bootstrap';
import Navi from './Navi';
import { getStorage, list} from "firebase/storage";
import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import app from '../Firebase/Config';
import SingleRent from './SingleRent';
import Displayheader from './DisplayHeader';
import room1 from '../Image/room1.jpg'
import FormRent from './FormRent';
import { getFirestore } from 'firebase/firestore';



const DisplayRent=()=>{
    const storage = getStorage();
    const db=getFirestore(app)
   

    // const [imageUploads,SetImageUploads]=useState([]);
    const [listRooms,SetListRooms]=useState([]);
    const [query,SetQuery]=useState([]);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const keys=['HouseType','Location', 'Duration','Amount']

    
console.log('fjfhfjh:',query)

   
// ********SHOW ALL IMAGES *********************
    // const listRef = ref(storage, 'RentImg/');
    // useEffect(()=>{
    //     listAll(listRef)
    //     .then((res) => {
    //       //res.prefixes.forEach((folderRef) => {
    //         // All the prefixes under listRef.
    //         // You may call listAll() recursively on them.
    //       //});
    //       res.items.forEach((item) => {
    //         // All the items under listRef.
    //         getDownloadURL(item).then((url)=>{
    //             SetImagelist((prev)=>[...prev,url])
    //         })
    //       });
    //     }).catch((error) => {
    //       // Uh-oh, an error occurred!
    //     });
      

//         const unsub = onSnapshot(doc(db, "RoomInfo"), (doc) => {
//             console.log("Current data: ", doc.data());
// });


    // },[]);

useEffect(()=>{

    //const querySnapshot = await getDocs(collection(db, "RoomInfo"))
    getDocs(collection(db, "RoomInfo")).then((snapshot)=>{
        let List =[]
        snapshot.docs.forEach((doc)=>{
            List.push({...doc.data()})
        })
        console.log('list :',List);
        SetListRooms(List)
    })
  
    
},[])

        const Search=()=>{

        }

    return(
        <>
        <Navi/>
        <br/>
        <Container className='displayCont' fluid>
            <div className='displayDiv1'>
                <div className='displayMenu'>
                <Card className='Uploadcard'>
                    <Card.Body><h4>ROOMS FOR RENT</h4>
                    <img src={room1} className="bodyimg"/>
                    </Card.Body>
                </Card>
                    
                  
                </div>
                

            </div>
            <div className='displayDiv2'>
                <div className='display1'>
                    <div className='Head'>
                        <Displayheader/>
                    </div>
                    <div className='bottons'>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={handleShow}>Upload room</Button>
                                    </Col>
                                    <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                        <Form.Control
                                        // placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(event)=>{SetQuery(event.target.value)}}
                                        value={query}
                                        />
                                    </InputGroup>
                                    </Col>
                         </Row>
                        </Container>
                    </div>
                    <div className='mainBody'>
                     {listRooms.filter((data)=>keys.some((key)=>data[key].toLowerCase().includes(query))).map((data,index)=>{
                            
                            return(
                                <div className='singlerent'>
                                <SingleRent image={data} />

                            </div>
                            );
                            
                        })} 
                    </div>
                </div>

            </div>
            {/* <div className='displayDiv3'>
                <div className='displayAnnounce'>
             <img src={room1} className="bodyimg" /> 
                </div>
            </div> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><FormRent close={handleClose}/></Modal.Body>
               
            </Modal>

        </Container>
       
        </>
    )
}

export default DisplayRent;