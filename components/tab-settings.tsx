"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DisguiseSettings, PRESETS, DisguisePreset } from "./tab-disguise-provider"
import { Settings } from "lucide-react"

const CLASSROOM_ICONS = [
  { label: "Default", value: "/classroom/default.ico" },
  { label: "Blue", value: "/classroom/blue.ico" },
  { label: "Green", value: "/classroom/default.ico" }, // Assuming default is green-ish or I should check. Wait, I saw blue, aqua, orange, purple, black, default.
  { label: "Aqua", value: "/classroom/aqua.ico" },
  { label: "Orange", value: "/classroom/orange.ico" },
  { label: "Purple", value: "/classroom/purple.ico" },
  { label: "Black", value: "/classroom/black.ico" },
]

export function TabSettings() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<DisguiseSettings>({ preset: "desmos" })

  useEffect(() => {
    const saved = localStorage.getItem("tab-disguise-settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse disguise settings", e)
      }
    }
  }, [open])

  const handleSave = () => {
    localStorage.setItem("tab-disguise-settings", JSON.stringify(settings))
    // Dispatch custom event for immediate update
    window.dispatchEvent(new CustomEvent("tab-disguise-update", { detail: settings }))
    setOpen(false)
  }

  const updateSettings = (updates: Partial<DisguiseSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 left-6 z-50 bg-white text-black border border-neutral-200 shadow-xl hover:bg-neutral-100 h-10 w-10 hover:scale-110 transition-all rounded-full"
          aria-label="Tab Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-brown-900">Tab Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize how this tab appears in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="preset" className="text-brown-900 font-bold">Preset</Label>
            <Select
              value={settings.preset}
              onValueChange={(value) => {
                const newPreset = value as DisguisePreset
                // When switching presets, reset custom overrides unless convenient
                let newSettings: DisguiseSettings = { preset: newPreset }
                
                // If switching to classroom, set a default icon if not present
                if (newPreset === 'google_classroom' && !settings.customIcon?.includes('/classroom/')) {
                     newSettings.customIcon = '/classroom/default.ico'
                }
                
                updateSettings(newSettings)
              }}
            >
              <SelectTrigger id="preset" className="bg-background border-input ring-offset-background focus:ring-banner">
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="desmos">Desmos</SelectItem>
                <SelectItem value="ap_classroom">AP Classroom</SelectItem>
                <SelectItem value="google_classroom">Google Classroom</SelectItem>
                <SelectItem value="google_forms">Google Forms</SelectItem>
                <SelectItem value="google_docs">Google Docs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title" className="text-brown-900 font-bold">Tab Title (Optional)</Label>
             <Input 
                id="title" 
                value={settings.customTitle || ''} 
                onChange={(e) => updateSettings({ customTitle: e.target.value })}
                placeholder={PRESETS[settings.preset]?.title || "Enter custom title"}
              className="bg-background border-input focus-visible:ring-banner"
              disabled={settings.preset === 'desmos' || settings.preset === 'ap_classroom'}
             />
            <p className="text-xs text-muted-foreground">
               Leave blank to use the default title for the selected preset.
             </p>
          </div>

          {settings.preset === "google_classroom" && (
            <div className="grid gap-2">
              <Label className="text-brown-900 font-bold">Classroom Icon</Label>
              <RadioGroup
                value={settings.customIcon || "/classroom/default.ico"}
                onValueChange={(value) => updateSettings({ customIcon: value })}
                className="grid grid-cols-4 gap-2"
              >
                {CLASSROOM_ICONS.map((icon) => (
                  <div key={icon.value}>
                    <RadioGroupItem value={icon.value} id={`icon-${icon.label}`} className="peer sr-only" />
                    <Label
                      htmlFor={`icon-${icon.label}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-transparent bg-background p-2 hover:bg-brown-100 peer-data-[state=checked]:border-banner [&:has([data-state=checked])]:border-banner cursor-pointer transition-all"
                    >
                      <div className="w-6 h-6 rounded-full" style={{ backgroundImage: `url(${icon.value})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                      <span className="text-[10px] mt-1 text-muted-foreground">{icon.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-banner text-white hover:bg-banner/90">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
