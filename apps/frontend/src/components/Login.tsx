import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Link, useNavigate } from 'react-router-dom';
import "../style/login.css"



type loginProps = {
    setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPageComponent: React.FC<loginProps> = ( { setSignedIn } ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginAttempt = async () => {
      if (username && username.trim() !== '' && password && password.trim() !== '') {
        try {
          const resBody = {
            username: username,
            password: password
          };
  
          const res = await fetch('/api/account/login', {
              method: 'POST' ,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(resBody), 
            });
          if (!res.ok) {
            throw new Error('Login failed'); 
          }

          // const data = await res.json();
          // const loggedInUsername = data.username;

          localStorage.setItem('username', username);
          
          alert('Successfully logged in!');
          setSignedIn(true); 
          navigate("/");
        } catch (error) {
          alert('Login failed.');
        }
      } else {
        alert('Invalid username and password.');
      }
      setUsername('');
      setPassword('');
    }
    return (
      <>
  
        <div className="login">
          <div>
          <input
            className="Input"
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="username"
          />
          </div>
          <div>
          <input
            className="Input"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="password"
          />
          </div>
          <div>
          <button onClick={loginAttempt}>Log In</button>
          </div>
        </div>
      </>
    );
  }
  

const LoginComponent: React.FC = () => {
    const { signedIn, setSignedIn } = useAuth();
  
    return (
      <>
        {!signedIn && (
          <div className="login-container">
            <div className="login-section">
              <h2>Login to Typeracer!</h2>
            </div>
            <div className="login-section">
              <LoginPageComponent setSignedIn={setSignedIn} />
            </div>
            <div className="login-section">
              <h3>Don't have an account?</h3>
              <button className="btn-contained">
                <Link to={`/signup`}>Sign up</Link>
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  
export default LoginComponent;
