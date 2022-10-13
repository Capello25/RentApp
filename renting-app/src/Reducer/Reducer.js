const IntialState=
{
useraccount:[],

}

const Reducer=(state=IntialState,action)=>
{
    switch(action.type)
    {
      case 'USER_LOGIN':
            return{useraccount:[action.payload]}
              
       default:return state;
    }
}
export default Reducer;