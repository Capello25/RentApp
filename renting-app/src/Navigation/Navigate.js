import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import DisplayRent from '../Components/DisplayRent';
import Homepage from '../Components/Homepage';
import LoginModal from '../Components/LoginModal';
import Signup from '../Components/Signup'

const Navigate =(props)=>{
    return(
        <>
        <BrowserRouter>
            <Routes>
              
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/DisplayRent' element={<DisplayRent User={props.User}/>}></Route>
                <Route path='/LoginModal' element={<LoginModal/>}></Route>
                <Route path='/Homepage' element={<Homepage/>}></Route>
              
                <Route path='Signup' element={<Signup/>}></Route>

            </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigate;