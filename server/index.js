const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getCompliment,getFortune,createRequest,getRequests,deleteRequest,acceptRequest,getFortunelist,getComplimentlist} = require("./controller");

app.get("/api", getRequests);
app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post("/api", createRequest);
app.listen(4000, () => console.log("Server running on 4000"));
app.delete('/api/:id',deleteRequest)
app.put('/api/:id',acceptRequest)
app.get("/api/fortunelist", getFortunelist);
app.get("/api/complimentlist", getComplimentlist);