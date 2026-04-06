import { RequestStatus } from "../../generated/prisma/enums";

 
export interface ISellerRequest {
  shopName: string;      // দোকানের নাম (অবশ্যই স্ট্রিং হতে হবে)
  shopAddress: string;   // দোকানের ঠিকানা
  contactNumber: string; // কন্টাক্ট নম্বর
  reason?: string;       // কেন সেলার হতে চায় (ঐচ্ছিক/Optional)
  status?: RequestStatus; // পেন্ডিং, অ্যাপ্রুভড নাকি রিজেক্টেড (Enum টাইপ)
  userId: string;        // ইউজারের আইডি
}