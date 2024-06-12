import dotenv from "dotenv";
import { app } from "./app.js";
import { setupSwagger } from "./swagger.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
