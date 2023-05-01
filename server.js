const express =require('express')

const app = express()

const data = require ('./Movie Data/data.json')

app.get('/',(req,res)=>{
const data1 = {"title":data.title,
"poster_path":data.poster_path,
"overview":data.overview,
}
res.json(data1)
})

app.get('/favorite',(req,res)=>{
	res.send('Welcome to Favorite Page');
})
app.use(( req, res) => {
  
  res.status(500).json({
    status: 500,
    responseText: "Sorry, something went wrong"
  });
});


app.use((req, res) => {
  res.status(404).json({
    status: 404,
    responseText: "Sorry, page not found"
  });
});

app.listen(3000)