const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();
const app = express();
app.use(express.json());

// Routes
// These prefixes define the start of your URLs
app.use('/api/auth', authRoutes); // e.g., /api/auth/login
app.use('/api/users', userRoutes); // e.g., /api/users/finance

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server live on http://localhost:${PORT}`));