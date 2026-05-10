import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const NutritionChart = ({ protein, carbs, fats }: { protein: number, carbs: number, fats: number }) => {

    const total = protein + carbs + fats

    const data = {
        labels: ["Carbs", "Protein", "Fat"],
        datasets: [
            {
                // filled portion
                data: [
                    (carbs / total) * 100,
                    (protein / total) * 100,
                    (fats / total) * 100
                ],
                backgroundColor: ["#4A90D9", "#4CAF50", "#F5A623"],
                borderRadius: 20,
                barThickness: 8,
                borderSkipped: false,
            },
            {
                // unfilled background portion
                data: [
                    100 - (carbs / total) * 100,
                    100 - (protein / total) * 100,
                    100 - (fats / total) * 100
                ],
                backgroundColor: "#F5DEB3",
                borderRadius: 20,
                barThickness: 8,
                borderSkipped: false,
            }
        ]
    }

    const options = {
        indexAxis: "y" as const,
        responsive: true,
        stacked: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => ctx.datasetIndex === 0 ? `${Math.round(ctx.raw)}%` : ""
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                display: false,
                max: 100,
            },
            y: {
                stacked: true,
                grid: { display: false },
                border: { display: false },
                ticks: {
                    font: { size: 13 },
                    color: "#1A1A1A",
                    padding: 10 
                }
            }
        },
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                right: 50
            }
        },
        categoryPercentage: 0.2,  // 👈 smaller = more space between bars
        barPercentage: 2.0
    }

    // percentage labels on the right
    const plugins = [{
        id: "percentageLabel",
        afterDraw(chart: any) {
            const { ctx, chartArea: { right }, scales: { y } } = chart
            ctx.save()

            const percentages = [
                Math.round((carbs / total) * 100),
                Math.round((protein / total) * 100),
                Math.round((fats / total) * 100)
            ]

            percentages.forEach((pct, i) => {
                const yPos = y.getPixelForValue(i)
                // filled %
                ctx.font = "bold 13px sans-serif"
                ctx.fillStyle = "#1A1A1A"
                ctx.textAlign = "left"
                ctx.fillText(`${pct}%`, right + 10, yPos + 5)

            })

            ctx.restore()
        }
    }]
    return (
        <div style={{ width: "100%", height: "150px", position: "relative", minWidth: 0 }}>
            <Bar
                data={data}
                options={{
                    ...options,
                    maintainAspectRatio: false,
                    responsive: true,
                }}
                plugins={plugins}
            />
        </div>
    )
}

export default NutritionChart