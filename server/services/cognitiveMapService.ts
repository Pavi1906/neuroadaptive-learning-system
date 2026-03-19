// Topic dependency graph + weakness propagation

export const topicGraph: Record<string, string[]> = {
  "Database Systems": ["DBMS Normalization", "Indexing", "B-Trees & Indexing"],
  "DBMS Normalization": ["Indexing", "B-Trees & Indexing"],
  "Indexing": ["B-Trees & Indexing"],
  "B-Trees & Indexing": [],
  "Artificial Intelligence": ["A* Search Algorithm", "Heuristics"],
  "A* Search Algorithm": ["Heuristics"],
  "Heuristics": [],
  "Web Engineering": ["React Hooks Lifecycle", "State Management"],
  "React Hooks Lifecycle": ["State Management"],
  "State Management": [],
  "Recursion": ["Dynamic Programming", "Divide and Conquer"],
  "Dynamic Programming": [],
  "Divide and Conquer": [],
  "OS Memory Paging": ["Virtual Memory"],
  "Virtual Memory": []
};

export function analyzeWeakness({ weakTopics }: { weakTopics: string[] }) {
  const impactedTopicsMap = new Map<string, { topic: string, risk: number, depth: number }>();
  const edges: { source: string, target: string }[] = [];

  const traverse = (topic: string, currentDepth: number) => {
    const dependencies = topicGraph[topic] || [];
    dependencies.forEach(dep => {
      const risk = Math.max(0.1, 0.9 - (currentDepth * 0.2));
      
      edges.push({ source: topic, target: dep });

      if (!impactedTopicsMap.has(dep) || impactedTopicsMap.get(dep)!.risk < risk) {
        impactedTopicsMap.set(dep, { topic: dep, risk: Number(risk.toFixed(2)), depth: currentDepth });
        traverse(dep, currentDepth + 1);
      }
    });
  };

  weakTopics.forEach(topic => {
    traverse(topic, 0);
  });

  const uniqueEdges = Array.from(new Set(edges.map(e => JSON.stringify(e)))).map(e => JSON.parse(e));

  return {
    impactedTopics: Array.from(impactedTopicsMap.values()).sort((a, b) => b.risk - a.risk),
    edges: uniqueEdges
  };
}
