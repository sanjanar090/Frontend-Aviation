import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// Mock data for residual risk assessments
const riskData = [
  { id: "RA 03", name: "Aircraft services", current: 2400, residual: 50, target: 10 },
  { id: "RA 1", name: "Incorrect/ unserviceable tools usage", current: 2200, residual: 80, target: 20 },
  { id: "RA 10", name: "No hangar space available for planned base maintenance", current: 1800, residual: 1200, target: 40 },
  { id: "RA 11", name: "Incorrect manpower evaluation", current: 2300, residual: 150, target: 30 },
  { id: "RA 12", name: "Improper facility condition for planned maintenance", current: 1600, residual: 1300, target: 40 },
  { id: "RA 13", name: "Risk Relative Certification for Repainted Aircraft", current: 2100, residual: 120, target: 25 },
  { id: "RA 14", name: "Asbestos used in Aircraft", current: 2200, residual: 100, target: 15 },
  { id: "RA 15", name: "test2", current: 2400, residual: 200, target: 50 },
  { id: "RA 16", name: "Information Security", current: 2100, residual: 80, target: 18 },
];

const ResidualRiskView = () => {
  const maxValue = 2500;

  const getRiskColor = (value: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage > 80) return "hsl(0, 70%, 45%)"; // Red
    if (percentage > 60) return "hsl(25, 85%, 50%)"; // Orange
    if (percentage > 40) return "hsl(45, 90%, 50%)"; // Yellow
    return "hsl(120, 50%, 45%)"; // Green
  };

  return (
    <div className="space-y-6">
      {/* Department Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Department</label>
        <Select defaultValue="all">
          <SelectTrigger className="w-full max-w-md bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">(all)</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Risk Chart */}
      <Card className="p-6">
        <div className="space-y-1">
          {/* Scale Header */}
          <div className="flex justify-between text-xs text-gray-600 mb-2 px-1">
            <span>2,500</span>
            <span>2,000</span>
            <span>1,500</span>
            <span>1,000</span>
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>

          {/* Gradient Background Bar */}
          <div className="w-full h-6 mb-2 rounded" 
               style={{
                 background: 'linear-gradient(to right, hsl(0, 70%, 45%) 0%, hsl(25, 85%, 50%) 35%, hsl(45, 90%, 50%) 50%, hsl(120, 50%, 45%) 100%)'
               }}>
          </div>

          {/* Risk Assessment Bars */}
          <div className="space-y-2">
            {riskData.map((risk) => (
              <div key={risk.id} className="flex items-center gap-4">
                {/* Label */}
                <div className="w-64 flex-shrink-0 text-sm">
                  <span className="font-medium">{risk.id}</span> - {risk.name}
                </div>

                {/* Bar Container */}
                <div className="flex-1 relative h-8">
                  {/* Full gradient background */}
                  <div 
                    className="absolute inset-0 rounded"
                    style={{
                      background: 'linear-gradient(to right, hsl(0, 70%, 45%) 0%, hsl(25, 85%, 50%) 35%, hsl(45, 90%, 50%) 50%, hsl(120, 50%, 45%) 100%)'
                    }}
                  />

                  {/* Current risk marker (black line on left) */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-black z-10"
                    style={{ left: `${((maxValue - risk.current) / maxValue) * 100}%` }}
                  >
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-black rounded-full" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black rounded-full" />
                  </div>

                  {/* Residual risk area (yellow highlight if in middle range) */}
                  {risk.residual > 400 && (
                    <div 
                      className="absolute top-0 bottom-0 bg-yellow-400/40 rounded"
                      style={{ 
                        left: `${((maxValue - risk.residual) / maxValue) * 100}%`,
                        right: `${((maxValue - risk.residual + 200) / maxValue) * 100}%`
                      }}
                    />
                  )}

                  {/* Target risk marker (black diamond on right) */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${((maxValue - risk.target) / maxValue) * 100}%` }}
                  >
                    <div className="w-3 h-3 bg-black transform rotate-45 border-2 border-white" />
                  </div>

                  {/* Target value label */}
                  {risk.target > 30 && (
                    <div 
                      className="absolute -bottom-5 text-xs text-muted-foreground"
                      style={{ left: `${((maxValue - risk.target) / maxValue) * 100}%` }}
                    >
                      {risk.target}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResidualRiskView;
