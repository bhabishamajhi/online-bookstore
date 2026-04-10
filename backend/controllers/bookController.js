const Book = require("../models/bookModel");

exports.getBooks = async (req,res)=>{
  const books = await Book.find();
  res.json(books);
};

exports.getBook = async (req,res)=>{
  const book = await Book.findById(req.params.id);
  if(!book) return res.status(404).json({msg:"Not found"});
  res.json(book);
};

exports.addBook = async (req,res)=>{
  const book = new Book(req.body);
  await book.save();
  res.json(book);
};

exports.updateBook = async (req,res)=>{
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(book);
};

exports.deleteBook = async (req,res)=>{
  await Book.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
};