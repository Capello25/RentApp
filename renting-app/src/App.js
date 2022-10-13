
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayRent from './Components/DisplayRent';

import Navigate from './Navigation/Navigate';
import {useSelector} from 'react-redux';
// import {getFirestore} from "firebase/firestore"
// import app from './Firebase/Config';


function App() {

  // const db=getFirestore(app);
  const state=useSelector(state=>state.Reducer)
  console.log("Login State",state.useraccount)
  return (
    <div>
        {/* {state ? <DisplayRent useraccount={state}/>:
       <Navigate/>} */}
       <Navigate user={state.useraccount}/>
       </div>
  );
}

export default App;
