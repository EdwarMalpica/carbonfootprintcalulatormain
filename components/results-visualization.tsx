"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FootprintResults } from "@/lib/types"
import { Leaf, AlertTriangle, ThumbsUp, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"

interface ResultsVisualizationProps {
  results: FootprintResults
  onReset: () => void
}

export default function ResultsVisualization({ results, onReset }: ResultsVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to access theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !mounted) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Check if dark mode is active
    const isDarkMode = theme === "dark"

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Draw pie chart
    const centerX = canvasRef.current.width / 2
    const centerY = canvasRef.current.height / 2
    const radius = Math.min(centerX, centerY) - 10

    const data = [
      { label: "Transport", value: results.transportation, color: "#6ee7b7" },
      { label: "Energy", value: results.homeEnergy, color: "#60a5fa" },
      { label: "Food", value: results.food, color: "#f97316" },
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)
    let startAngle = 0

    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      // Draw label
      const labelAngle = startAngle + sliceAngle / 2
      const labelX = centerX + radius * 0.7 * Math.cos(labelAngle)
      const labelY = centerY + radius * 0.7 * Math.sin(labelAngle)

      // Use white text for dark mode, black for light mode
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(item.label, labelX, labelY)

      startAngle += sliceAngle
    })
  }, [results, theme, mounted])

  const getImpactLevel = () => {
    const total = results.total
    if (total < 5)
      return { level: "Low", color: "text-green-600 dark:text-green-400", icon: <ThumbsUp className="h-6 w-6" /> }
    if (total < 10)
      return {
        level: "Moderate",
        color: "text-yellow-600 dark:text-yellow-400",
        icon: <AlertTriangle className="h-6 w-6" />,
      }
    return { level: "High", color: "text-red-600 dark:text-red-400", icon: <AlertTriangle className="h-6 w-6" /> }
  }

  const impactLevel = getImpactLevel()

  if (!mounted) return null

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <Leaf className="h-5 w-5 sm:h-6 sm:w-6" /> Your Carbon Footprint Results
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Based on your responses, here's an estimate of your annual carbon footprint.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100 text-center">Carbon Breakdown</h3>
            <div className="flex justify-center">
              <canvas ref={canvasRef} width={200} height={200} className="max-w-full"></canvas>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100 text-center">Impact Summary</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between dark:text-gray-200 text-sm">
                  <span>Transportation</span>
                  <span>{results.transportation.toFixed(2)} tons CO₂e</span>
                </div>
                <Progress
                  value={(results.transportation / results.total) * 100}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                  indicatorClassName="bg-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between dark:text-gray-200 text-sm">
                  <span>Home Energy</span>
                  <span>{results.homeEnergy.toFixed(2)} tons CO₂e</span>
                </div>
                <Progress
                  value={(results.homeEnergy / results.total) * 100}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                  indicatorClassName="bg-blue-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between dark:text-gray-200 text-sm">
                  <span>Food</span>
                  <span>{results.food.toFixed(2)} tons CO₂e</span>
                </div>
                <Progress
                  value={(results.food / results.total) * 100}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                  indicatorClassName="bg-orange-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700 mt-4">
              <div className="flex justify-between items-center dark:text-gray-200 font-medium">
                <span className="text-base">Total Carbon</span>
                <span className="text-lg">{results.total.toFixed(2)} tons</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
              <div className={impactLevel.color}>{impactLevel.icon}</div>
              <div>
                <p className="font-medium dark:text-gray-200 text-sm">
                  Your impact level is <span className={`font-bold ${impactLevel.color}`}>{impactLevel.level}</span>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  The average American produces about 16 tons CO₂e per year
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onReset}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  )
}

