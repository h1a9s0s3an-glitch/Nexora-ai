module.exports = async function(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "⚠️ Method not allowed"
    });
  }

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
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(data);

    res.status(200).json({ reply });

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

    res.status(200).json({
      reply: "⚠️ Error: " + error.message
    });

  }

};
