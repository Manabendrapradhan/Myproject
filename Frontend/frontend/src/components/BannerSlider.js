import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function BannerSlider({ banners }) {
  // Filter out expired and inactive banners
  const validBanners = banners.filter(banner => {
    const today = new Date();
    return banner.active && (!banner.expiryDate || new Date(banner.expiryDate) >= today);
  });

  return (
    <Carousel>
      {validBanners.map((banner) => (
        <Carousel.Item key={banner._id}>
          <img src={banner.image} alt="banner" width="100%" />
          <Carousel.Caption>
            <h3>{banner.title}</h3> {/* Display banner title if available */}
            <p>Expires on: {new Date(banner.expiryDate).toLocaleDateString()}</p> {/* Display expiry date */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerSlider;
