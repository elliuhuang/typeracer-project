import { useNavigate, Link } from "react-router-dom"
import "../style/home.css"
import React from "react";
import { useAuth } from '../context/AuthContext.tsx';
import Logout from "./Logout.tsx";

const Home = () => {
    const navigate = useNavigate();
    const { signedIn } = useAuth();

    return (
        <div className="land-container">
            <div className="start">
                <h1>
                    Typeracer
                </h1>
                <div className="login-info">
                    <button onClick={() => navigate("/race")}>Start</button>
                    {signedIn ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Logout />
                        </>
                    ) : (
                        <>
                            <span>Login to save progress! <Link to="/login">Login</Link></span>
                            <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                        </>
                    )}
                    {/* {!signedIn && (
                        <>
                        <span>Login to save progress! <Link to="/login">Login</Link></span>
                        <span>Don't have an account? <Link to="/signup">Signup</Link></span>
                        </>
                    )}
                    <Logout /> */}
                </div>
            </div>
        </div>
    )
}

export default Home