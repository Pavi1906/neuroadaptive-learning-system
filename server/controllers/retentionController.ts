import { Request, Response } from 'express';
import { calculateRetention, updateLambda } from '../services/retentionService';
import { predictRevision, calculateConfidence } from '../services/predictionService';

export const processTopic = async (req: Request, res: Response) => {
  try {
    const {
      topic,
      lastStudied,
      currentTime,
      lambda,
      performance,
      attempts,
      variance
    } = req.body;

    const timeGap =
      (new Date(currentTime).getTime() - new Date(lastStudied).getTime()) /
      (1000 * 60 * 60 * 24); // days

    const retention = calculateRetention({
      lambda,
      timeGap,
      performance
    });

    const updatedLambda = updateLambda({
      currentLambda: lambda,
      performance
    });

    const revision = predictRevision({ retention });

    const confidence = calculateConfidence({
      attempts,
      variance
    });

    return res.json({
      topic,
      retention,
      updatedLambda,
      revision,
      confidence,
      timeGap
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI Engine Error" });
  }
};
