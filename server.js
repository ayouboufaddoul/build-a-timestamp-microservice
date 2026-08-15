import express from "express";
import cors from "cors";

const app=express();

app.use(cors({ optionSuccessStatus:200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api{/:date}",(req,res)=>{
    let date= "";
    if(req.params.date)
        date=req.params.date;
    if((date != "") && !(/^\d+$/.test(date)) && isNaN((new Date(date)).getTime())){
        return res.json({"error":"Invalid Date"});
    }
    if(date == ""){
        return res.json({"unix":(Math.floor(Date.now())),"utc":((new Date()).toUTCString())});
    }else if((!(/^\d+$/.test(date)) && (new Date(date)) )  || date.indexOf("-")>-1){
        return res.json({"unix":(Math.floor((new Date(date)).getTime())),"utc":(new Date(date)).toUTCString()});
    }else {
        return res.json({"unix":Number(date),"utc":(new Date(Number(date))).toUTCString()});
    }
});

const PORT=8000;
const listener = app.listen(PORT, function () {
console.log("Your app is listening on port " + listener.address().port);
} );