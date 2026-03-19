import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import retentionRoutes from "./server/routes/retentionRoutes";
import cognitiveRoutes from "./server/routes/cognitiveRoutes";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes (AI Engine & Logic) ---
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", engine: "NALS Cognitive Engine v1.0" });
  });

  app.use("/api/ai", retentionRoutes);
  app.use("/api/cognitive", cognitiveRoutes);

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NALS Server running on http://localhost:${PORT}`);
  });
}

startServer();
