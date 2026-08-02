import { Redirect,Route } from "react-router-dom";

const ProtectedRoute = props =>{
  const token = localStorage.getItem('party_menu_token')
  if(!token){
    return <Redirect to='/signin'/>
  }
  return <Route {...props}/>
}

export default ProtectedRoute;