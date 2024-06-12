# Shopping Platform

Welcome to the Shopping Platform application! This application provides backend services for a selling products platform, allowing users to register, log in, manage products, and more.

## Running the Application

To run this application locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

git clone https://github.com/nadeemnagarji/10xers.git

2. **Install Dependencies**: Navigate into the cloned repository directory and install the dependencies using npmcd :mobile-selling-platform
   npm install

3. **Set Environment Variables**: Create a `.env` file in the root directory and define the required environment variables. Here's an example of the required variables:

DATABASE_URL=A POSTGRESQL DB URL
CORS_ORIGIN =\*
PORT=3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d 4. **Run the Application**: Start the application by running the following command: npm run dev

5. **Access the API Documentation**: Once the application is running, you can access the API documentation by navigating to `http://localhost:3000/api-docs` in your web browser.

To run the frontend of this application locally, follow these additional steps:

1. **Navigate to Frontend Directory**: Navigate to the frontend directory within the cloned repository:cd frontend

2. **Install Dependencies**: Install the frontend dependencies using npm or yarn:npm install

3. **Run the Frontend**: Start the frontend development server using Vite:npm run dev
4. **Access the Frontend**: Once the frontend is running, you can access it by navigating to `http://localhost:3000` in your web browser.

## Documentation

For detailed information on the available API endpoints and how to use them, please refer to the API documentation. You can access the documentation by visiting the following route when the backend is running:
