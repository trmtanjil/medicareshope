import { Request, Response } from "express";
import { SellerRequestService } from "./sellerRequest.service";
import { SellerRequestRoutes } from "./sellerRequest.route";
 
const createSellerRequest = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // আপনার Auth Middleware থেকে আসা ইউজার আইডি
    const result = await SellerRequestService.createSellerRequestIntoDB(userId, req.body);

    res.status(200).json({
      success: true,
      message: "সেলার হওয়ার আবেদনটি সফলভাবে পাঠানো হয়েছে!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "আবেদন পাঠাতে সমস্যা হয়েছে",
    });
  }
};

const getAllSellers = async (req: Request, res: Response) => {
  try {
    const result = await SellerRequestService.getAllSellersFromDB();
    res.status(200).json({
      success: true,
      message: "সেলারদের লিস্ট সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deactivateSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SellerRequestService.deactivateSellerIntoDB(id as string);
    res.status(200).json({
      success: true,
      message: "সেলারকে সফলভাবে ডিঅ্যাক্টিভেট করা হয়েছে",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getPendingRequests = async (req: Request, res: Response) => {
  try {
    const result = await SellerRequestService.getAllPendingRequestsFromDB();
    res.status(200).json({
      success: true,
      message: "পেন্ডিং রিকোয়েস্টগুলো পাওয়া গেছে",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const SellerRequestController = {
  createSellerRequest,
getAllSellers  ,
deactivateSeller,
getPendingRequests,


};