const express = require("express");
const { addTrasection, getAllTransection,editTransection ,deleteTransection} = require("../controllers/transactionctrl");


//router object
const router = express.Router();

//routers
//add transaction

router.post('/add-transection',addTrasection)

//get all transaction
router.post('/get-transection',getAllTransection)

//edit transaction
router.post('/edit-transection',editTransection)

//delete transaction
router.post('/delete-transection',deleteTransection)


module.exports = router;
