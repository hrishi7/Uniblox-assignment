import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { orderApi, cartApi } from "../services/api";
import { toast } from "react-toastify";
import { CartItem } from "../types";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchCartDetails(); // Call the async function
  }, [user!.id]); // Add user.id as a dependency

  /**
   * Fetches the user's cart details from the API and updates the state with the cart items.
   *
   * This effect is triggered whenever the user's ID changes. It calls the `cartApi.getCart` function to retrieve the cart items for the user,
   * and updates the `cartItems` state with the response data.
   * If there is an error fetching the cart items, a toast error message is displayed.
   */
  const fetchCartDetails = async () => {
    // Define an async function
    try {
      const response = await cartApi.getCart(user!.id); // Call cartApi.getCart
      setCartItems(response.data.items);
    } catch {
      toast.error("Failed to fetch cart items. Please try again."); // Handle error
    } finally {
    }
  };

  /**
   * Handles the process of placing an order for the current user.
   *
   * This function is called when the user wants to complete their order. It first checks if the user is authenticated, and if so, it calls the `orderApi.checkout` function to process the order. If the order is placed successfully, it displays a success message and navigates the user to the orders page. If there is an error, it displays an error message.
   *
   * @param discountCode - The discount code to be applied to the order, if any.
   */
  const placeOrder = async () => {
    try {
      await orderApi.checkout(discountCode, user!.id); // Call cartApi.checkout
      toast.success("Order placed successfully!"); // Show success message
      navigate("/orders"); // Navigate to orders page
    } catch (error) {
      toast.error("Failed to place order. Please try again."); // Handle error
    }
  };

  /**
   * Removes a product from the user's cart.
   *
   * This function is called when the user wants to remove a product from their cart. It calls the `cartApi.removeItem` function to remove the specified product from the user's cart, and then fetches the updated cart details to update the UI.
   *
   * If the removal is successful, a success message is displayed using the `toast` library. If there is an error, an error message is displayed.
   *
   * @param productId - The ID of the product to be removed from the cart.
   */

  const removeFromCart = async (productId: string) => {
    try {
      await cartApi.removeItem(productId, user!.id); // Call cartApi.removeItem
      toast.success("Product removed from cart!"); // Show success message
      await fetchCartDetails(); // Fetch updated cart details
    } catch (error) {
      toast.error("Failed to remove product from cart. Please try again."); // Handle error
    }
  };

  /**
   * Updates the quantity of a product in the user's cart.
   *
   * This function is called when the user wants to update the quantity of a product in their cart. It calls the `cartApi.updateItem` function to update the quantity of the specified product in the user's cart, and then fetches the updated cart details to update the UI.
   *
   * If the update is successful, a success message is displayed using the `toast` library. If there is an error, an error message is displayed.
   *
   * @param productId - The ID of the product to be updated.
   * @param quantity - The new quantity for the product.
   */
  const updateItemQuantity = async (productId: string, quantity: number) => {
    try {
      await cartApi.updateItem(productId, quantity, user!.id); // Call cartApi.updateItemQuantity
      toast.success("Product quantity updated!"); // Show success message
      await fetchCartDetails(); // Fetch updated cart details
    } catch (error) {
      toast.error("Failed to update product quantity. Please try again."); // Handle error
    }
  };

  /**
   * Calculates the total cost of all items in the cart.
   *
   * This function iterates through the `cartItems` array and multiplies the price of each item by its quantity, then sums up the total.
   *
   * @returns The total cost of all items in the cart.
   */

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.productId}>
                <ListItemText
                  primary={item.productId}
                  secondary={`Quantity: ${item.quantity} - $${
                    item.price * item.quantity
                  }`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() =>
                      updateItemQuantity(item.productId, item.quantity - 1)
                    } // Decrease quantity
                    disabled={item.quantity <= 1} // Disable if quantity is 1
                    sx={{
                      fontSize: "1.5rem",
                      padding: "8px",
                      marginRight: "8px",
                    }} // Increased size and padding
                  >
                    <RemoveIcon /> {/* Use RemoveIcon for subtraction */}
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() =>
                      updateItemQuantity(item.productId, item.quantity + 1)
                    } // Increase quantity
                    sx={{
                      fontSize: "1.5rem",
                      padding: "8px",
                      marginRight: "8px",
                    }} // Increased size and padding
                  >
                    <AddIcon /> {/* Use AddIcon for addition */}
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => removeFromCart(item.productId)}
                    sx={{ fontSize: "1.5rem", padding: "8px" }} // Increased size and padding
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 4 }}>
            <TextField
              label="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              sx={{ mr: 2 }}
            />
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${calculateTotal()}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={placeOrder}
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
