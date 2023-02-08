import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;
const mongodbURI = process.env.mongodbURI || "mongodb+srv://Backend-Boiler-Plate:backend@cluster0.4rf4ikm.mongodb.net/Backend-Boiler-Plate?retryWrites=true&w=majority"


app.use(cors())
app.use(express.json());
mongoose.connect(mongodbURI)


let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    createdOn: { type: Date, default: Date.now }
})
const productModel = mongoose.model('Products', productSchema);




// ----------------------------------- Create/Add Product -----------------------------------
app.post('/product', (req, res) => {
    const body = req.body
    if (!body.name || !body.price) {
        res.status(400).send({
            message: `Required Paramters Missing`
        })
        return;
    }
    productModel.create({
        name: body.name,
        price: body.price
    },
        (error, uploaded) => {
            if (!error) {
                console.log("Succesfully Uploaded to database", uploaded);
                res.send({
                    message: "Product Added Successfully",
                    data: uploaded
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})
// ----------------------------------- Create/Add Product -----------------------------------



// ----------------------------------- Get Product -----------------------------------
// ------------------------ Get All Product ------------------------
app.get('/products', (req, res) => {
    productModel.find({}, (error, allFound) => {
        if (!error) {
            console.log("uploaded", allFound)
            res.send({
                message: `Product Added Succesfully 👍`,
                data: allFound
            })
        } else {
            res.status(500).send({
                message: `Server Error`
            })

        }
    });
})
// ------------------------ Get All Product ------------------------

// ------------------------ Get Specified Product ------------------------
app.get('/product/:id', (req, res) => {
    const id = req.params.id
    productModel.findOne({ _id: id }, (error, found) => {
        if (!error) {
            if (found) {
                res.send({
                    message: `Got the product of the specified id ${found._id}`,
                    data: found
                })
            } else {
                res.status(404).send({
                    message: `Product Not Found`
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    })
})
// ------------------------ Get Specified Product ------------------------
// ----------------------------------- Get Product -----------------------------------



// ----------------------------------- Delete Product -----------------------------------
// ------------------------ Delete All Product ------------------------
app.delete('/products', (req, res) => {
    productModel.deleteMany({}, (error, data) => {
        if (!error) {
            res.send({
                message: `All products deleted`
            })
        } else {
            res.status(500).send({
                message: `server error`
            })
        }
    })
})
// ------------------------ Delete All Product ------------------------

// ------------------------ Delete Specified Product ------------------------
app.delete('/product/:id', (req, res) => {
    const id = req.params.id
    productModel.deleteOne({ _id: id }, (error, deletedData) => {
        console.log(deletedData)
        if (!error) {
            if (deletedData.deletedCount === 1) {
                res.send({
                    message: `Product has been deleted of the following id ${id}`
                })
            } else {
                res.send({
                    message: `Product not found of the following id ${id}`
                })
            }
        } else {
            res.status(500).send({
                message: `server error`
            })
        }
    })
})
// ------------------------ Delete Specified Product ------------------------
// ----------------------------------- Delete Product -----------------------------------



// ----------------------------------- Update Product -----------------------------------
app.put('/product/:id', async (req, res) => {
    const body = req.body
    const id = req.params.id

    if (!body.name || !body.price) {
        res.status(400).send({
            message: `Required Paramters Missing. Please provide name and price`
        })
        return;
    }
    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})
// ----------------------------------- Update Product -----------------------------------























//////////////mongodb connected disconnected events///////////////////////////////////////////////
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
//////////////mongodb connected disconnected events///////////////////////////////////////////////




















// const __dirname = path.resolve()
// const staticPath = path.join(__dirname, '../client/build')
// console.log("PATH-------",staticPath)
// app.use('/'.express.static(staticPath))
// app.use('*'.express.static(staticPath))


app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});