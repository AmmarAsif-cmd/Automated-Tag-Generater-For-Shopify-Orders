const { default: axios } = require('axios');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const { SHOP, API_VERSION, ACCESS_TOKEN } = process.env;

app.get('/', async (req, res) => {
  res.send({ success: true });
});

app.get('/shop/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = { order: { id, tags: 'OTP Verified' } };
    const response = await axios.put(`https://${SHOP}/admin/api/${API_VERSION}/orders/${id}.json`, payload, {
      headers: { Authorization: `Basic ${ACCESS_TOKEN}` },
    });
    console.log(`Order[${id}] : Added Tag`);
    res.send({ success: true, message: `Order[${id}] : Added Tag` });
  } catch (err) {
    res.statusCode = 502;
    res.send({ success: false, message: err.response.data });
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
