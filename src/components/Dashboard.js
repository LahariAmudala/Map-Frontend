import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('User not logged in');
        }

        const response = await axios.get('http://localhost:5000/api/dashboard', {
            
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCards(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (cardId) => {
    navigate(`/map?id=${cardId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              border: '1px solid black',
              padding: '20px',
              cursor: 'pointer',
            }}
          >
            <p>{card.title}</p>
            <p>ID: {card.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

