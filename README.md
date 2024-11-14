# Uniblox-assignment

# Problem statement
 You are designing an ecommerce store. Clients can add items to their cart and checkout to successfully place an order. Every nth order gets a coupon code for 10% discount and can apply to their cart.

We would like you to design and implement APIs for adding items to cart and checkout functionality. The checkout API would validate if the discount code is valid before giving the discount.

Building a UI that showcases the functionality is a stretch goal. If you are primarily a backend engineer, you can also submit postman or REST client or equivalent.

The store also has two admin API's:

Generate a discount code if the condition above is satisfied.
Lists count of items purchased, total purchase amount, list of discount codes and total discount amount.
You can build this with a technology stack that you are comfortable with. You would push the code to your github repo and share the link once its complete. We would like to see your commits that show progression and thought process as to how you are completing the exercise.

Things that you will be evaluated on:

Functional code
Code quality
UI in a framework of your choice
Code comments, readme docs
Unit tests
Assumptions you can make:

The API’s don’t need a backend store. It can be an in-memory store.
FAQ:
Q: Can a discount code be used multiple times?

A: Discount code can be requested by every user, but is made available for every nth order only. The discount code can be used only once before the next one becomes available on the next nth order.

Q: Does the discount code apply to one item?

A: Discount code applies to the entire order.

## Getting Started

## Running the Server App

1. **Navigate to the server directory**:
   ```bash
   cd ./server
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Build the server**:
   ```bash
   yarn build
   ```

4. **Start the server**:
   ```bash
   yarn start
   ```
## Running the E-commerce Store React App

1. **Open a new terminal window**.

2. **Navigate to the React app directory**:
   ```bash
   cd ./ecommerce-store
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the React application to interact with the server**:
   ```bash
   npm run start
   ```

---

API Documentation: [API Documentation](./api-documentation.md)

---

## High-Level Design (HLD) for Server REST API

The server REST API is designed to handle requests related to the e-commerce application. The main components include:

- **Dashboard for Order Management**: Handles viewing the analytics for admin for order, products, discount code etc.
- **Product Management**: Manages product listings, details.
- **Order Management**: Processes customer orders and if for every nth order the discount code submitted by customer is valid then the discount is applied.
- **Cart Management**: CRUD operations for managing user carts.

### API Endpoints Overview

- **Admin Dashboard Endpoints**
  - `POST /api/admin/discount`: Generate new discount code.
  - `GET /api/admin/stats`: Retrieve analytics for order, discount code used etc. information.

- **Product Endpoints**
  - `GET /api/products`: Retrieve a list of products.

- **Order Endpoints**
  - `POST /api/orders/checkout`: Place a new Order.
  - `GET /api/orders/:userId`: Retrieve orders details of a specific user.

- **Cart Endpoints**
  - `POST /api/cart`: Add to cart.
  - `GET /api/cart/:userId`: Retrieve cart details of a specific user.
  - `DELETE /api/cart/:itemId`: Delete item from the cart of a specific user.
  - `PUT /api/cart/:itemId`: Update cart details of a specific user.


## Low-Level Design (LLD) for Server REST API

### Admin Management

- **Admin Model**: Defines the structure of admin data (e.g., admin ID, username, permissions).
- **Controllers**: Handles the logic for generating discount codes and retrieving analytics.
- **Routes**: Defines the API endpoints for admin-related actions.
  - `POST /api/admin/discount`: Generate new discount code.
  - `GET /api/admin/stats`: Retrieve analytics for order, discount code used, etc.

### Product Management

- **Product Model**: Defines the structure of product data (e.g., product ID, name, description, price, stock).
- **Controllers**: Manages product listing, retrieval, and creation.
- **Routes**: Defines the API endpoints for product-related actions.
  - `GET /api/products`: Retrieve a list of products.

### Order Management

- **Order Model**: Defines the structure of order data (e.g., order ID, user ID, product IDs, status).
- **Controllers**: Handles order creation and retrieval.
- **Routes**: Defines the API endpoints for order-related actions.
  - `POST /api/orders/checkout`: Place a new order.
  - `GET /api/orders/:userId`: Retrieve orders details of a specific user.

### Cart Management

- **Cart Model**: Defines the structure of cart data (e.g., cart ID, user ID, item IDs).
- **Controllers**: Manages cart operations (add, retrieve, delete, update).
- **Routes**: Defines the API endpoints for cart-related actions.
  - `POST /api/cart`: Add to cart.
  - `GET /api/cart/:userId`: Retrieve cart details of a specific user.
  - `DELETE /api/cart/:itemId`: Delete item from the cart of a specific user.
  - `PUT /api/cart/:itemId`: Update cart details of a specific user.

---

### Client-Side(React Application)

### High-Level Design (HLD) for React Application

The React application serves as the front-end interface for the e-commerce store, allowing users to interact with the backend APIs. The main components of the application include:

- **User Interface (UI)**: A responsive and user-friendly interface for customers to browse products, manage their cart, and complete the checkout process.
- **State Management**: Utilizes a state management library (e.g., Redux or Context API) to manage application state, including user authentication, cart items, and order details.
- **API Integration**: Communicates with the backend REST APIs to perform actions such as fetching products, adding items to the cart, and processing orders.
- **Routing**: Implements client-side routing (e.g., using React Router) to navigate between different views such as product listings, cart, and order confirmation.
- **Admin Dashboard**: A separate section for admin users to manage products, view analytics, and generate discount codes.

### API Endpoints Overview for React Application

- **Product Management**
  - `GET /api/products`: Fetches the list of products to display on the product listing page.

- **Cart Management**
  - `POST /api/cart`: Sends a request to add items to the user's cart.
  - `GET /api/cart/:userId`: Retrieves the current cart details for the logged-in user.
  - `DELETE /api/cart/:itemId`: Sends a request to remove an item from the user's cart.
  - `PUT /api/cart/:itemId`: Updates the quantity or details of an item in the user's cart.

- **Order Management**
  - `POST /api/orders/checkout`: Submits the order for processing and applies any valid discount codes.
  - `GET /api/orders/:userId`: Fetches the order history for the logged-in user.

---

### Low-Level Design (LLD) for React Application

#### Components Structure

- **App Component**: The main component that wraps the entire application and handles routing.
- **ProductList Component**: Displays a list of products fetched from the API.
- **ProductItem Component**: Represents an individual product with details and an "Add to Cart" button.
- **Cart Component**: Displays the items in the user's cart, allows for item removal, and initiates the checkout process.
- **Checkout Component**: Handles the order submission and applies discount codes.
- **AdminDashboard Component**: Provides admin functionalities such as product management and viewing analytics.

#### State Management

- **Store**: Centralized state management using Redux or Context API to manage:
  - User authentication status
  - Cart items
  - Order details
  - Product listings

#### API Service Layer

- **apiService.js**: A utility file to handle API requests, including methods for:
  - Fetching products
  - Managing cart operations
  - Processing orders

#### Routing

- **React Router**: Configured to handle navigation between:
  - Home (Product List)
  - Cart
  - Checkout
  - Admin Dashboard (for admin users)