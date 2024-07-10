export type UploadBody = {
    address: string;
    hotelName?: string;
    phoneNo?: string;
    imageName?: string,
    email: string;
    pass: string;
    description?:string
    hotelLogo?: string
  };
  
export  type PersonalInfo={
    _id: string,
    hotelName: string,
    email: string,
    phoneNo: string,
    role: string,
    imageName?: string,
    address?: string,
    description?: string,
    hotelLogo?: string
    createdAt: string,
    updatedAt: string,
  }
  