import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Home.css';

function Home() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    // Test API connection
    const checkAPI = async () => {
      try {
        const response = await api.get('/health');
        setApiStatus(`✓ Connected - ${response.data.message}`);
      } catch (error) {
        setApiStatus('✗ Unable to connect to API');
        console.error('API connection error:', error);
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <h1>Welcome to EventAI</h1>
          <p>Your event management solution</p>
        </div>
        
        <div className="card">
          <h2>Getting Started</h2>
          <p>This is a full-stack application template with:</p>
          <ul>
            <li>React Frontend</li>
            <li>Express Backend API</li>
            <li>PostgreSQL Database</li>
          </ul>
          <p className="api-status">
            <strong>API Status:</strong> {apiStatus}
          </p>
        </div>

        <div className="card">
          <h2>Next Steps</h2>
          <ol>
            <li>Set up your database using Docker Compose</li>
            <li>Configure your environment variables</li>
            <li>Run database migrations</li>
            <li>Start building your features!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
