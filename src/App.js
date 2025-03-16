import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { UserProvider } from './UserContext';
import Home from './pages/Home';
import ViewFlight from './pages/ViewFlight';
import BookPage from './pages/BookPage';
import ContactPage from './pages/ContactPage';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';  // ✅ Import Profile Page
import Error from './pages/Error';

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { id: null, firstName: "", isAdmin: null };
    });

    const unsetUser = () => {
        setUser({ id: null, firstName: "", isAdmin: null });
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");  
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No token found in localStorage");
            return;
        }

        fetch("https://airisle-api-3.onrender.com/users/user-profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            console.log("User Details Response:", data);

            if (data.user) {
                const newUser = {
                    id: data.user._id,
                    firstName: data.user.firstName,
                    isAdmin: data.user.isAdmin
                };
                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
            } else {
                unsetUser();
            }
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
            unsetUser();
        });
    }, []);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/flight/:id" element={<ViewFlight />} />
                    <Route path="/book/:id" element={<BookPage />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/profile" element={<Profile />} />  {/* ✅ Added Profile Route */}
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
