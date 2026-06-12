module.exports = async function(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "⚠️ Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          messages: [
            {
              role: "system",
              content: "You are Nexora AI, a helpful and intelligent assistant."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "⚠️ AI service unavailable.";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(200).json({
      reply: "⚠️ Error connecting to Nexora AI."
    });
  }
};
