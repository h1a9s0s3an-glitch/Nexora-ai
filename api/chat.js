module.exports = async function(req, res) {
try {
const { message } = req.body;

const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  process.env.GEMINI_API_KEY,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: message
        }]
      }]
    })
  }
);

const data = await response.json();

res.status(200).json({
  reply: JSON.stringify(data)
});

} catch (err) {
res.status(200).json({
reply: err.message
});
}
};
