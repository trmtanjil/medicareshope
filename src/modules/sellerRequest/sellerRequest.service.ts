 import { RequestStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middalewared/auth";
import { ISellerRequest } from "./sellerRequest.interface";

 

// এখানে 'payload: any' এর বদলে 'payload: ISellerRequest' ব্যবহার করো
const createSellerRequestIntoDB = async (userId: string, payload: ISellerRequest) => {
  
  const existingRequest = await prisma.sellerRequest.findUnique({
    where: { userId },
  });

  if (existingRequest) {
    throw new Error("You have already submitted a request.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const request = await tx.sellerRequest.create({
      data: {
        shopName: payload.shopName,
        shopAddress: payload.shopAddress,
        contactNumber: payload.contactNumber,
        reason: payload.reason || null,
        userId: userId, // সরাসরি userId পাস করছি
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { status: "PENDING_SELLER" },
    });

    return request;
  });

  return result;
};

const getAllSellersFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.SELLER ,
    },
    include: {
      sellerRequest: true, // সেলারের দোকানের তথ্যসহ দেখাবে
    },
  });
  return result;
};

const deactivateSellerIntoDB = async (id: string) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      status: "BLOCKED", // অথবা 'INACTIVE' আপনার এনাম অনুযায়ী
    },
  });
  return result;
};

const getAllPendingRequestsFromDB = async () => {
  const result = await prisma.sellerRequest.findMany({
    where: {
      status: RequestStatus.PENDING, // শুধু যারা এখনো অ্যাপ্রুভ হয়নি
    },
    include: {
      user: true, // ইউজারের নাম, ইমেইলসহ দেখাবে
    },
  });
  return result;
};

export const SellerRequestService = {
   createSellerRequestIntoDB,
  getAllSellersFromDB,
  deactivateSellerIntoDB,
  getAllPendingRequestsFromDB

 };