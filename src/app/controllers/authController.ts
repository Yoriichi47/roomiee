import { delete_file, upload_file } from "@/cloudinary";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt"; //Use @types/bcrypt if you are using typescript
import { NextRequest, NextResponse } from "next/server";

export const registerUser = async (req: NextRequest) => {
  const body = await req.json();

  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }, // USe hashed password as the type of password that will be go to the database
  });

  return NextResponse.json({ success: true, Details: user });
};

export const updateUser = async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    name: body.name,
    email: body.email,
    exisitingEmail: body.exisitingEmail,
  };

  try {
    if (userData.email !== "" && userData.name === "") {
      const updateUser = await prisma.user.update({
        where: {
          email: userData.exisitingEmail,
        },
        data: {
          email: userData.email,
        },
      });

      return NextResponse.json({
        success: true,
        Details: updateUser,
        message: "Email updated successfully",
      });
    } else if (userData.name !== "" && userData.email === "") {
      const updateUser = await prisma.user.update({
        where: {
          email: userData.exisitingEmail,
        },
        data: {
          name: userData.name,
        },
      });

      return NextResponse.json({
        success: true,
        Details: updateUser,
        message: "Name updated successfully",
      });
    } else {
      const updateUser = await prisma.user.update({
        where: {
          email: userData.exisitingEmail,
        },
        data: {
          name: userData.name,
          email: userData.email,
        },
      });

      return NextResponse.json({
        success: true,
        Details: updateUser,
        message: "User updated successfully",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
};

export const updateUserPassword = async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    password: body.password,
    exisitingEmail: body.email,
  };

  const existingPassword = await prisma.user.findFirst({
    where: {
      email: userData.exisitingEmail,
    },
    select: {
      password: true,
    },
  });

  const samePassword = await bcrypt.compare(
    userData.password,
    existingPassword?.password || ""
  );

  if (samePassword) {
    return NextResponse.json({
      success: false,
      message: "New password cannot be the same as the old password",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (userData.password !== "") {
      const updateUser = await prisma.user.update({
        where: {
          email: userData.exisitingEmail,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json({
        success: true,
        Details: updateUser,
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
};

export const updateUserPicture = async (req: NextRequest) => {
    const body = await req.json()

    const userData = {
        picture: body.picture,
        email: body.email
    }

    try {
        if(userData.picture !== ""){

            const upload_image = await upload_file(userData.picture, "roomiee/userImage")

             const imageID = await prisma.user.findFirst({
                where: {
                    email: userData.email
                },
                select: {
                    imageID: true
                }
             })

             if(imageID?.imageID){
                await delete_file(imageID.imageID)
             }

            const updatePicture = await prisma.user.update({
                where: {
                    email: userData.email
                },
                data: {
                    image: upload_image.url,
                    imageID: upload_image.public_id
                }
            })
            return NextResponse.json({
                success: true,
                message: "Picture updated successfully",
                details: updatePicture
            })
        }
        return NextResponse.json({
            success: false,
            message: "Picture not uploaded"
        })
    } catch (error) {
        if (error instanceof Error ) {
            return NextResponse.json({ success: false, message: error.message })
        }
    }
}