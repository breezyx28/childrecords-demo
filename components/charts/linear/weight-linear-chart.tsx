"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import "@/styles/charts/charts.css";
import {
  useGetLogsQuery,
  useGetWeightQuery,
} from "@/redux/endpoints/growth-chart";
import React, { useMemo } from "react";
import { handelChartConfig } from "../logic/handle-chart-data";
import { generateChartData } from "../logic/generate-chart-data";

export default function WeightLinearChart() {
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [linesType, setLinesType] = React.useState<
    "basis" | "monotone" | "natural"
  >("basis");

  const { data } = useGetWeightQuery({});
  const { data: logs, isLoading, isFetching } = useGetLogsQuery({});

  const dataLength = React.useMemo(() => {
    return (data?.classifications?.P3?.data?.length ?? 0) as number;
  }, [data]);

  const currentChildAge = data?.child?.current?.age || 0; // Age in months
  const isUnderTwoYears = currentChildAge < 24;

  const ticks = React.useMemo(() => {
    if (isUnderTwoYears) {
      return Array.from({ length: 14 }, (_, i) => i * 2); // its should start from 0 not 1
    } else {
      return Array.from(
        { length: Math.ceil(dataLength / 12) + 1 },
        (_, i) => i * 12
      );
    }
  }, [isUnderTwoYears, dataLength]);

  React.useEffect(() => {
    if (data?.classifications) {
      setChartConfig(handelChartConfig(data));
      setChartData(
        generateChartData(
          data,
          isUnderTwoYears ? Math.min(dataLength, 25) : dataLength
        )
      );
    } else {
      setChartData([]);
    }
  }, [data, isUnderTwoYears, dataLength, logs]);

  const tickFormatter = (tick: number) => {
    if (isUnderTwoYears) {
      return `${tick}`;
    } else {
      return `${tick / 12}`;
    }
  };

  // Find the maximum points for each dataKey
  const maxPoints = React.useMemo(() => {
    const dataKeys = ["P97", "P85", "P50", "P15", "P3"];
    const maxValues: { [key: string]: number } = {};
    if (chartData.length === 0) {
      dataKeys.forEach((k) => (maxValues[k] = 0));
      return maxValues;
    }
    dataKeys.forEach((key) => {
      const vals = chartData.map((item) => item[key]).filter((v): v is number => v != null);
      maxValues[key] = vals.length ? Math.max(...vals) : 0;
    });
    return maxValues;
  }, [chartData]);

  // Prepare ticks and labels for the right Y-axis
  const rightYAxisTicks = Object.values(maxPoints);
  const rightYAxisLabels = Object.keys(maxPoints);

  // Sort both arrays based on the tick values (descending order)
  const sortedIndices = rightYAxisTicks
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)
    .map((item) => item.index);

  const sortedRightYAxisTicks = sortedIndices.map((i) => rightYAxisTicks[i]);
  const sortedRightYAxisLabels = sortedIndices.map((i) => rightYAxisLabels[i]);

  // Custom tick component with defined props interface
  interface CustomTickProps {
    x: number;
    y: number;
    payload: { value: number };
  }

  const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload }) => {
    const index = sortedRightYAxisTicks.findIndex((tick) => {
      return tick === payload.value;
    });

    if (index === -1) {
      return null;
    }

    const label = sortedRightYAxisLabels[index];
    const color = chartConfig[label]?.color || "black";

    return (
      <text
        x={x}
        y={y}
        fill={`currentColor`}
        className={`!fill-current font-bold`}
        textAnchor="start"
        dy={-2}
        style={{ color: color }}
      >
        {label.toString().replace("P", "").concat("th")}
      </text>
    );
  };

  return (
    <div className="flex flex-col gap-y-[1rem]">
      <Card>
        <CardHeader>
          <CardTitle>Growth Chart</CardTitle>
          <CardDescription>
            Weight Percentiles ({isUnderTwoYears ? "Months" : "Years"})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px] md:min-w-full">
              <ChartContainer
                config={chartConfig}
                className="md:w-full w-auto min-h-[500px]"
              >
                <LineChart
                  data={chartData}
                  margin={{
                    left: 20,
                    right: 50,
                    top: 15,
                    bottom: 50,
                  }}
                >
                  <CartesianGrid
                    stroke="#E2E6ED"
                    strokeDasharray="4 4"
                    horizontal
                    vertical
                  />
                  <XAxis
                    dataKey="age"
                    interval={0}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    ticks={ticks}
                    tickFormatter={tickFormatter}
                    label={{
                      value: isUnderTwoYears ? "Age (Months)" : "Age (Years)",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    label={{
                      value: "Weight (kg)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    interval={0}
                    tickLine={false}
                    axisLine={false}
                    ticks={sortedRightYAxisTicks}
                    tick={<CustomTick x={0} y={0} payload={{ value: 0 }} />}
                  />

                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const hoveredPoint = payload[0].payload;
                        const ageInMonths = hoveredPoint.age;
                        const years = Math.floor(ageInMonths / 12);
                        const months = ageInMonths % 12;
                        const ageDisplay =
                          years > 0 ? `${years}y/${months}m` : `${months}m`;

                        return (
                          <div className="bg-white p-2 shadow-lg rounded-md !text-[12px]">
                            <div>
                              <strong>Age:</strong> {ageDisplay}
                            </div>
                            {payload.map((data, index) => (
                              <div key={index} style={{ color: data.color }}>
                                <strong>
                                  {data.name !== "current"
                                    ? data.name
                                        ?.toString()
                                        .replace("P", "")
                                        .concat("th")
                                    : data.name}
                                  :
                                </strong>{" "}
                                {data.value}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    dataKey="P97"
                    type={linesType}
                    stroke={chartConfig?.P97?.color}
                    strokeWidth={2}
                    dot={false}
                    yAxisId="left"
                  />
                  <Line
                    dataKey="P85"
                    type={linesType}
                    stroke={chartConfig?.P85?.color}
                    strokeWidth={2}
                    dot={false}
                    yAxisId="left"
                  />
                  <Line
                    dataKey="P50"
                    type={linesType}
                    stroke={chartConfig?.P50?.color}
                    strokeWidth={2}
                    dot={false}
                    yAxisId="left"
                  />
                  <Line
                    dataKey="P15"
                    type={linesType}
                    stroke={chartConfig?.P15?.color}
                    strokeWidth={2}
                    dot={false}
                    yAxisId="left"
                  />
                  <Line
                    dataKey="P3"
                    type={linesType}
                    stroke={chartConfig?.P3?.color}
                    strokeWidth={2}
                    dot={false}
                    yAxisId="left"
                  />

                  <Line
                    dataKey={"current"}
                    type={"basis"}
                    stroke={chartConfig?.current?.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    yAxisId={"left"}
                    // data={[
                    //   {
                    //     age: 5,
                    //     P97: null,
                    //     P85: null,
                    //     P50: null,
                    //     P15: null,
                    //     P3: null,
                    //     current: 53,
                    //   },
                    // ]}
                  />

                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="text-[18px] font-[800] leading-[24.55px]">
                Important Note
              </div>
              <div className="flex items-center gap-2 leading-[18.2px] text-black/90">
                {` Weight-for-age isn’t tracked beyond age 10 since it can’t distinguish between height and weight changes during puberty, leading to inaccurate results.`}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
