"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { useEffect, useState } from "react"
import { useSelector} from "react-redux"
import { type RootState } from "@/state/store"
import { authClient } from "@/lib/auth-client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"





export function ScoreCard(props: { className: string }) {

    

    const chartConfig = {
        average: {
            label: "Average",
            color: "var(--chart-1)",
        },
        yours: {
            label: "Yours",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const defaultChartData = [
        { month: "Health", average: 0, yours: 0 },
        { month: "Chill", average: 0, yours: 0 },
        { month: "Bait", average: 0, yours: 0 },
        { month: "Learn", average: 0, yours: 0 },
        { month: "Fun", average: 0, yours: 0 },
        { month: "Feud", average: 0, yours: 0 },
    ];

    type ChartData = {
        month: string;
        average: number;
        yours: number;
    }[];

    const [chartData, setChartData] = useState<ChartData>([]);
     const [session, setSession] = useState<typeof authClient.$Infer.Session | null>(null);
     const [isPending, setIsPending] = useState(true);

    const reload = useSelector((data: RootState) => data.UserInputReducer.chartReload);

       useEffect(() => {
        authClient.getSession().then(({ data }) => {
          setSession(data);
          setIsPending(false);
        });
      }, []);

    useEffect(() => {
        if(!session)
            return
        const data = localStorage.getItem(`${session?.user.id}`);

        if (data) {
            const obj = JSON.parse(data) as ChartData;
            setChartData(obj);
        } else {
            setChartData(defaultChartData);
        }
    }, [reload, session]);

 
const date = new Date();

    return (
        <Card className={props.className}>
            <CardHeader className="items-center pb-4">
                <CardTitle className="text-blue-400 ">AI Powered Wellness Chart</CardTitle>
                <CardDescription className="text-neutral-400">
                    Score based on Channels
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62.5"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid radialLines={false} />
                        <Radar
                            dataKey="average"
                            fill="var(--color-average)"
                            fillOpacity={0}
                            stroke="var(--color-average)"
                            strokeWidth={2}
                        />
                        <Radar
                            dataKey="yours"
                            fill="var(--color-yours)"
                            fillOpacity={0}
                            stroke="var(--color-yours)"
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Data is not accurate, and can change.
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    {isPending ?  "Loading data....": date.getFullYear() }
                </div>
            </CardFooter>
        </Card>
    )
}
