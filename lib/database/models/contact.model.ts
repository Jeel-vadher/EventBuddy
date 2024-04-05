import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  fullname: string;
  email: string;
  message: string;
  date: Date;
}

const contactSchema: Schema<IContact> = new Schema<IContact>({
  fullname: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "Name must be larger than 2 characters"],
    maxLength: [50, "Name must be lesser than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },

  message: {
    type: String,
    required: [true, "Message is required."],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
