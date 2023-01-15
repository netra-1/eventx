import { Navigate } from "react-router-dom";
import {SocketProvider} from "../../../context/socket";

function StaffPrivateRoute({ children }) {
    var isAuth;
  if(localStorage.getItem('token') && localStorage.getItem('category')=="STAFF"){
      isAuth= true
  }
  else{
      isAuth= false
  }
  return isAuth
      ? (
          <SocketProvider>
              <>{children}</>
          </SocketProvider>
      )
      : <Navigate to="/" />;
}

export default StaffPrivateRoute;