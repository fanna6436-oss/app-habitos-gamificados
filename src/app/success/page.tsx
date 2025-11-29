"use client"

import { useEffect, useState } from "react"
import { CheckCircle, ArrowRight, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950 dark:to-emerald-950 flex items-center justify-center px-6 py-12">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "🎊", "✨", "🌟", "⭐"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Confirmado! 🎉
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Bem-vindo ao <span className="font-bold text-indigo-600 dark:text-indigo-400">LevelUp Pro</span>! 
            Sua assinatura foi ativada com sucesso e você já pode aproveitar todos os recursos premium.
          </p>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8 border border-indigo-200 dark:border-indigo-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              O que você ganhou:
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                { icon: Trophy, text: "Hábitos ilimitados" },
                { icon: Zap, text: "Missões épicas exclusivas" },
                { icon: CheckCircle, text: "Estatísticas avançadas" },
                { icon: Trophy, text: "Temas personalizados" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Ir para Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/quiz"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all border-2 border-gray-200 dark:border-gray-700"
            >
              Começar Agora
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Um email de confirmação foi enviado para você com todos os detalhes da sua assinatura.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  )
}
