import React, { useEffect, useState } from "react";
import { BrainCircuit, AlertCircle } from "lucide-react";
import { ReactFlow, Background, Controls, Node, Edge, MarkerType } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

interface ImpactedTopic {
  topic: string;
  risk: number;
  depth: number;
}

interface CognitiveData {
  weakTopics: string[];
  impactedTopics: ImpactedTopic[];
  edges: { source: string; target: string }[];
  insight: string;
}

export default function CognitiveMap({ weakTopics }: { weakTopics: string[] }) {
  const [data, setData] = useState<CognitiveData | null>(null);

  useEffect(() => {
    if (weakTopics.length === 0) return;
    
    fetch("/api/cognitive/map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weakTopics })
    })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, [weakTopics]);

  if (!data) return (
    <div className="p-6 border-2 border-dashed border-border bg-surface rounded-sm flex items-center justify-center h-40">
      <p className="text-text-secondary font-mono text-sm animate-pulse">Analyzing cognitive dependencies...</p>
    </div>
  );

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Create nodes for weak topics
  data.weakTopics.forEach((topic, idx) => {
    nodes.push({
      id: topic,
      position: { x: 50, y: 50 + idx * 100 },
      data: { label: topic },
      style: { 
        background: '#ef4444', 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        padding: '10px 16px', 
        fontSize: '12px', 
        fontWeight: 'bold',
        boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)'
      }
    });
  });

  // Create nodes for impacted topics
  data.impactedTopics.forEach((impacted, idx) => {
    const riskColor = impacted.risk > 0.7 ? '#f97316' : impacted.risk > 0.4 ? '#eab308' : '#3b82f6';
    nodes.push({
      id: impacted.topic,
      position: { x: 300 + (impacted.depth * 250), y: 50 + idx * 100 },
      data: { 
        label: (
          <div className="flex flex-col items-center gap-1">
            <span className="font-medium">{impacted.topic}</span>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-mono">
              Risk: {(impacted.risk * 100).toFixed(0)}%
            </span>
          </div>
        )
      },
      style: { 
        background: riskColor, 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        padding: '8px 16px', 
        fontSize: '12px',
        boxShadow: `0 4px 6px -1px ${riskColor}40`
      }
    });
  });

  // Create edges
  data.edges.forEach((edge, idx) => {
    edges.push({
      id: `e-${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#f59e0b',
      },
    });
  });

  return (
    <div className="p-6 border border-border bg-surface rounded-sm">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-medium text-text-primary">Cognitive Impact Map</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-background border border-border rounded-sm">
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Detected Weaknesses</p>
          <div className="flex flex-wrap gap-2">
            {data.weakTopics.map(t => (
              <span key={t} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-full font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-background border border-border rounded-sm">
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">At-Risk Dependencies</p>
          <div className="flex flex-wrap gap-2">
            {data.impactedTopics.length > 0 ? data.impactedTopics.map(t => (
              <span key={t.topic} className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs rounded-full flex items-center gap-1">
                {t.topic}
                <span className="opacity-60 text-[10px]">({(t.risk * 100).toFixed(0)}%)</span>
              </span>
            )) : <span className="text-xs text-text-secondary">No dependent topics at risk.</span>}
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full border border-border rounded-sm overflow-hidden bg-background mb-6">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          fitView 
          attributionPosition="bottom-right"
        >
          <Background color="#333" gap={16} />
          <Controls className="bg-surface border-border fill-text-primary" />
        </ReactFlow>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-sm bg-amber-500/5 border border-amber-500/10">
        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
        <p className="text-sm text-amber-600 dark:text-amber-200/80 leading-relaxed">
          <strong className="text-amber-500 dark:text-amber-400">System Insight:</strong> {data.insight}
        </p>
      </div>
    </div>
  );
}

