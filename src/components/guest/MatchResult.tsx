"use client";

import { CircleCheck, CircleAlert, CircleX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { evaluateMatch } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface MatchResultProps {
  sampledColor: string;
  allowedColors: string[];
}

const config = {
  good: {
    icon: CircleCheck,
    badgeClass: "bg-green-100 text-green-800 border-green-200",
    cardClass: "border-green-200 bg-green-50/50",
    swatchRing: "ring-green-400",
  },
  ask: {
    icon: CircleAlert,
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    cardClass: "border-amber-200 bg-amber-50/50",
    swatchRing: "ring-amber-400",
  },
  no: {
    icon: CircleX,
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    cardClass: "border-red-200 bg-red-50/50",
    swatchRing: "ring-red-400",
  },
};

export function MatchResult({ sampledColor, allowedColors }: MatchResultProps) {
  const result = evaluateMatch(sampledColor, allowedColors);
  const { level, message, closestColor } = result;
  const { icon: Icon, badgeClass, cardClass, swatchRing } = config[level];

  return (
    <Card className={cn("transition-all duration-300 animate-fade-in-up", cardClass)}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <Icon className="h-10 w-10" />
          <Badge
            variant="outline"
            className={cn("text-base px-4 py-1.5 font-medium", badgeClass)}
          >
            {message}
          </Badge>

          <div className="flex items-center gap-4 mt-2">
            <div className="text-center">
              <div
                className={cn("w-12 h-12 rounded-full border-2 mx-auto ring-2", swatchRing)}
                style={{ backgroundColor: sampledColor }}
              />
              <span className="text-xs text-muted-foreground font-mono mt-1 block">
                Your pick
              </span>
            </div>
            <span className="text-muted-foreground text-sm">vs</span>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full border-2 mx-auto"
                style={{ backgroundColor: closestColor }}
              />
              <span className="text-xs text-muted-foreground font-mono mt-1 block">
                Closest
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
