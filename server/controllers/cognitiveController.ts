import { Request, Response } from 'express';
import { analyzeWeakness } from '../services/cognitiveMapService';

export const getCognitiveMap = (req: Request, res: Response) => {
  try {
    const { weakTopics } = req.body;

    const { impactedTopics, edges } = analyzeWeakness({ weakTopics });

    res.json({
      weakTopics,
      impactedTopics,
      edges,
      insight: "Weak foundations detected affecting dependent topics. Review critical paths to prevent cascading knowledge decay."
    });
  } catch (err) {
    res.status(500).json({ error: "Cognitive Map Error" });
  }
};
