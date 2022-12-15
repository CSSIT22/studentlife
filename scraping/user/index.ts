import { PrismaClient } from "@prisma/client";
import sts from "./students/students.json";
import { student } from "./students/studenttype";
import axios from "axios";
(async () => {

  const students = sts as student[];
  const prisma = new PrismaClient();

  // const profile_pic = await axios.get(`https://graph.microsoft.com/v1.0/me/photos/432x432/$value`, {
  let count = 2554;
  for (let item of students.slice(2555)) {
    count++;
    let img: any = null;
    try {
      let d = await axios.get(
        `https://graph.microsoft.com/v1.0/users/${item.id}/photos/432x432/$value`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "image/jpg",
          },
          responseType: "arraybuffer",
        }
      );
      img = d.data;
      //   console.log(d.data);
    } catch (err) {
      console.log("Error");
    }
    try {
      const student = await prisma.user_Profile.create({
        data: {
          userId: item.id,
          studentId: "691" + (count + "").padStart(8, "0"),
          fName: item.givenName,
          lName: item.surname,
          email: item.mail,
          image: img || null,
          studentMajor: {
            connectOrCreate: {
              where: {
                majorId: item.officeLocation,
              },
              create: {
                majorId: item.officeLocation,
                majorName: item.officeLocation,
                majorFaculty: {
                  connectOrCreate: {
                    where: {
                      facultyId: item.department,
                    },
                    create: {
                      facultyId: item.department || "unknown",
                      facultyName: item.department || "unkonwn",
                    },
                  },
                },
              },
            },
          },
        },
      });
      console.log(student);
    } catch (err) {
      console.log(err);
    }
  }
})();
