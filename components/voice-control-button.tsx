"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { voiceAssistant } from "@/lib/voice-assistant"

interface VoiceControlButtonProps {
  onSpeak: () => Promise<void>
  isDisabled?: boolean
}

export function VoiceControlButton({ onSpeak, isDisabled = false }: VoiceControlButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported] = useState(voiceAssistant.isVoiceSupported())

  const handleSpeak = async () => {
    if (!isSupported) return

    if (isSpeaking) {
      voiceAssistant.stop()
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)
      try {
        await onSpeak()
      } finally {
        setIsSpeaking(false)
      }
    }
  }

  if (!isSupported) return null

  return (
    <Button
      onClick={handleSpeak}
      disabled={isDisabled}
      variant={isSpeaking ? "default" : "outline"}
      size="sm"
      className="gap-2"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          Stop Speaking
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          Speak Results
        </>
      )}
    </Button>
  )
}
