const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");

exports.addToCart = async (req,res)=>{
  const {userId, bookId, quantity} = req.body;

  const book = await Book.findById(bookId);
  let cart = await Cart.findOne({userId});

  if(!cart) cart = new Cart({userId, items:[]});

  const item = cart.items.find(i=>i.bookId.toString()===bookId);

  if(item){
    item.quantity = quantity;
  }else{
    cart.items.push({
      bookId,
      title: book.title,
      quantity,
      price: book.price
    });
  }

  await cart.save();
  res.json(cart);
};

exports.getCart = async (req,res)=>{
  const cart = await Cart.findOne({userId:req.params.userId});
  res.json(cart || {items:[]});
};

exports.clearCart = async (req,res)=>{
  await Cart.deleteOne({userId:req.params.userId});
  res.json({msg:"Cleared"});
};