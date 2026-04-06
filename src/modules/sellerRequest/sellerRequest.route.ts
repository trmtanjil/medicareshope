import express from "express";
import { SellerRequestController } from "./sellerRequest.controller";
// আপনার auth middleware এখানে ইমপোর্ট করবেন

const router = express.Router();

// শুধুমাত্র লগইন করা ইউজাররাই আবেদন করতে পারবে
router.post(
  "/", 
  // authMiddleware, // আপনার মিডলওয়্যার এখানে দিন
  SellerRequestController.createSellerRequest
);

export const SellerRequestRoutes = router;