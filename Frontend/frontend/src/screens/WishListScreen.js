import React, { useContext } from 'react';
import { Store } from '../Store';// Adjust path as necessary
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const WishlistScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { wishlist: { wishlistItems } } = state;

  const removeFromWishlistHandler = (item) => {
    dispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <h1>Wishlist</h1>
      <Row>
        <Col md={8}>
          {wishlistItems.length === 0 ? (
            <MessageBox>
              Wishlist is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => removeFromWishlistHandler(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WishlistScreen;
