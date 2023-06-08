import mongoose, { Document, Schema } from 'mongoose';

export interface IAnonymizedCustomer extends Document {
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

const AnonymizedCustomerSchema = new Schema<IAnonymizedCustomer>(
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

export const AnonymizedCustomer = mongoose.model<IAnonymizedCustomer>(
  'customer_anonymised',
  AnonymizedCustomerSchema
);
