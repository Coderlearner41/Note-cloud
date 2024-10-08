const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors') 
connectToMongo();

const app = express()
const port = 5000

// app.use(cors())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
}));


// Available Routes
app.use('/api/notes', require('./routes/notes'))
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Note Cloud backend is listening on port ${port}`)
})
