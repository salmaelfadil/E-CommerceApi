# **E-commerce API**
This is a backend API for an e-commerce application built with Node.js, Express, and MongoDB. It includes user authentication with JWT tokens, authorization for admin and user roles, product management, and order processing.

## **Table of Contents**

- [**Features**](#features)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**API Endpoints**](#api-endpoints)
- [**Environment Variables**](#environment-variables)
- [**Contributing**](#contributing)
- [**License**](#license)

## **Features**

- User registration and login with JWT authentication.
- Role-based access control for admin and users.
- CRUD operations for products.
- Order creation and income calculation.
- Token-based authentication with access and refresh tokens.
- Middleware for request authorization and admin access.

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-commerce-api.git
   cd e-commerce-api
2. install dependencies:
   npm install
3. set up .env file
4. start server
   npm start
   
## **Usage**
You can use Postman or Insomnia to test the API endpoints.

API Endpoints
### Auth
#### Register User
POST /register
Body:
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "password123"
}

#### Login User
POST /login
Body:
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "password123"
}
#### Refresh Token

POST /refresh
#### Products
GET /allproducts
Query Parameters:

new: boolean (optional) - Get new products
category: string (optional) - Get products by category

#### Get Product by ID
GET /product/:id

#### Create Product (Admin only)

POST /product/create
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category"
}

#### Update Product (Admin only)

PUT /product/update/:id
Body:
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 150,
  "category": "Updated Category"
}

#### Delete Product (Admin only)

DELETE /product/delete/:id

### Orders
#### Create Order

POST /order/create
{
  "userId": "userId",
  "products": [
    {
      "productId": "productId",
      "quantity": 2
    }
  ],
  "amount": 200,
  "address": "address example"
}

### Get Income (Admin only)

GET /income?month=6&year=2023
Query Parameters:

month: number (required) - Get income for a specific month
year: number (required) - Get income for a specific year

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss what you would like to change.

Fork the repository.
Create your feature branch (git checkout -b feature/fooBar).
Commit your changes (git commit -m 'Add some fooBar').
Push to the branch (git push origin feature/fooBar).
Create a new Pull Request
   

 


   
