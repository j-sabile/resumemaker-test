import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/file", (req, res) => {
  res.attachment("helloworld.tex");
  res.sendFile(path.resolve("./helloworld.tex"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const SUPABASE_URL = "https://imngjkbfvhqtajtpmwhd.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltbmdqa2JmdmhxdGFqdHBtd2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjUxMjgsImV4cCI6MjAxNTU0MTEyOH0.r-j6sSqilPsDHFjw0bAi27UxOYFn5rRgXhGjnD9AjKk";

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, ANON_KEY);

const test = async () => {
  const avatarFile = fs.readFileSync("./output.pdf");
  const { data, error } = await supabase.storage.from("test-bucket").upload("output.pdf", avatarFile);
  // const { data, error } = await supabase.storage.from("test-bucket").download("PRISMA.txt");

  if (data) {
    console.log(data);
    //   const bufferData = await data.arrayBuffer();
    //   const buffer = Buffer.from(bufferData);
    //   fs.writeFileSync("prisma.txt", buffer);
  } else if (error) console.log(error);
};
