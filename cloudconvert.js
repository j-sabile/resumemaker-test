import CloudConvert from "cloudconvert";
import fs from "fs"
import https from "https";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTFhNmQ3OTY2ZDZjNTI5YTU1NmFiZmU3OTRkMTUyMGY5YWIwYmRiZmI3OTE0MTVjMzU4ZmMxNmQ4N2YwZTNlZDZmMzI4ODk2N2U2NGE2YzMiLCJpYXQiOjE2OTk1MTkyNjIuMjEwNDY2LCJuYmYiOjE2OTk1MTkyNjIuMjEwNDY4LCJleHAiOjQ4NTUxOTI4NjIuMjA0ODc2LCJzdWIiOiI2NjAxNzg5MCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwidXNlci53cml0ZSJdfQ.Px_1YzzMlY9GTLAogCtctycvTHlIFL1lTjc8EHtEo9LkXiyQXIrZNmpUHglncjTUOF7GTLvSK-zQ9geGLq85Ky9WDI-FE-hlbquwfMOxrjNTHOQsuMUF9urJmGzcIpbd_IH9dwzvphBEfEKIGuD6jEYVluEUC89kaiID6G2zfpgHYCN4Uy-jcHLwhJ5m-yfI04rdtWTbadvV6d07TcxDJn4ZYGOLdq1-NFyK2coQVEqZHZC1rBf-7Jg1f2r6cCRlAKIaOdCIjmuj3FZ8JCVV0VvDDjomK80rUaFTtEZP5fnjnc0aLYwrOGF05t7wu0GHTX9QOkRtX-4WBYlEPlp9BZaPMJMpAsv8DT3ta8C0pXiK-5uEluRpTCTs2MznkUOjsvIL16dNpm-gnmb6unhHl5xXqbSYA_8SNHDY-rlFIAWqBqQo1RIzrOam2zrNQG2OwHc44lIWfrSgiupi8lQJUhRCLmYTcvE5UXYJ7WIWnJBEgYAzWb5EUG9L4_zUa2zLBX0eVuLdAA0mFQ-tEqxxu6nzVDu6Di9VbCl9sor__Bg1_eAMP_j_JKD8FRyiRW0UzPV5z4NUlVctbFe9m5NvYIptzQBPz3d2pneN5v_o-Xcfg-CVAeKXRi-xAQ6sref3_NKCYkTrep2jG0lHuF_KA2S_oYKnY-vr1VVe403GKBo";

try {
  const cloudConvert = new CloudConvert(API_KEY);

  let job = await cloudConvert.jobs.create({
    tasks: {
      "import-my-file": {
        operation: "import/url",
        url: "https://resumemaker-test.onrender.com/file",
      },
      "convert-my-file": {
        operation: "convert",
        input: "import-my-file",
        output_format: "pdf",
        some_other_option: "value",
      },
      "export-my-file": {
        operation: "export/url",
        input: "convert-my-file",
      },
    },
  });

  job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

  const file = cloudConvert.jobs.getExportUrls(job)[0];

  const writeStream = fs.createWriteStream("./out/" + file.filename);

  https.get(file.url, function (response) {
    response.pipe(writeStream);
  });

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
} catch (error) {
  console.log(error.message);
}
