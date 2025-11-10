export interface VoiceOptions {
  rate?: number
  pitch?: number
  volume?: number
}

class VoiceAssistant {
  private synth: SpeechSynthesis | null = null
  private isSupported = false

  constructor() {
    if (typeof window !== "undefined") {
      this.synth = window.speechSynthesis
      this.isSupported = !!this.synth
    }
  }

  /**
   * Speak the health score and key information
   */
  async speakHealthScore(
    productName: string,
    healthScore: number,
    riskLevel: string,
    accuracy: number,
    options?: VoiceOptions,
  ): Promise<void> {
    if (!this.isSupported) {
      console.warn("Speech synthesis not supported in this browser")
      return
    }

    const riskDescription = this.getRiskDescription(riskLevel)
    const text = `${productName} has a health score of ${healthScore} out of 100. Risk level is ${riskDescription}. 
    This prediction has ${accuracy} percent accuracy. ${this.getScoreInterpretation(healthScore)}`

    await this.speak(text, options)
  }

  /**
   * Speak recommendations
   */
  async speakRecommendations(recommendations: string[], options?: VoiceOptions): Promise<void> {
    if (!this.isSupported || recommendations.length === 0) return

    const text = `Here are the recommendations: ${recommendations.join(". ")}`
    await this.speak(text, options)
  }

  /**
   * Speak allergen warnings
   */
  async speakAllergens(allergens: string[], options?: VoiceOptions): Promise<void> {
    if (!this.isSupported || allergens.length === 0) return

    const text = `Warning: This product contains ${allergens.join(", ")}`
    await this.speak(text, options)
  }

  /**
   * Speak nutrition summary
   */
  async speakNutritionSummary(
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    options?: VoiceOptions,
  ): Promise<void> {
    if (!this.isSupported) return

    const text = `Nutrition facts: ${calories} calories, ${protein} grams of protein, ${carbs} grams of carbohydrates, and ${fat} grams of fat per serving.`
    await this.speak(text, options)
  }

  /**
   * Generic speak method
   */
  async speak(text: string, options?: VoiceOptions): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isSupported || !this.synth) {
        resolve()
        return
      }

      // Cancel any ongoing speech
      this.synth.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = options?.rate || 1
      utterance.pitch = options?.pitch || 1
      utterance.volume = options?.volume || 1

      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()

      this.synth.speak(utterance)
    })
  }

  /**
   * Stop speaking
   */
  stop(): void {
    if (this.isSupported && this.synth) {
      this.synth.cancel()
    }
  }

  /**
   * Check if voice is supported
   */
  isVoiceSupported(): boolean {
    return this.isSupported
  }

  private getRiskDescription(riskLevel: string): string {
    switch (riskLevel) {
      case "low":
        return "low risk"
      case "medium":
        return "medium risk"
      case "high":
        return "high risk"
      default:
        return "unknown"
    }
  }

  private getScoreInterpretation(score: number): string {
    if (score >= 80) return "This is an excellent choice for your health."
    if (score >= 60) return "This is a good option with decent nutritional value."
    if (score >= 40) return "This product has some nutritional concerns."
    return "This product has significant nutritional concerns. Consider healthier alternatives."
  }
}

export const voiceAssistant = new VoiceAssistant()
