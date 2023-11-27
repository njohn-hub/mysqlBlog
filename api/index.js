import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:3000',  
  credentials: true,
  secure: true
};
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename)

})

app.use("/posts", postRoutes)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)

app.listen(8002, () => {
    console.log("server running")
})