import React from 'react';
import ToggleButton from './ToggleButton';

function BannerItem({ banner, onToggle }) {
  return (
    <div>
      <img src={banner.image} alt="banner" width="100%" />
      <ToggleButton isActive={banner.active} onToggle={() => onToggle(banner._id)} /> {/* Changed isActive from isActive to active */}
      <p>Expires on: {new Date(banner.expiryDate).toLocaleDateString()}</p>
    </div>
  );
}

export default BannerItem;
