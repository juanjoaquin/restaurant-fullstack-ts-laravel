import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;