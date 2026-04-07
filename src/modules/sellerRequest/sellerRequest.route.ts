import express from "express";
import { SellerRequestController } from "./sellerRequest.controller";
 import auth, { UserRole } from "../../middalewared/auth";
// আপনার auth middleware এখানে ইমপোর্ট করবেন

const router = express.Router();

// শুধুমাত্র লগইন করা ইউজাররাই আবেদন করতে পারবে
router.post(
  "/apply-seller", 
  // authMiddleware, // আপনার মিডলওয়্যার এখানে দিন
  auth(UserRole.CUSTOMER),
   SellerRequestController.createSellerRequest
);
router.get(
  "/all-sellers",
  // authMiddleware("ADMIN"), // শুধুমাত্র অ্যাডমিন দেখতে পারবে
  SellerRequestController.getAllSellers
);

router.patch(
  "/deactivate/:id",
  // authMiddleware("ADMIN"),
  SellerRequestController.deactivateSeller
);

// পেন্ডিং লিস্ট দেখার জন্য
router.get("/pending-requests", SellerRequestController.getPendingRequests);

// অ্যাপ্রুভ করার জন্য
router.patch("/approve/:id", SellerRequestController.approveRequest);

export const SellerRequestRoutes = router;