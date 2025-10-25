# E-Commerce Application

A full-stack e-commerce application built with React (Frontend) and Spring Boot (Backend).

## Features

### User Features
- User registration with OTP verification
- Login/Logout with JWT authentication
- Browse products by category
- Search products
- Add products to cart
- Checkout with Razorpay payment integration
- View order history
- Add product reviews and ratings
- Password reset functionality

### Admin Features
- Admin registration (requires super admin approval)
- Admin dashboard with statistics
- Add/Edit/Delete products with image upload
- View all orders
- Manage reviews
- View contact messages

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.1
- Axios for API calls
- React Toastify for notifications
- React Icons
- Formik & Yup for form validation

### Backend
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Razorpay Payment Gateway
- Email Service (Gmail SMTP)
- File Upload Support

## Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- MySQL 8.0 or higher
- Maven
- Gmail account for email service

## Setup Instructions

### 1. Database Setup

```sql
CREATE DATABASE ecommerce;
```

The tables will be created automatically by Hibernate when you run the application.

### 2. Backend Setup

1. Navigate to the backend directory
2. Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce?createDatabaseIfNotExist=true
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

# Email Configuration
spring.mail.username=YOUR_GMAIL_ADDRESS
spring.mail.password=YOUR_GMAIL_APP_PASSWORD

# Razorpay Configuration
razorpay.key.id=YOUR_RAZORPAY_KEY_ID
razorpay.key.secret=YOUR_RAZORPAY_KEY_SECRET

# Authorized Admin Email
admin.authorized.email=YOUR_ADMIN_EMAIL
```

3. Create uploads directory:
```bash
mkdir uploads
```

4. Run the application:
```bash
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

Frontend will start on `http://localhost:3000`

## Important Notes

### Email Configuration
- You need to enable "Less secure app access" or use an App Password for Gmail
- To get Gmail App Password:
  1. Go to Google Account settings
  2. Security → 2-Step Verification
  3. App passwords → Generate new password
  4. Use this password in `application.properties`

### Razorpay Setup
1. Sign up at https://razorpay.com
2. Get Test API keys from Dashboard
3. Update `razorpay.key.id` and `razorpay.key.secret` in `application.properties`
4. For production, switch to Live mode

### Admin Registration Flow
1. New admin registers through `/admin/register`
2. Email is sent to authorized admin (configured in properties)
3. Authorized admin approves/rejects via email link
4. Upon approval, new admin can login

## Project Structure

### Frontend
```
src/
├── components/
│   ├── admin/          # Admin components
│   ├── common/         # Shared components
│   ├── order/          # Order related components
│   ├── product/        # Product components
│   └── user/           # User components
├── context/            # React Context (Auth, Cart)
├── services/           # API service files
└── utils/              # Helper functions
```

### Backend
```
src/main/java/com/ecommerce/
├── config/             # Security, CORS, Razorpay config
├── controller/         # REST API controllers
├── dto/                # Data Transfer Objects
├── model/              # JPA Entities
├── repository/         # JPA Repositories
├── security/           # JWT filters and handlers
├── service/            # Business logic
└── util/               # Utility classes
```

## API Endpoints

### Public Endpoints
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/admin/login` - Admin login
- `GET /api/items/all` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `GET /api/items/category/{category}` - Get items by category

### Protected User Endpoints
- `GET /api/user/profile` - Get user profile
- `POST /api/orders/create` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/reviews/add` - Add review

### Protected Admin Endpoints
- `POST /api/items/add` - Add new item
- `PUT /api/items/update/{id}` - Update item
- `DELETE /api/items/delete/{id}` - Delete item
- `GET /api/orders/all` - Get all orders
- `GET /api/reviews/all` - Get all reviews

## Default Test Credentials

### Super Admin
After first setup, register an admin using the email configured in `admin.authorized.email`.

### User
Register a new user through the application.

## Troubleshooting

### CORS Issues
- Ensure backend CORS configuration includes frontend URL
- Check if ports match (default: frontend 3000, backend 8080)

### Database Connection
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `ecommerce` exists

### File Upload Issues
- Verify `uploads` directory exists in backend root
- Check file permissions
- Ensure `file.upload-dir=./uploads` in properties

### Email Not Sending
- Verify Gmail credentials
- Check if App Password is used (not regular password)
- Enable "Less secure app access" if needed

### Payment Issues
- Verify Razorpay keys are correct
- Check if using Test mode keys for development
- Ensure Razorpay script loads properly

## Features to Add (Optional Enhancements)

- Product variants (size, color)
- Wishlist functionality
- Order tracking
- Admin analytics dashboard
- Product inventory alerts
- Bulk product upload
- Export orders to CSV/Excel
- Product recommendations
- Discount coupons
- Multi-image product gallery

## License

This project is for educational purposes.

## Support

For issues or questions, please create an issue in the repository.