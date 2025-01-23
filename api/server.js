const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

// Initialize dotenv for environment variables
dotenv.config();

const userController = require("./Controller/UserController");
const foodTypeController = require("./Controller/FoodTypeController");
const foodSizeController = require("./Controller/FoodSizeController");
const tasteController = require("./Controller/TasteController");
const foodController = require("./Controller/FoodController");
const saleTemplateController = require("./Controller/SaleTempController");
const organizationController = require("./Controller/OrganizationController");
const billSaleController = require("./Controller/BillSaleController");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use("/uploads", express.static("./uploads"));

// Routes

app.post("/api/user/signin", (req, res) => {
  userController.signin(req, res);
});

//FoodType

app.post("/api/FoodType/create", (req, res) => {
  foodTypeController.create(req, res);
});
app.get("/api/foodType/list", (req, res) => {
  foodTypeController.list(req, res);
});

app.put("/api/foodType/update", (req, res) => {
  foodTypeController.update(req, res);
});

app.delete("/api/foodType/remove/:id", (req, res) => {
  foodTypeController.remove(req, res);
});

//FoodSize

app.post("/api/foodSize/create", (req, res) => {
  foodSizeController.create(req, res);
});

app.get("/api/foodSize/list", (req, res) => {
  foodSizeController.list(req, res);
});

app.delete("/api/foodSize/remove/:id", (req, res) => {
  foodSizeController.remove(req, res);
});

app.put("/api/foodSize/update", (req, res) => {
  foodSizeController.update(req, res);
});

app.get("/api/foodSize/filter/:foodTypeId", (req, res) => {
  foodSizeController.filter(req, res);
});

//Taste

app.post("/api/taste/create", (req, res) => {
  tasteController.create(req, res);
});

app.get("/api/taste/list", (req, res) => {
  tasteController.list(req, res);
});

app.delete("/api/taste/remove/:id", (req, res) => {
  tasteController.remove(req, res);
});

app.put("/api/taste/update", (req, res) => {
  tasteController.update(req, res);
});

app.get("/api/taste/listByFoodTypeId/:foodTypeId", (req, res) => {
  tasteController.listByFoodTypeId(req, res);
});

//Food

app.post("/api/food/create", (req, res) => {
  foodController.create(req, res);
});

app.post("/api/food/upload", (req, res) => {
  foodController.upload(req, res);
});

app.get("/api/food/list", (req, res) => {
  foodController.list(req, res);
});

app.delete("/api/food/remove/:id", (req, res) => {
  foodController.remove(req, res);
});
app.put("/api/food/update", (req, res) => {
  foodController.update(req, res);
});

app.get("/api/food/filter/:foodType", (req, res) => {
  foodController.filter(req, res);
});
app.get("/api/food/search/:name", (req, res) => {
  foodController.search(req, res);
});

//SaleTemp

app.post("/api/saleTemp/create", (req, res) => {
  saleTemplateController.create(req, res);
});

app.get("/api/saleTemp/list/:userId", (req, res) => {
  saleTemplateController.list(req, res);
});

app.delete("/api/saleTemp/clear/:userId", (req, res) => {
  saleTemplateController.clear(req, res);
});

app.delete("/api/saleTemp/remove/:foodId/:userId", (req, res) => {
  saleTemplateController.remove(req, res);
});

app.put("/api/saleTemp/changeQty", (req, res) => {
  saleTemplateController.changeQty(req, res);
});

app.post("/api/saleTemp/createDetail/", (req, res) => {
  saleTemplateController.createDetail(req, res);
});

app.get("/api/saleTemp/listSaleTempDetail/:saleTempId", (req, res) => {
  saleTemplateController.listSaleTempDetail(req, res);
});

app.post("/api/saleTemp/updatefoodSize/", (req, res) => {
  saleTemplateController.updateFoodSize(req, res);
});

app.post("/api/saleTemp/updateTaste/", (req, res) => {
  saleTemplateController.updateTaste(req, res);
});

app.post("/api/saleTemp/newSaleTempDetail", (req, res) => {
  saleTemplateController.newSaleTempDetail(req, res);
});

app.delete("/api/saleTemp/removeSaleTempDetail/:id", (req, res) => {
  saleTemplateController.removeSaleTempDetail(req, res);
});

app.post("/api/saleTemp/endSale", (req, res) => {
  saleTemplateController.endSale(req, res);
});

app.post("/api/saleTemp/printBillBeforePay", (req, res) => {
  saleTemplateController.printBillBeforePay(req, res);
});

app.post("/api/saleTemp/printBillAfterPay", (req, res) => {
  saleTemplateController.printBillAfterPay(req, res);
});

//Organization

app.post("/api/organization/save", (req, res) => {
 organizationController.create(req, res);
});

app.get("/api/organization/info", (req, res) => {
 organizationController.info(req, res);
});

app.post("/api/organization/upload", (req, res) => {
 organizationController.upload(req, res);
});

//billSale
app.post("/api/billSale/list", (req, res) => {
  billSaleController.list(req, res);
});

app.delete("/api/billSale/remove/:id", (req, res)=>{
  billSaleController.remove(req, res);
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
