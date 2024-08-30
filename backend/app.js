import express from "express";
import cors from "cors";
import bookRouter from "./routes/bookRoutes.js";

const startServer = () => {
  const port = 5000;
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/books", bookRouter);

  app.listen(port, () => {
    console.log(`Server is running. Use our Api on port ${port}`);
  });
};
export default startServer;
