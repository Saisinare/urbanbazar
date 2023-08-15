const { default: mongoose } = require("mongoose");
const Product = require("../../models/Product");
const User = require("../../models/User");

exports.getProducts = async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.minPrice) {
    filter.price = { $gte: parseInt(req.query.minPrice) };
  }
  if (req.query.maxPrice) {
    if (filter.price) {
      filter.price.$lte = parseInt(req.query.maxPrice);
    } else {
      filter.price = { $lte: parseInt(req.query.maxPrice) };
    }
  }
  try {
    let products;
    if(req.query.limit){
      let limit = parseInt(req.query.limit)
      products = await Product.find(filter).limit(limit);
    }else{
      products = await Product.find(filter);
    }
    res.status(200).json({ products: products });
  } catch (err) {
    console.log(err);
  }
};


exports.getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    res.status(200).json({ products: product });
  } catch (err) {
    console.log(err);
  }
};

exports.getCartProducts = async (req, res) => {
  const userId = req.userId

  try {
    const user= await User.findById(userId).populate('cart.products');
    res.status(200).json({ products:user.cart.products });
  } catch (err) {
    console.log(err);
  }
};

exports.postAddtoCart = async (req, res) => {
  const userId = req.userId;
  const productId = new mongoose.Types.ObjectId(req.params.productId);
  try {
    const user = await User.findById(userId);
    if (user) {
        user.cart.products.push(productId)
        await user.save()
        res.status(200).json({ msg: "Added To Cart" });
    } else {
      res.status(400).json({ msg: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFromCart = async (req,res)=>{
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.cart.products  = user.cart.products.filter(product=>{
                return product === req.query.productId 
            })
            await user.save()
            res.status(200).json({ msg: "deleted From Cart To Cart" });
        } else {
          res.status(400).json({ msg: "Not Found" });
        }
      } catch (err) {
        console.log(err);
      }
}
