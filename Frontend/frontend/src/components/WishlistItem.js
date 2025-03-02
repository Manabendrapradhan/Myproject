import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../components/MessageBox';
import WishlistItem from '../components/WishlistItem';
import axios from 'axios';

export default function WishlistScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    wishlist: { wishlistItems },
  } = state;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const { data } = await axios.get('/api/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ctxDispatch({ type: 'WISHLIST_FETCH_ITEMS', payload: data.items });
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [ctxDispatch]);

  const removeFromWishlistHandler = async (id) => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    await axios.delete(`/api/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ctxDispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: id });
  };

  return (
    <div>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <h1>Wishlist</h1>
      <Row>
        <Col md={12}>
          {wishlistItems.length === 0 ? (
            <MessageBox>
              Your wishlist is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <WishlistItem
                    item={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}
