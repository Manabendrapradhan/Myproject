import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerItem from '../components/BannerItem';

function AdminBannerScreen() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newBanner, setNewBanner] = useState({
    title: '',
    image: '',
    active: true,
    expiryDate: ''
  });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get('/api/banner');
        setBanners(data);
      } catch (err) {
        setError('Error fetching banners');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const toggleBanner = async (id) => {
    try {
      const { data } = await axios.put(`/api/banner/${id}/toggle`);
      setBanners(banners.map((banner) => (banner._id === id ? data : banner)));
    } catch (err) {
      console.error('Error toggling banner:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBanner({ ...newBanner, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/banner', newBanner);
      setBanners([...banners, data]);
      setNewBanner({ title: '', image: '', active: true, expiryDate: '' });
    } catch (err) {
      console.error('Error adding banner:', err);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: 'auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    label: {
      fontWeight: 'bold',
    },
    input: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    bannerList: {
      marginTop: '20px',
      borderTop: '1px solid #ccc',
      paddingTop: '10px',
    },
  };

  if (loading) return <div>Loading banners...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Manage Banners</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={newBanner.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Image URL:</label>
          <input
            type="text"
            name="image"
            value={newBanner.image}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Active:</label>
          <input
            type="checkbox"
            name="active"
            checked={newBanner.active}
            onChange={(e) => setNewBanner({ ...newBanner, active: e.target.checked })}
          />
        </div>
        <div>
          <label style={styles.label}>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={newBanner.expiryDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Banner</button>
      </form>

      <div style={styles.bannerList}>
        {banners.length === 0 ? (
          <p>No banners available</p>
        ) : (
          banners.map((banner) => (
            <BannerItem key={banner._id} banner={banner} onToggle={toggleBanner} />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminBannerScreen;
