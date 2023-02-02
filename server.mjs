import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;
const mongodbURI = process.env.mongodbURI || "mongodb+srv:Backend-Boiler-Plate:backend@cluster0.4rf4ikm.mongodb.net/Backend-Boiler-Plate?retryWrites=true&w=majority"


app.use(cors())
app.use(express.json());
mongoose.connect(mongodbURI)


let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})
const userModel = mongoose.model('Users', userSchema);




app.get('/signup', (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let password = req.body.password
    res.send('Hello World')
})














////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////






















app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});