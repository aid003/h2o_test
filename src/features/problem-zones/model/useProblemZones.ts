import { useState, useEffect } from "react";
import { fetchProblemZones } from "../api/getProblemZones";
import { Operation } from "@/entities/operation/model/types";

export interface ProblemZone extends Operation {
  severity: "medium" | "high";
}

export function useProblemZones(params: {
  range?: "Неделя" | "Месяц" | "Год";
  division?: "B2B" | "B2C";
}) {
  const [zones, setZones] = useState<ProblemZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchProblemZones(params)
      .then(data => {
        const mapped = data.map<ProblemZone>(op => ({
          ...op,
          severity: op.amount > 50000 ? "high" : "medium",
        }));
        setZones(mapped);
      })
      .catch(err => {
        console.error("fetchProblemZones failed:", err);
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setIsLoading(false));
  }, [params.range, params.division]);

  return { zones, isLoading, error };
}
