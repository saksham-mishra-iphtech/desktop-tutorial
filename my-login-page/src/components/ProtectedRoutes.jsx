import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
    const currentUser = useSelector((state) => state.login.currentUser);
  
    return currentUser ? children : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
