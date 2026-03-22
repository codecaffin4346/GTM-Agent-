export default async function handler(req, res) {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ 
      status: "fail", 
      message: "API key is completely missing from Vercel environment." 
    });
  }

  // Mask key for safety
  const maskedKey = `${apiKey.slice(0, 5)}...${apiKey.slice(-5)}`;
  const keyLength = apiKey.length;
  const hasWhitespace = /\s/.test(apiKey);

  try {
    // Make a raw fetch to Google to see the exact rejection reason
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;
    const testResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "testing connection" }] }]
      })
    });

    const data = await testResponse.json();

    return res.status(200).json({
      key_info: {
        masked: maskedKey,
        length: keyLength,
        contains_whitespace: hasWhitespace
      },
      google_api_status: testResponse.status,
      google_api_response: data
    });
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: error.message 
    });
  }
}
