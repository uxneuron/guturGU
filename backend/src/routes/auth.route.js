// // src/routes/auth.route.js
// import express from "express";
// import {
//   checkAuth,
//   login,
//   logout,
//   signup,
//   updateProfile,
// } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);

// router.get("/check", protectRoute, checkAuth);

// export default router;

// src/routes/auth.route.js
import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully (JWT cookie set)
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/auth/update-profile:
 *   put:
 *     summary: Update profile picture
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profilePic
 *             properties:
 *               profilePic:
 *                 type: string
 *                 description: Base64 image string
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Profile pic is required
 *       401:
 *         description: Unauthorized
 */
router.put("/update-profile", protectRoute, updateProfile);

/**
 * @swagger
 * /api/auth/check:
 *   get:
 *     summary: Check authentication and get current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user details
 *       401:
 *         description: Unauthorized
 */
router.get("/check", protectRoute, checkAuth);

export default router;
