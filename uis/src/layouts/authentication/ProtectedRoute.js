
import { useState } from "react";
import {  Outlet, Navigate } from "react-router-dom";

// console.log(status.status)

const useAuth = () => {

  const[logged, setLoggedIn] = useState(false)
  const stat = JSON.parse(sessionStorage.getItem('userdata'))
  //console.log(stat)
  // {
  //   stat.status ? return true : 
  // }
  {
    if(stat){
      return stat.status?  true : false
    }
  }
//    const user = { loggedIn: false };
  // return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  
//  if(auth()){
//    setStatus(true)
//    console.log(status)
//  }
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
