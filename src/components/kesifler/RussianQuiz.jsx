'use client'

import { useState, useEffect } from 'react'
import { russianPhrases } from '@/data/russian'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

// Helper: Random 10 soru seç ve 4 seçenekli quiz oluştur
function generateQuestions(data, mode = 'ru-to-tr') {
  const shuffled = [...data].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, 10)

  const isRussianToTurkish = mode === 'ru-to-tr'

  return selected.map((item) => {
    const correct = isRussianToTurkish ? item.turkish : item.russian

    // Aynı tipten farklı 3 yanlış cevap bul
    const sameType = data.filter(
      (r) => r.id !== item.id && r.type === item.type
    )
    const wrongAnswers =
      sameType.length >= 3
        ? sameType
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((r) => (isRussianToTurkish ? r.turkish : r.russian))
        : // Eğer aynı tipten 3 tane yoksa, genel datadan al
          data
            .filter((r) => r.id !== item.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((r) => (isRussianToTurkish ? r.turkish : r.russian))

    // Tüm seçenekleri shuffle
    const options = [correct, ...wrongAnswers].sort(() => Math.random() - 0.5)

    // Her seçeneğe karşılık gelen tam veriyi bul
    const optionsData = options.map((opt) =>
      data.find((r) =>
        isRussianToTurkish ? r.turkish === opt : r.russian === opt
      )
    )

    return {
      id: item.id,
      question: isRussianToTurkish ? item.russian : item.turkish,
      pronunciation: item.pronunciation,
      correctAnswer: correct,
      options: options,
      fullData: item,
      optionsData: optionsData,
      mode: mode,
    }
  })
}

export default function RussianQuiz() {
  const [mode, setMode] = useState('ru-to-tr') // 'ru-to-tr' or 'tr-to-ru'
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Component mount olduğunda soruları oluştur
  useEffect(() => {
    setQuestions(generateQuestions(russianPhrases, mode))
  }, [])

  // Mode değiştir ve testi yenile
  const handleModeChange = (newMode) => {
    setMode(newMode)
    setQuestions(generateQuestions(russianPhrases, newMode))
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  // Yeni test başlat
  const restartQuiz = () => {
    setQuestions(generateQuestions(russianPhrases, mode))
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  // Cevap seçimi
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return // Zaten seçilmiş

    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  // Sonraki soru
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  // Loading state
  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">Sorular hazırlanıyor...</div>
        </Card>
      </div>
    )
  }

  const current = questions[currentQuestion]
  const percentage = Math.round((score / questions.length) * 100)

  // Sonuç ekranı
  if (quizCompleted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center sm:p-8">
            <div className="mb-4 text-6xl">🎉</div>
            <h2 className="mb-2 text-2xl font-bold">Test Tamamlandı!</h2>
            <div className="mt-6 text-5xl font-bold text-primary">
              {score} / {questions.length}
            </div>
            <div className="mt-2 text-muted-foreground">Doğru Cevap</div>
            <div className="mt-6">
              <Badge variant="outline" className="px-4 py-2 text-lg">
                📊 Başarı Oranı: %{percentage}
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 p-4 sm:p-6">
            <Button onClick={restartQuiz} className="flex-1" size="lg">
              <RotateCcw className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>
            <Button asChild variant="outline" className="flex-1" size="lg">
              <Link href="/kesifler">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfa
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h2 className="font-semibold">Rusça Test</h2>
              <p className="text-sm text-muted-foreground">
                Soru {currentQuestion + 1}/{questions.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/kesifler">
              <X className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Mode Tabs */}
        <div className="border-b bg-background px-3 py-3 sm:px-6">
          <div className="flex gap-2">
            <Button
              variant={mode === 'ru-to-tr' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleModeChange('ru-to-tr')}
              className="flex-1 text-xs sm:text-sm"
            >
              🇷🇺→🇹🇷 <span className="ml-1 hidden sm:inline">Rusça → Türkçe</span><span className="ml-1 sm:hidden">Ru→Tr</span>
            </Button>
            <Button
              variant={mode === 'tr-to-ru' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleModeChange('tr-to-ru')}
              className="flex-1 text-xs sm:text-sm"
            >
              🇹🇷→🇷🇺 <span className="ml-1 hidden sm:inline">Türkçe → Rusça</span><span className="ml-1 sm:hidden">Tr→Ru</span>
            </Button>
          </div>
        </div>

        {/* Question */}
        <div className="p-4 sm:p-8">
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2 text-xs text-muted-foreground sm:text-sm">
              {mode === 'ru-to-tr'
                ? 'Aşağıdaki kelimenin Türkçe karşılığı nedir?'
                : 'Aşağıdaki kelimenin Rusça karşılığı nedir?'}
            </div>
            <div className="text-2xl font-bold sm:text-4xl">{current.question}</div>
            {mode === 'ru-to-tr' && (
              <div className="mt-2 text-sm text-muted-foreground">
                ({current.pronunciation})
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {current.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === current.correctAnswer
              const letter = String.fromCharCode(65 + index) // A, B, C, D

              let className = 'w-full justify-start text-left p-3 sm:p-4 h-auto text-sm sm:text-base'
              if (!showExplanation) {
                className += ' hover:bg-accent'
              } else if (isCorrect) {
                className += ' bg-green-500/10 border-green-500 border-2'
              } else if (isSelected && !isCorrect) {
                className += ' bg-red-500/10 border-red-500 border-2'
              } else {
                className += ' opacity-60'
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={className}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  <span className="mr-3 font-bold text-muted-foreground">
                    {letter})
                  </span>
                  <span className="flex-1">{option}</span>
                  {showExplanation && isCorrect && (
                    <span className="ml-2">✅</span>
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <span className="ml-2">❌</span>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Next Question Button - Shown after answer */}
          {showExplanation && (
            <div className="mt-6">
              <Button
                onClick={handleNextQuestion}
                className="w-full"
                size="lg"
              >
                {currentQuestion + 1 < questions.length
                  ? 'Sonraki Soru'
                  : 'Sonuçları Gör'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Explanation Panel */}
          {showExplanation && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-muted/50 p-4 sm:p-6">
                <div className="mb-4 text-center">
                  {selectedAnswer === current.correctAnswer ? (
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                      ✅ Doğru Cevap!
                    </div>
                  ) : (
                    <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                      ❌ Yanlış Cevap
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                    Tüm Seçenekler:
                  </h4>
                  <div className="space-y-3">
                    {current.options.map((option, index) => {
                      const data = current.optionsData[index]
                      const isCorrect = option === current.correctAnswer
                      const letter = String.fromCharCode(65 + index)

                      return (
                        <div
                          key={index}
                          className={`rounded-lg border p-3 ${
                            isCorrect
                              ? 'border-green-500 bg-green-500/5'
                              : 'border-border'
                          }`}
                        >
                          <div className="mb-1 flex items-start gap-2">
                            <span className="font-bold text-muted-foreground">
                              {letter})
                            </span>
                            <div className="flex-1">
                              <div className="font-semibold">
                                {data?.russian || '—'}
                                {isCorrect && (
                                  <span className="ml-2 text-green-600">✅</span>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {data?.pronunciation || '—'}
                              </div>
                              <div className="mt-1 text-sm">
                                {data?.turkish || '—'} / {data?.english || '—'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="border-t px-3 py-3 sm:px-6">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>İlerleme</span>
            <span>
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
