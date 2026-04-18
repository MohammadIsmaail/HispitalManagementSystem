import express from "express";
const router = express.Router();
import {
  UserRegistrationController,
  UserLoginController,
  addDoctorController,
  getAllDoctorsController,
  getDoctorByIdController,
  updateDoctorController,
  deleteDoctorController,
} from "../Controller/controller.js";

import {
  addPatientController,
  getAllPatientsController,
  getPatientByIdController,
  updatePatientController,
  deletePatientController
} from "../Controller/patientController.js"


import { authMiddleware, roleMiddleware } from "../Middleware/auth.js";

router.post("/register", UserRegistrationController);

router.post("/login", UserLoginController);

// Admin only
router.post(
  "/add-doctor",
  authMiddleware,
  roleMiddleware(["admin"]),
  addDoctorController,
);

// Saare dekh sakte hain
router.get(
  "/all-doctor",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "patient"]),
  getAllDoctorsController,
);

// Ek doctor
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "doctor", "patient"]),
  getDoctorByIdController,
);

// Admin only
router.put("/update/:id", authMiddleware, roleMiddleware(["admin"]), updateDoctorController)

// Admin only
router.delete("/delete/:id", authMiddleware, roleMiddleware(["admin"]), deleteDoctorController)


// Patient routes
router.post("/add-patient", authMiddleware, roleMiddleware(["admin"]), addPatientController)
router.get("/all-patient", authMiddleware, roleMiddleware(["admin"]), getAllPatientsController)
router.get("/patient/:id", authMiddleware, roleMiddleware(["admin", "doctor", "patient"]), getPatientByIdController)
router.put("/update-patient/:id", authMiddleware, roleMiddleware(["admin", "patient"]), updatePatientController)
router.delete("/delete-patient/:id", authMiddleware, roleMiddleware(["admin"]), deletePatientController)

export default router;
