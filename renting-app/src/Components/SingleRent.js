import {React,useState} from 'react';
import {Card, Col,Row, Container, Button,Modal} from 'react-bootstrap';
import Chat from './Chat';


const SingleRent=(props)=>{

    // const Chat=(id)=>{

    
    //         console.log('userid:', id);
    // }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  
   console.log('Images:',props.image);
    return(
        <Card>
        <Card.Body>
            <div >
                <Container>
                    <Row>
                        <Col>
                        <div className="singleimgdiv">
                         {props.image.imageUrl.map((img)=>{
                            return(
                                    <div key={props.image.id} >
                                    <img src={img} className="bodyimg"/>
                                    </div>
                                 )
                         
                        })} 

                        {/* <img src={props.image.imageUrl[0]}/> */}
                        </div>
                        </Col>
                        <Col>
                        <Row style={{marginTop:'3%'}}>
                            <Col>
                                <Card>
                                    <Card.Body>
                                <div key={props.image.id}>
                                <div>House Type : {props.image.HouseType}</div>
                                <div>Location : {props.image.Location}</div>
                                <div>Amount : {props.image.Amount}</div>
                                <div>Duration : {props.image.Duration}</div>
                                <div>Status : {props.image.Status}</div>
                                </div>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{backgroundColor:'#e8ccf3'}}>
                                <Card.Body>
                                    <div key={props.image.id}>
                                    <div>House Owner :{props.image.OwnerName}</div>
                                    <div>Contact : {props.image.Contact}</div>
                                    <div>Address: {props.image.OwnerHseAddress}</div>
                                    </div>
                                </Card.Body>
                                </Card>
                            </Col>

                            
                        </Row>
                        <Row xs={2} md={4} lg={15} style={{marginTop:'8%', marginLeft:'2%'}}>
                            <Col><Button variant="primary">View Location</Button></Col>
                            <Col><Button variant="primary" onClick={handleShow} >Send message</Button></Col>
                        
                        </Row>
                        </Col>
                    </Row>
                {/* <img src={props.image} className="bodyimg"/> */}
               
                <Modal backdrop="static" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><Chat recipient={props.image}/></Modal.Body>
               
            </Modal>
            

                </Container>
            </div>
        </Card.Body>
      </Card>
    )
}

export default SingleRent;