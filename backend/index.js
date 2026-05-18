import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let currentLayout = {
  artboard: { width: 600, height: 400 },
  headline: {
    text: "Sample Headline",
    fontSize: 24,
    position: { x: 0, y: 100 },
  },
};

app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let updatedLayout = JSON.parse(JSON.stringify(currentLayout));

  if (userMessage.includes("9:16")) {
    updatedLayout.artboard.width = 1080;
    updatedLayout.artboard.height = 1920;
  }

  if (userMessage.includes("bigger")) {
    updatedLayout.headline.fontSize += 4;
  }

  if (userMessage.includes("smaller")) {
    updatedLayout.headline.fontSize -= 4;
  }

  if (userMessage.includes("top")) {
    updatedLayout.headline.position.y = 20;
  }

  currentLayout = updatedLayout;

  res.json({ updatedLayout });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});