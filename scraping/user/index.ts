import { PrismaClient } from "@prisma/client";
import sts from "./students/students.json";
import { student } from "./students/studenttype";
import axios from "axios";
(async () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkZBTmI4Vi1TTGJTZFI2VWVncGFYVmkzZmk2UlhSeWZEYW1XS2Q3ZmhUNnMiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZjQ0MzJkYy0yMGQyLTQ0MWQtYjFkYi1hYzMzODBiYTYzM2QvIiwiaWF0IjoxNjcxMTI1NzQ2LCJuYmYiOjE2NzExMjU3NDYsImV4cCI6MTY3MTEzMDAwOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZQkJrcmR2dmsvZFJ3Tlg0RkpPa2twZmNQMFB2TnFlL1NYc2wxL1pjZWJjelJBc0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6InN0YWdpbmcubW9kbGlmZXMiLCJhcHBpZCI6Ijg3YWE5MzM2LTg2MTgtNGI3MC1hODY0LTNhMjEzZDlmOWZjZiIsImFwcGlkYWNyIjoiMSIsImZhbWlseV9uYW1lIjoiT1VBTVNJUkkiLCJnaXZlbl9uYW1lIjoiU0lUVElDSE9LIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAyLjI4LjcuNSIsIm5hbWUiOiJTSVRUSUNIT0sgT1VBTVNJUkkiLCJvaWQiOiJlMzFhYTM1NC1jMDBmLTRhZGYtOGM4Yy1iZThlNzU1NDk0OWYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTI0NzM4OTUwOS02OTI5NTgwOTAtMTQ4NTAxMTI1NS04NTA5MiIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMTY2Qzc1MTg5IiwicmgiOiIwLkFYSUEzREpFYjlJZ0hVU3gyNnd6Z0xwalBRTUFBQUFBQUFBQXdBQUFBQUFBQUFCeUFQMC4iLCJzY3AiOiJVc2VyLlJlYWRCYXNpYy5BbGwgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiIzNENMMVVWZ0wtQmpOYkVIMXRQMzRub3FRXzFOSndhQ01MRFNhUGZsUW80IiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNmY0NDMyZGMtMjBkMi00NDFkLWIxZGItYWMzMzgwYmE2MzNkIiwidW5pcXVlX25hbWUiOiJzaXR0aWNob2sub3VhbUBrbXV0dC5hYy50aCIsInVwbiI6InNpdHRpY2hvay5vdWFtQGttdXR0LmFjLnRoIiwidXRpIjoiSjQzbk1YU2lNMDZfTk91YWhfSDdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJsN2d5bHhlLThGUkJlZG8ybldiRUJZYlpHaTdVNWhNaFJhS1hibUxPbkdBIn0sInhtc190Y2R0IjoxNDQwODM0NDg5fQ.fIsEeMNq1vVR5m4_46W5hf1eg9zFzo8tqngd2Qg5tLfVTTKKT_UpFqBI9ZWeLX0qz-4t2METc7AAvD0uUG0Mz9KTtxpYl1LI246ACyL84K-UgHEt3hm_WNATXh2LO0jPAM5BXCLVO_tuOtl2u4lDnVkQcipPl2Lh0THU9288crBbM15Z3DvFV1XJtRYCf-ERO6nXN6ylvyk6958AAofgWAm7bY8-mK2gDj8JtOp96dP4oiMrnOXJcG3JjYXU8f0diQr8ltzqzEMtQ2cvh0K8_mz26KSTFwr3lhdR3Iec5b9l7dXtUfYbB-TT9VswEKnxonJPS3K7rJsgz9YcsxoPzg";

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
