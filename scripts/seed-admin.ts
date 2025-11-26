// import prisma from "../lib/prisma";
// import bcrypt from "bcrypt";

// async function seedAdmin() {
//   try {
//     const existingAdmin = await prisma.user.findFirst({ where: { role: "admin" } });
//     if (existingAdmin) {
//       console.log("Admin user already exists:", existingAdmin.email);
//       return;
//     }
//     const hashedPassword = await bcrypt.hash("admin123", 10);
//     const admin = await prisma.user.create({
//       data: {
//         email: "pasindusadanjana@gmail.com",
//         password: hashedPassword,
//         role: "admin",
//       },
//     });
//     console.log("Admin user created:", admin.email);
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedAdmin();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const prisma = require("../lib/prisma").default;
import bcrypt from "bcrypt";

async function seedAdmin() {
  try {
    const existingAdmin = await prisma.user.findFirst({ where: { role: "admin" } });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      return;
    }
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
      data: {
        email: "pasindusadanjana@gmail.com",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Admin user created:", admin.email);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();