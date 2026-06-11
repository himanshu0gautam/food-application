import React, { useState, useEffect } from 'react';

const LocationTracker = ({ onLocationFetched }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const savedAddress = localStorage.getItem('user_address');
    if (!savedAddress) {
      setShowModal(true);
    }
  }, []);

  const requestBrowserLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    // 2. Trigger the actual browser permission prompt
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // 3. Send coordinates to your Node.js backend
          const response = await fetch('http://localhost:3000/api/location/saveLocation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: lat, lng: lng })
          });

          const data = await response.json();
          
          if (data.success) {
            localStorage.setItem('user_address', data.address);
            onLocationFetched(data.address); // Pass address to parent component
            setShowModal(false); // Hide modal on success
          } else {
            setError('Failed to fetch address from coordinates.');
          }
        } catch (err) {
          setError('Backend server error. Try again.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        setError('Permission denied. Please enable location in your browser settings.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (!showModal) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ margin: '0 0 10px 0' }}>📍 Enable Location</h2>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
          To show you nearby restaurants and ensure accurate delivery, please allow access to your current location.
        </p>
        
        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
        
        <button 
          onClick={requestBrowserLocation} 
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Detecting Location...' : 'Allow & Detect Location'}
        </button>
      </div>
    </div>
  );
};

// Simple inline styles for demonstration
const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  button: { backgroundColor: '#e23744', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }
};

export default LocationTracker;