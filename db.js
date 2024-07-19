const mongoose = require("mongoose");
require('dotenv').config();

dbUserPass = process.env.dbUserPass;

dbURL = `mongodb+srv://salmaelfadil:${dbUserPass}@cluster0.qekvwwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err.message));