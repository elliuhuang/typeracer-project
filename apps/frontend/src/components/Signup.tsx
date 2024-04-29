import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useNavigate } from "react-router-dom";
import "../style/signup.css"



type signupProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignupPageComponent: React.FC<signupProps> = ({setSignedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const signupAttempt = async () => {
    if (username !== '' && password !== '') {
      try {
        const res = await fetch(`/api/account/signup`, {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }), 
        });
        if (!res.ok) {
          throw new Error('Signup failed'); 
        }

        localStorage.setItem('username', username);

        setSignedIn(true); 
        alert('Successfully signed up!');
        navigate("/");
        
      } catch (error) {
        alert('Username taken or invalid username or password.');
      }
    } else {
      alert('Invalid username or password.');
    }
    setUsername('');
    setPassword('');
  }
  return (
    <>
      <div className="signup">
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
        <button onClick={signupAttempt}>Sign Up</button>
        </div>
      </div>
    </>
  );
}


const SignupComponent: React.FC = () => {
    const { signedIn, setSignedIn } = useAuth();
  
    return (
      <>
        {!signedIn && (
          <div className="signup-container">
            <div className="mt-3">
              <h2>Create a Typeracer account!</h2>
            </div>
            <div className="mt-3">
              <div className="signup-page">
                <SignupPageComponent setSignedIn={setSignedIn} />
              </div>
              <div className="have-account">
                <h3>Have an account?</h3>
                <button className="contained">
                  <a href={`/login`}>Log In</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  

export default SignupComponent;
