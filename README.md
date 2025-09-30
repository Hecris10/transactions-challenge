# Code Challenge Project

This project consists of a React frontend client and an Express.js backend server.

## Project Structure

```
code-challenge/
├── client/          # React frontend application
├── server/          # Express.js backend API
└── README.md        # This file
```

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup and Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd code-challenge
```

### 2. Install Server Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### 3. Install Client Dependencies

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

## Running the Project

### Starting the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the server in development mode:
   ```bash
   npm run dev
   ```
   
   Or start in production mode:
   ```bash
   npm start
   ```

The server will start and listen on the configured port (check `src/index.js` for the specific port).

### Starting the Client

1. Open a new terminal window/tab and navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the React development server:
   ```bash
   npm run dev
   ```

The client application will start and typically be available at `http://localhost:5173` (Vite's default port).

## Available Scripts

### Server Scripts

- `npm run dev` - Starts the server with file watching (automatically restarts on changes)
- `npm start` - Starts the server in production mode
- `npm test` - Runs the test suite

### Client Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Serves the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## Development Workflow

1. **Start the server first**: Always start the backend server before the client to ensure API endpoints are available.

2. **Run both simultaneously**: Keep both the server and client running in separate terminal windows during development.

3. **Hot reloading**: Both the server (with `--watch` flag) and client (Vite) support hot reloading, so changes will be reflected automatically.

## Testing

### Running Server Tests

```bash
cd server
npm test
```

## Building for Production

### Client Build

```bash
cd client
npm run build
```

This creates a `dist/` directory with the production-ready files.

### Server Deployment

The server can be deployed by:
1. Installing dependencies: `npm install --production`
2. Starting with: `npm start`

## Troubleshooting

### Port Conflicts

If you encounter port conflicts:
- Check if the server port is available
- Modify the port configuration in the server files if needed
- For the client, Vite will automatically try the next available port

### Dependencies Issues

If you encounter dependency issues:
1. Delete `node_modules` folders in both client and server directories
2. Delete `package-lock.json` files
3. Run `npm install` again in both directories

### CORS Issues

If you encounter CORS issues when the client tries to communicate with the server, ensure the server is configured to accept requests from the client's origin.


## License

This project is licensed under the ISC License.