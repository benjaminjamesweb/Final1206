const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const userModel = require('./models/users');
require('dotenv').config();
app.use(express.json());
const UserRoutes = require('./routes/user');
const PurchaseRoutes = require('./routes/purchase');
const path = require('path');

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected');
}).catch((error) => {
    console.log(`Error ${error}`);
});

app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/api/purchase/v1/users', UserRoutes);
app.use('/api/v1/user/purchases', PurchaseRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})