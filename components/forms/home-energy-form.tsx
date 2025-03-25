"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Home, Zap } from "lucide-react"
import type { HomeEnergyData } from "@/lib/types"

interface HomeEnergyFormProps {
  data: HomeEnergyData
  onChange: (data: Partial<HomeEnergyData>) => void
  onNext: () => void
  onBack: () => void
}

export default function HomeEnergyForm({ data, onChange, onNext, onBack }: HomeEnergyFormProps) {
  const [formData, setFormData] = useState<HomeEnergyData>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (field: keyof HomeEnergyData, value: number) => {
    const validValue = Math.max(0, value)
    const newData = { ...formData, [field]: validValue }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Home className="h-6 w-6" /> Home Energy
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about your home energy usage to calculate your carbon footprint.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="electricityUsage" className="flex items-center gap-2 text-base dark:text-gray-200">
            <Zap className="h-4 w-4" /> Monthly electricity usage (kWh)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.electricityUsage} kWh</div>
            <Slider
              id="electricityUsage"
              min={0}
              max={1000}
              step={10}
              value={[formData.electricityUsage]}
              onValueChange={(value) => handleChange("electricityUsage", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="renewablePercentage" className="text-base dark:text-gray-200">
            Percentage of renewable energy (%)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.renewablePercentage}%</div>
            <Slider
              id="renewablePercentage"
              min={0}
              max={100}
              step={5}
              value={[formData.renewablePercentage]}
              onValueChange={(value) => handleChange("renewablePercentage", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full gap-4">
        <Button variant="outline" onClick={onBack} className="dark:border-gray-600 dark:text-gray-200 w-full sm:w-auto">
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

