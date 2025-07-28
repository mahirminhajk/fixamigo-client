export interface IAddress {
  _id?: string;
  user?: string;
  name?: string;
  phone: string;
  altPhone?: string;

  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  createdAt?: string;
  updatedAt?: string;
}
