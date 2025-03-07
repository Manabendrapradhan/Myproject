import React from 'react';

const DashboardScreen = ({ data }) => {
    // Ensure data is defined and has numOrders property
    const numOrders = data?.numOrders || 0;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Number of Orders: {numOrders}</p>
            // ...existing code...
        </div>
    );
};

export default DashboardScreen;
