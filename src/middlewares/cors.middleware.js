import cors from 'cors';

// Simple CORS middleware
const corsMiddleware = cors({
  origin: 'http://localhost:8000',  // Flutter web ka origin (apne port ke mutabiq)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // agar cookies/auth ke liye zaroorat ho
});

export default corsMiddleware;
