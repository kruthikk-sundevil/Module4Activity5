const express = require("express");
const bodyParser = require("body-parser");
const studentModel = require("./model/usermodel"); // Import your studentModel

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes using the exported functions from studentModel
app.get("/students", studentModel.getAllStudents);
app.get("/students/:id", studentModel.getStudentById);
app.post("/students", studentModel.createStudent);
app.put("/students/:id", studentModel.updateStudentById);
app.delete("/students/:id", studentModel.deleteStudentById);

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});