const express = require('express');
const app = express();

// Middleware Header Authorization
const checkAuthorizationHeader = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader !== 'DEVCREW-BACKEND-TEST') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log(req.body);
  next();
};

// Middleware Input Checker (isNumber, isNaN)
const checkInput = (req, res, next) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    return res.status(422).json({ error: 'Unsupported data format' });
  }
  next();
};

app.use(express.json())
app.use(checkAuthorizationHeader);
app.use(checkInput);

app.post('/', (req, res) => {
  // console.log(req.body);
  const { a, b } = req.body;
  const result = a * b;
  res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});