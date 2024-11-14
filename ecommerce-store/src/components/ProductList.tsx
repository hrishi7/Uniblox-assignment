import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { cartApi, productApi } from '../services/api';
import { CartItem, Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth();
  const navigate = useNavigate(); 


  /**
   * Fetches the user's cart details from the API and updates the state with the cart items.
   *
   * This effect is triggered whenever the user's ID changes. It calls the `cartApi.getCart` function to retrieve the cart items for the user, 
   * and updates the `cartItems` state with the response data. 
   * If there is an error fetching the cart items, a toast error message is displayed.
   */
  useEffect(() => {
    fetchProducts();
    fetchCartDetails(); // Call the async function
  }) // Add user.id as a dependency

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await productApi.getAll(); 
      console.log(response)
      if(response.status === 200){
        setProducts(response.data);
      }
    } catch {
      toast.error('Failed to fetch products. Please try again.'); // Handle error
    } finally {
      setLoading(false);
    }
  }

  const fetchCartDetails = async () => { // Define an async function
    try {
      const response = await cartApi.getCart(user!.id); // Call cartApi.getCart
      console.log(response)
      if(response.status === 200){
        setCartItems(response.data.items);
      }
    } catch {
      // toast.error('Failed to fetch cart items. Please try again.'); // Handle error

      
    } finally {
    }
  };

  /**
   * Adds a product to the user's cart.
   *
   * @param productId - The ID of the product to add to the cart.
   * @param quantity - The quantity of the product to add to the cart.
   * @returns A Promise that resolves when the product has been added to the cart, or rejects if there was an error.
   */
  const addToCart = async (productId: string, quantity: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await cartApi.addItem(productId, quantity, user.id);
      toast.success('Product added to cart!');
      await fetchCartDetails();
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.');
    }
  };


  /**
   * Checks if a given product is currently in the user's cart.
   *
   * @param id - The ID of the product to check.
   * @returns `true` if the product is in the cart, `false` otherwise.
   */
  const isInCart = (id: string) => cartItems.some(item => item.productId === id); // Check if product is in cart

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>Rs. {product.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
              {isInCart(product.id) ? ( // Conditional rendering based on cart status
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate('/cart')} // Navigate to cart
                    >
                      Go to Cart
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCart(product.id, 1)}
                    >
                      Add to Cart
                    </Button>
                  )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default ProductList;