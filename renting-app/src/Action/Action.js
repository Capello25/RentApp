export const Login=(useraccount)=>{

    return{
        type: "USER_LOGIN",
        payload: useraccount
    }
};
export const Logout=()=>{

    return{
        type: "USER_LOGOUT",
        payload:null
    }
}

export const AuthUser=(Auth)=>{
    return {
        type:"AUTH_USER",
        payload:Auth
    }
}