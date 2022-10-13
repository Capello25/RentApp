import React from 'react';
import { Card, Container, Row,Col } from 'react-bootstrap';

const Displayheader=()=>{
    return(
        <div>
            <div style={{marginTop:'2%',color:'#148aab'}}>
                    <center>
                        <Container>
                            <Row>
                                <Col>
                                <Card style={{backgroundColor:'#e7efef'}}>
                                    <Card.Body>
                                    <label>Thinking about renting a single room, chamber and hall, two bedroom, an apartment all over Ghana.
                        </label>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col>
                                <Card>
                                    <Card.Body>
                                    <label>RENT A ROOM WITH EASE </label>
                                    </Card.Body>
                                </Card>
                                </Col>
                            </Row>
                        </Container>
                        
                        
                    </center>
                </div>
        </div>
    )
}

export default Displayheader;