"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Beef, Trash2 } from "lucide-react"
import type { FoodData } from "@/lib/types"

interface FoodConsumptionFormProps {
  data: FoodData
  onChange: (data: Partial<FoodData>) => void
  onCalculate: () => void
  onBack: () => void
}

export default function FoodConsumptionForm({ data, onChange, onCalculate, onBack }: FoodConsumptionFormProps) {
  const [formData, setFormData] = useState<FoodData>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (field: keyof FoodData, value: number) => {
    // Ensure value is not negative
    const validValue = Math.max(0, value)
    const newData = { ...formData, [field]: validValue }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Beef className="h-6 w-6" /> Food Consumption
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about your food habits to calculate your carbon footprint.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="meatConsumption" className="flex items-center gap-2 text-base dark:text-gray-200">
            <Beef className="h-4 w-4" /> Meat consumption (servings per week)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.meatConsumption} servings</div>
            <Slider
              id="meatConsumption"
              min={0}
              max={21}
              step={1}
              value={[formData.meatConsumption]}
              onValueChange={(value) => handleChange("meatConsumption", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>10</span>
              <span>21</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="foodWaste" className="flex items-center gap-2 text-base dark:text-gray-200">
            <Trash2 className="h-4 w-4" /> Food waste percentage (%)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.foodWaste}%</div>
            <Slider
              id="foodWaste"
              min={0}
              max={50}
              step={1}
              value={[formData.foodWaste]}
              onValueChange={(value) => handleChange("foodWaste", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="dark:border-gray-600 dark:text-gray-200">
          Back
        </Button>
        <Button
          onClick={onCalculate}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
        >
          Calculate Footprint
        </Button>
      </div>
    </div>
  )
}

