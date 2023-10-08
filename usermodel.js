const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.user.findMany();
    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data",
    });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data",
    });
  }
};

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating a new student",
    });
  }
};

exports.updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedStudent = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        student: updatedStudent,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the student",
    });
  }
};

exports.deleteStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the student",
    });
  }
};