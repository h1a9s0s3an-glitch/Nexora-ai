 export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

const { message } = req.body;
res.status(200).json({
  reply:
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    JSON.stringify(data)
});
