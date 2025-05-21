require('dotenv').config();
const express = require('express');
const cors = require('cors');
const banker = require('./routes/banker'); 
const customer = require('./routes/customer');
const auth = require('./routes/auth');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/banker', banker);
app.use('/api/customer', customer);
app.use('/api/auth', auth);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error!' });
});

app.get("/",(req,res)=>{
  res.send({msg:"Server Running"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
