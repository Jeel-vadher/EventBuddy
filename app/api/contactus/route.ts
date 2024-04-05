import connectDB from "@/lib/Contactus";
import Contact, { IContact } from "@/lib/database/models/contact.model";
import { NextResponse } from "next/server";
import mongoose, { Error } from "mongoose";

export async function POST(req: any): Promise<any> {
  const { fullname, email, message }: IContact = await req.json();

  try {
    await connectDB();
    await Contact.create({ fullname, email, message });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList: string[] = [];
      for (let e in error.errors) {
        errorList.push((error.errors[e] as mongoose.Error.ValidatorError).message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}
