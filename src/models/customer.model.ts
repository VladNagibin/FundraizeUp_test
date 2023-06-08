import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: String,
    lastName: String,
    email: String,
    address: {
      line1: String,
      line2: String,
      postcode: String,
      city: String,
      state: String,
      country: String,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model<ICustomer>('customer', CustomerSchema);
