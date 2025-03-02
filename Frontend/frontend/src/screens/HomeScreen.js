import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import BannerSlider from "../components/BannerSlider"; // Ensure this is the correct import
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { 
        ...state, 
        products: action.payload.products, 
        banners: action.payload.banners, 
        loading: false 
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products, banners }, dispatch] = useReducer(reducer, {
    products: [],
    banners: [], // Initialize banners
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        // Fetch both products and banners concurrently
        const [productsResult, bannersResult] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/banner"), // Ensure the API endpoint is correct
        ]);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            products: productsResult.data,
            banners: bannersResult.data,
          },
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>WonderCart</title>
      </Helmet>
      
      {/* Render the BannerSlider component */}
      <BannerSlider banners={banners} /> {/* Use BannerSlider here */}
      <br></br>
      <hr></hr>
      <h1 style={{ fontFamily: "Georgia" }}>Featured Products</h1>
      <br></br>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.length === 0 ? ( // Check if products array is empty
              <MessageBox variant="info">No products found.</MessageBox>
            ) : (
              products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))
            )}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
