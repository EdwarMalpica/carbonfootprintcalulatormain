"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Car, Bus } from "lucide-react"
import type { TransportationData } from "@/lib/types"

interface TransportationFormProps {
  data: TransportationData
  onChange: (data: Partial<TransportationData>) => void
  onNext: () => void
}

export default function TransportationForm({ data, onChange, onNext }: TransportationFormProps) {
  const [formData, setFormData] = useState<TransportationData>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (field: keyof TransportationData, value: number) => {
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
          <Car className="h-6 w-6" /> Transportation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us about your transportation habits to calculate your carbon footprint.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="carMileage" className="text-base dark:text-gray-200">
            Annual car mileage (miles)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.carMileage.toLocaleString()} miles</div>
            <Slider
              id="carMileage"
              min={0}
              max={50000}
              step={100}
              value={[formData.carMileage]}
              onValueChange={(value) => handleChange("carMileage", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>25,000</span>
              <span>50,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="carEfficiency" className="text-base dark:text-gray-200">
            Car fuel efficiency (MPG)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">{formData.carEfficiency} MPG</div>
            <Slider
              id="carEfficiency"
              min={10}
              max={60}
              step={1}
              value={[formData.carEfficiency]}
              onValueChange={(value) => handleChange("carEfficiency", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10</span>
              <span>35</span>
              <span>60</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="publicTransport" className="flex items-center gap-2 text-base dark:text-gray-200">
            <Bus className="h-4 w-4" /> Public transportation (miles per year)
          </Label>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formData.publicTransport.toLocaleString()} miles
            </div>
            <Slider
              id="publicTransport"
              min={0}
              max={10000}
              step={100}
              value={[formData.publicTransport]}
              onValueChange={(value) => handleChange("publicTransport", value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>5,000</span>
              <span>10,000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
          Next
        </Button>
      </div>
    </div>
  )
}

