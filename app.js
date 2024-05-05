const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("John Luke");
});
 
app.listen(process.env.PORT || 4500, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 4500));
});