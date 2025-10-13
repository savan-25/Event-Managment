// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const api = require('./routes/api');
// const eventRoutes = require('./routes/event');
// const adminRoutes = require('./routes/admin');
// const adminEventRoutes = require('./routes/adminEvents');
// const port = process.env.PORT || 3000;

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Eventdb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Registering routes
// app.use('/api', api);
// app.use('/event', eventRoutes);
// app.use('/admin', adminRoutes);
// app.use('/adminEvents', adminEventRoutes);

// // app.listen(port, function () {
// //     console.lo
// g('Marvellous infosystem server running on localhost:' + port);
// // });

// app.listen(port, () => console.log(`Server running on port ${port}`));

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const eventRoutes = require('./routes/event');
const adminRoutes = require('./routes/admin');
const adminEventRoutes = require('./routes/adminEvents');

const port = process.env.PORT || 3000; // ✅ Correct variable name

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

console.log("EMAIL:", 'savansumbe.sit.comp@gmail.com');
console.log("PASSWORD:", 'xwme fdsx kmnf qjny');
// MongoDB connection
mongoose.connect("mongodb+srv://savansumbe_db_user:tjaHpprrZOwQVXUK@cluster0.5er1cvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Register routes
app.use('/api', api);
app.use('/event', eventRoutes);
app.use('/admin', adminRoutes);
app.use('/adminEvents', adminEventRoutes);

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
