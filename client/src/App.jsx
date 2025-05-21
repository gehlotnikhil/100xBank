import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { MainContext, UserProvider } from "./contexts/main";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomerDashboard from "./components/CustomerPanel";
import BankerDashboard from "./components/BankerControlPanel";
import { useContext } from "react";
import About from "./components/About";

function ProtectedRoute({ children, role, redirectTo = "/login" }) {
  const { user } = useContext(MainContext);
  
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  

  return children || <Outlet />; 
}

function RouteHandler() {
  const { user } = useContext(MainContext);
  
  const getHomePage = () => {
    if (!user) {
      return <Home />;
    }
    
    switch (user.role) {
      case "customer":
        return <Navigate to="/dashboard/customer" replace />;
      case "banker":
        return <Navigate to="/dashboard/banker" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={getHomePage()} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/" replace /> : <Register />
          } />
          
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/" replace />} />
            <Route 
              path="customer" 
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="banker" 
              element={
                <ProtectedRoute role="banker">
                  <BankerDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <RouteHandler />
      </Router>
    </UserProvider>
  );
}