import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Agar token hai YA hum abhi-abhi Google success page se aaye hain
    if (token || location.state?.authFromGoogle) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    
    setIsChecking(false);
  }, [location]);

  if (isChecking) {
    return null; // Ya koi loading spinner dikha sakte hain
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;