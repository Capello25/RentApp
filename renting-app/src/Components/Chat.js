import {React,useState,useEffect} from 'react'
import {Form,InputGroup,Row,Col,Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { doc,setDoc,getFirestore,onSnapshot} from "firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore";
//import { doc, onSnapshot } from "firebase/firestore";
import app from '../Firebase/Config';
import { v4 } from 'uuid';

const Chat=({recipient})=>{

    const [Userid,SetuserID]=useState('');
    const [Recipientid,SetRecipientID]=useState('');
    const [message,SetMessage]=useState([]);
    const [text,SetText]=useState('')
    const [miniMsg,SetMiniMsg]=useState([]);


    const db=getFirestore(app)
    const state=useSelector(state=>state.Reducer)
    const Loguser =state.useraccount;
   console.log('recipient',recipient)
   console.log('recipientjgjg',Userid)
   const TodayDate= new Date();
    const newchat={
        UserID:Userid,
        RecipientID:recipient.UserID,
        Message:[{User: Userid,Text: text, Date:TodayDate.toDateString()+' '+TodayDate.getHours()+':'+TodayDate.getMinutes()+':'+TodayDate.getSeconds()} ],
        id:v4()
       }

 
       
            useEffect(() => {
                Loguser.map((user)=>{
                    SetuserID(user.id)
                })

               

                getDocs(collection(db, "Chat")).then((snapshot)=>{
                    let List =[]
                    snapshot.docs.forEach((doc)=>{
                        List.push({...doc.data()})
                    })
                    console.log('list :',List);
                    SetMessage(List)
                })

                const Msg=message.filter((item=>item.UserID===Userid ||item.User===recipient.UserID && item.RecipientID===recipient.userID||item.RecipentID===Userid))
                SetMiniMsg(Msg)   
               
            }, []);

       const send= async()=>{
      
        
        // recipient.map((reci)=>{
        //     SetRecipientID(reci.UserID)
        //   })

        //SetMessage([Userid,text,serverTimestamp()])
        console.log('msg',miniMsg)
        await setDoc(doc(db, "Chat", newchat.id), newchat)         
        }
    return(
        <div>
        <div></div>
        <div className='ChatBody'>
        {message.map.filter}

        </div>
            <div>
                <Row>
                    <Col sm={8}>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Chat here"
                   onChange={(e)=>{SetText(e.target.value)}}
                    />
                    
                </InputGroup>
                </Col>
                <Col sm={4}><Button variant="primary" onClick={send}>Send</Button></Col>
                </Row>
            </div>
        </div>

    )
}
export default Chat