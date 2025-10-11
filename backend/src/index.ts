import dotenv from "dotenv";
dotenv.config({ debug: true });

import app from "./app";
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running on port`, port);
});
