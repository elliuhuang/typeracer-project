import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';


const LogoutButton = () => {
  const {signedIn, setSignedIn} = useAuth()

  const signOut = async () => {
      try {
        const res = await fetch(`/api/account/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        });
        if (!res.ok) {
          throw new Error('Failed to logout');
        }
        alert('Successfully logged out!');
        setSignedIn(false);
      } catch (error) {
        alert('Failed to logout.');
      }
    };

  return (
    <>
      {signedIn &&
        <span>Done playing? <Link to="#" onClick={signOut}>Logout</Link></span>
      }
    </>
  )
}

export default LogoutButton