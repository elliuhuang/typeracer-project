import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../style/profile.css";
import { WpmHistogram } from './Chart.tsx';


const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/');
            return;
        }
        const response = await axios.get(`/api/user/${username}`);
        setUserData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderWpmHistogram = () => {
    if (!userData || userData.wpm.length === 0) {
      return null;
    }

    let wpmData = userData.wpm;
    let mistakeData = userData.mistakes;

    if (wpmData.length > 10) {
      wpmData = wpmData.slice(-10); // Only take the last 10 values
      mistakeData = mistakeData.slice(-10);
    }

    return <WpmHistogram wpmData={wpmData} mistakeData={mistakeData} />;
  };

  const renderUserData = () => {
    if (!userData) {
      return <p>Loading...</p>;
    }

    // Calculate average mistakes and average WPM
    const avgMistakes = userData.mistakes.length > 0 ? userData.mistakes.reduce((acc: number, val: number) => acc + val, 0) / userData.mistakes.length : 0;
    const avgWPM = userData.wpm.length > 0 ? userData.wpm.reduce((acc: number, val: number) => acc + val, 0) / userData.wpm.length : 0;

    return (
        <div className="profile-container"> 
          <div className="profile-content"> 
            <h1>{userData.username}'s Profile</h1>
            <p>Average Mistakes: {avgMistakes.toFixed(2)}</p>
            <p>Average WPM: {avgWPM.toFixed(2)}</p>
            {renderWpmHistogram()}
            <button onClick={() => navigate("/")}>Home</button>
          </div>
        </div>
      );
  };

  return <div>{renderUserData()}</div>;
};

export default ProfilePage;
