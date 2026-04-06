 import { prisma } from "../../lib/prisma";
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

export const SellerRequestService = { createSellerRequestIntoDB };