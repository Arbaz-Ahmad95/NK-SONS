const port = process.env.PORT ||4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const jwt = require("jsonwebtoken");

const path=require('path')
const fs = require('fs');
const { error } = require("console");

app.use(express.json());
app.use(cors());

// database connection with MongoDB
const MONGO_URL = 'mongodb://127.0.0.1:27017/Ecommerce';

// Database connection
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

// API Creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});



// Schema for Creating Product
const Product= mongoose.model("Product",{
  id: { type: Number,required:true},
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});








// Create Route for Add Product (Add new Product)
app.post('/addproduct',async(req,res)=>{
  let products=await Product.find({});
  let id;
  if(products.length>0){
        let last_product_array=products.slice(-1)
        let last_product=last_product_array[0]
        id=last_product.id+1
  }
  else{
      id=1;
  }
  const product=new Product({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      new_price:req.body.new_price,
      old_price:req.body.old_price,
  })
  console.log(product)
  await product.save();
  console.log("save")
  res.json({
      success:true,
      name:req.body.name,
  })
})


// API for deleting a product
app.post('/removeproduct', async (req, res) => {
      await Product.findOneAndDelete({id:req.body.id});
      console.log("Removed");
      
      // Return success response
      res.json({
        success: true,
        name:req.body.name
      });
    
  });



  // API for getting all products
app.get('/allproducts', async (req, res) => {
  try {
      let products = await Product.find({});
      console.log("All products fetched");
      
      // Send the response with success and product data
      res.json({
          success: true,
          products,
      });
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Schema for creating for Users model
const Users=mongoose.model('Users',{
  name:{
    type:"String",
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }

});

//  Creatinf end point for resistering for users
app.post('/signup',async (req,res)=>{
    let check=await Users.findOne({email:req.body.email})
    if(check){
      return res.status(400).json({success:false,errors:"exixting user found with same email "})
    }

    let cart={}
    for(let i=0;i<300;i++){
        cart[i]=0;

    }

    const user=new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
    })

    await user.save()


    const data={
         user:{
            id:user.id
         }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//  creating endpoint for user login

app.post('/login',async(req,res)=>{
     let user=await Users.findOne({email:req.body.email})
     if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
          const data={
             user:{
                id:user.id
             }
          }

          const token=jwt.sign(data,'secret_ecom')
          res.json({success:true,token})
        }

        else{
          res.json({success:false,errors:"Wrong Password"})
        }

     }

     else{
         res.json({success:false,errors:"Wrong Email id"})
     }
})


// creating api for new collection data
app.get('/newcollections',async (req,res)=>{
  let products=await Product.find({})
  let newcollection=products.slice(1).slice(-8);
  console.log("NewCollection Fetched")
  res.send(newcollection)
})


app.get('/popularinwomen',async(req,res)=>{
  let products=await Product.find({category:"women"})
  let popular_in_women=products.slice(0,4)
  console.log("Popular in women fetched")
  res.send(popular_in_women)
})


// creating middleware to fetch user

const fetchUSer=async (req,res,next)=>{
       const token=req.header('auth-token')

       if(!token){
           res.status(401).send({errors:"please authenticate using valid  token"})
       }
       else{
        try{
          const data=jwt.verify(token,'secret_ecom')
            req.user=data.user;
            next()
        }catch(error){
               res.status(401).send({errors:"please authenticate using  a valid token"})
        }
       }
}

// Creating API for adding products in cartdata

app.post('/addtocart',fetchUSer,async (req,res)=>{
  console.log("added",req.body.itemId)
   let userData=await Users.findOne({_id:req.user.id})
   userData.cartData[req.body.itemId]+=1
   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
   res.send("Added");

})


//  creating API for remove product  form cart data

app.post('/removefromcart',fetchUSer,async(req,res)=>{
  console.log("removed",req.body.itemId)
  let userData=await Users.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId]-=1
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("removed");
})
  

// creating API to get cartData

app.post('/getcart',fetchUSer,async(req,res)=>{
  console.log("GetCart")
  let userData=await Users.findOne({_id:req.user.id})
  res.json(userData.cartData)
})

  
  
