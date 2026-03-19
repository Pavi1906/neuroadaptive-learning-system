import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const focusScore = Math.floor(Math.random() * 40) + 60; // 60–100
  const retentionRate = Math.floor(Math.random() * 30) + 50; // 50–80

  const recommendations = [
    "Revise Data Mining concepts within 24 hours for optimal retention.",
    "Focus on weak topics using spaced repetition.",
    "Take short breaks to improve cognitive performance.",
    "Practice previous questions to strengthen memory recall."
  ];

  const recommendation =
    recommendations[Math.floor(Math.random() * recommendations.length)];

  res.status(200).json({
    message: "Cognitive Analysis Complete",
    data: {
      focusScore,
      retentionRate,
      recommendation
    }
  });
}
