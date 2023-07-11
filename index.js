import  express  from "express";
import { getUser, loginUser, registerUser, updateUser } from "./controller/controller.js";
const port = 4000

const app = express()

app.use(express.json())



app.post('/register' , registerUser)

app.get('/user/:id' , getUser)

app.post('/login' , loginUser)

app.patch('/update/:id' , updateUser)




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})