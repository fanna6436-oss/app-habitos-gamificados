"use client"

import { useState } from "react"
import { Check, ArrowRight, ArrowLeft, Target, CreditCard, Lock, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/components/custom/toast"

type Question = {
  id: number
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o seu maior desafio com hábitos atualmente?",
    options: [
      "Falta de motivação para começar",
      "Dificuldade em manter a consistência",
      "Não consigo acompanhar meu progresso",
      "Perco o interesse rapidamente"
    ]
  },
  {
    id: 2,
    question: "Quantos hábitos você gostaria de desenvolver?",
    options: [
      "1-3 hábitos (começar devagar)",
      "4-7 hábitos (rotina equilibrada)",
      "8-12 hábitos (transformação completa)",
      "Mais de 12 hábitos (mudança radical)"
    ]
  },
  {
    id: 3,
    question: "Qual área da sua vida você quer melhorar primeiro?",
    options: [
      "Saúde e bem-estar físico",
      "Produtividade e carreira",
      "Desenvolvimento pessoal",
      "Relacionamentos e vida social"
    ]
  },
  {
    id: 4,
    question: "O que mais te motiva a continuar?",
    options: [
      "Ver meu progresso visualmente",
      "Ganhar recompensas e conquistas",
      "Competir comigo mesmo",
      "Fazer parte de uma comunidade"
    ]
  },
  {
    id: 5,
    question: "Quanto tempo você pode dedicar aos seus hábitos diariamente?",
    options: [
      "15-30 minutos (rotina leve)",
      "30-60 minutos (rotina moderada)",
      "1-2 horas (rotina intensa)",
      "Mais de 2 horas (dedicação total)"
    ]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | "teams" | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
    showToast("Resposta salva!", "success")
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      showToast("Quiz completo! Veja seu plano recomendado.", "success")
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getRecommendedPlan = () => {
    const habitCount = answers[1]
    if (habitCount?.includes("1-3") || habitCount?.includes("começar devagar")) {
      return "free"
    } else if (habitCount?.includes("Mais de 12") || habitCount?.includes("mudança radical")) {
      return "pro"
    }
    return "pro"
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulação de processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false)
      showToast("Pagamento processado com sucesso! Bem-vindo ao plano " + (selectedPlan === "pro" ? "Pro" : "Equipes") + "!", "success")
      
      // Redirecionar para dashboard após 2 segundos
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const recommendedPlan = getRecommendedPlan()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 py-12 px-6">
        <ToastContainer />
        <div className="max-w-5xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-6 py-3 rounded-full font-bold mb-6">
              <Check className="w-5 h-5" />
              Quiz Completo!
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Seu Plano Personalizado
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Baseado nas suas respostas, recomendamos o plano ideal para você começar sua transformação
            </p>
          </div>

          {/* Recommended Plan Badge */}
          {!selectedPlan && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-6 py-4 rounded-2xl font-bold text-center mb-8 shadow-xl">
              🎯 Recomendamos o plano {recommendedPlan === "free" ? "Gratuito" : "Pro"} para você!
            </div>
          )}

          {/* Pricing Cards */}
          {!selectedPlan ? (
            <>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-8 py-3 rounded-full font-bold transition-all ${
                      billingCycle === "monthly"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-8 py-3 rounded-full font-bold transition-all ${
                      billingCycle === "yearly"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    Anual <span className="text-green-500 text-sm ml-2">-40%</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Free Plan */}
                <div className={`bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border-2 transition-all ${
                  recommendedPlan === "free" 
                    ? "border-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-800" 
                    : "border-gray-200 dark:border-gray-800"
                }`}>
                  {recommendedPlan === "free" && (
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold text-center mb-4">
                      RECOMENDADO PARA VOCÊ
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gratuito</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Para começar sua jornada</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">R$ 0</span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {["Até 5 hábitos", "Sistema de XP e níveis", "Streaks básicos", "Estatísticas simples"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan("free")
                      showToast("Plano Gratuito selecionado!", "info")
                    }}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    Escolher Gratuito
                  </button>
                </div>

                {/* Pro Plan */}
                <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl border-2 relative transform scale-105 ${
                  recommendedPlan === "pro" 
                    ? "border-yellow-400 ring-4 ring-yellow-200" 
                    : "border-indigo-400"
                }`}>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl">
                    {recommendedPlan === "pro" ? "PERFEITO PARA VOCÊ" : "MAIS POPULAR"}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <p className="text-indigo-100 mb-6">Para quem leva a sério</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">
                      R$ {billingCycle === "monthly" ? "19,90" : "11,90"}
                    </span>
                    <span className="text-indigo-100">/mês</span>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-indigo-200 mt-2">R$ 142,80 cobrado anualmente</p>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {["Hábitos ilimitados", "Missões épicas exclusivas", "Estatísticas avançadas", "Temas personalizados", "Avatares premium", "Suporte prioritário"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan("pro")
                      showToast("Plano Pro selecionado! Preencha os dados de pagamento.", "info")
                    }}
                    className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                  >
                    Escolher Pro
                  </button>
                  <p className="text-center text-indigo-100 text-sm mt-4">7 dias grátis, cancele quando quiser</p>
                </div>

                {/* Teams Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Equipes</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Para empresas e grupos</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      R$ {billingCycle === "monthly" ? "49,90" : "29,90"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Por usuário, mínimo 5</p>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {["Tudo do Pro", "Dashboard de equipe", "Competições internas", "Relatórios gerenciais", "Integração com Slack", "Gerente de conta dedicado"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan("teams")
                      showToast("Plano Equipes selecionado! Preencha os dados de pagamento.", "info")
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    Escolher Equipes
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Payment Form */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Finalizar Pagamento</h2>
                  <button 
                    onClick={() => {
                      setSelectedPlan(null)
                      showToast("Voltando para seleção de planos...", "info")
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Voltar
                  </button>
                </div>

                {/* Plan Summary */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        Plano {selectedPlan === "free" ? "Gratuito" : selectedPlan === "pro" ? "Pro" : "Equipes"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {billingCycle === "monthly" ? "Cobrança mensal" : "Cobrança anual"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        R$ {selectedPlan === "free" ? "0,00" : selectedPlan === "pro" ? (billingCycle === "monthly" ? "19,90" : "142,80") : (billingCycle === "monthly" ? "49,90" : "358,80")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {billingCycle === "yearly" ? "por ano" : "por mês"}
                      </p>
                    </div>
                  </div>
                  {selectedPlan === "pro" && (
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium">
                      ✨ 7 dias de teste grátis inclusos
                    </div>
                  )}
                </div>

                {selectedPlan !== "free" && (
                  <>
                    {/* Payment Form */}
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="João Silva"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            Validade
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <Lock className="w-5 h-5 text-green-500" />
                          <span>Pagamento 100% seguro e criptografado</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <span>Seus dados estão protegidos</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="w-5 h-5 text-indigo-500" />
                          <span>Cancele quando quiser, sem taxas</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          <>
                            Confirmar Pagamento
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                      Ao confirmar, você concorda com nossos{" "}
                      <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Termos de Serviço
                      </a>{" "}
                      e{" "}
                      <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Política de Privacidade
                      </a>
                    </p>
                  </>
                )}

                {selectedPlan === "free" && (
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Tudo Pronto!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Sua conta gratuita está pronta para uso. Comece agora mesmo sua jornada de transformação!
                      </p>
                    </div>
                    <a 
                      href="/dashboard"
                      className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
                    >
                      Começar Agora
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 py-12 px-6">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold mb-6 shadow-xl">
            <Target className="w-5 h-5" />
            <span>Descubra seu plano ideal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Quiz de Personalização
          </h1>
          <p className="text-xl text-indigo-100">
            Responda 5 perguntas rápidas para encontrarmos o melhor plano para você
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-bold">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-indigo-100 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  answers[currentQuestion] === option
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-xl scale-105"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{option}</span>
                  {answers[currentQuestion] === option && (
                    <Check className="w-6 h-6 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
              answers[currentQuestion]
                ? "bg-white text-indigo-600 hover:scale-105 shadow-xl"
                : "bg-white/20 text-white/50 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Próxima"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Skip Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowResults(true)}
            className="text-white/80 hover:text-white font-medium underline transition-colors"
          >
            Pular quiz e ver todos os planos
          </button>
        </div>
      </div>
    </div>
  )
}
