import React from 'react'
import {Modal,Button,Form} from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom'

const LoginModal=(props)=>{
  // const navigate= useNavigate();

  const SignIn=(e)=>{
    e.preventDeafault();
    // navigate('/DisplayRent',{replace:true})
  }
    return(
        <>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='loginForm'>
        <Form onSubmit={SignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
        </>
    )
}

export default LoginModal;