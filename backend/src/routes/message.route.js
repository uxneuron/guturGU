// // src/routes/message.route.js
// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import {
//   getMessages,
//   getUsersForSidebar,
//   sendMessage,
// } from "../controllers/message.controller.js";

// const router = express.Router();

// router.get("/users", protectRoute, getUsersForSidebar);
// router.get("/:id", protectRoute, getMessages);

// router.post("/send/:id", protectRoute, sendMessage);

// export default router;

// src/routes/message.route.js
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging APIs
 */

/**
 * @swagger
 * /api/messages/users:
 *   get:
 *     summary: Get all users except the logged-in user (for sidebar)
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get("/users", protectRoute, getUsersForSidebar);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get chat messages between logged-in user and another user
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Other user's id
 *     responses:
 *       200:
 *         description: List of messages
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protectRoute, getMessages);

/**
 * @swagger
 * /api/messages/send/{id}:
 *   post:
 *     summary: Send a message to a user
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receiver user id
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *                 description: Base64 image string
 *     responses:
 *       201:
 *         description: Message sent
 *       401:
 *         description: Unauthorized
 */
router.post("/send/:id", protectRoute, sendMessage);

export default router;
