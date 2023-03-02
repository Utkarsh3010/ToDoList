const express = require('express');
const bodyParser = require('body-parser');
let items = ["Coding","Gym","Eat Food"];
let workItems = [];
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  let today = new Date();
  let options={
  weekday:"long",
  day:"numeric",
  month:"long"
};
  let day = today.toLocaleDateString("en-US",options);

  res.render('list',{listTitle:day, newListItems:items});
});

app.post("/",function(req,res){
  let item= req.body.newItem;
  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/Work");
  }
  else{
    items.push(item);
      res.redirect("/");
  }
});
app.get("/Work",function(req,res){
  res.render('list',{listTitle:"Work List",newListItems:workItems});
});

app.listen(3000,function(){
  console.log("Server Is Running on Port 3000");
});
