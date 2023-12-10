const transactionModel = require('../models/transactionModel')
const getAllTransection=async(req,res)=>{
    try {
       const transection=await transactionModel.find({userid:req.body.userid});
        res.status(200).json(transection);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const editTransection=async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.trasactionId},req.body.payload);
        res.status(200).send("Edit Successfully");
    
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}

const deleteTransection=async(req,res)=>{
    try {
       await transactionModel.findOneAndDelete({_id:req.body.trasactionId})
       res.status(200).send("Transaction deleted")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }

}

const addTrasection = async(req,res)=>{
try {
        const newTransection =new transactionModel(req.body);
        await newTransection.save();
        res.status(201).send("transection created");
} catch (error) {
    console.log(error);
    res.status(500).json(error);
    
}
}

module.exports={getAllTransection,addTrasection,editTransection,deleteTransection}