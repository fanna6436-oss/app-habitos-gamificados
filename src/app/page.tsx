"use client"

import { Check, Zap, Target, Trophy, Flame, Star, TrendingUp, Users, Shield, Smartphone, ArrowRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { getStripe } from "@/lib/stripe"

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (plan: string, priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, plan }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold mb-8 shadow-xl">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span>Transforme sua rotina em conquistas diárias</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Domine Seus Hábitos.<br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Evolua Todos os Dias.
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              O único app de hábitos que transforma sua rotina em uma jornada épica de crescimento pessoal. Ganhe XP, suba de nível e conquiste a melhor versão de você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/quiz" className="group bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center gap-3">
                Fazer Quiz Personalizado
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                Ver Dashboard
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span className="font-medium">Grátis para começar</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span className="font-medium">Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span className="font-medium">Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">50K+</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Usuários Ativos</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">2M+</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Hábitos Completados</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">4.9★</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Avaliação na Store</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">87%</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Taxa de Retenção</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Você já tentou mudar seus hábitos antes?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sabemos como é difícil manter a consistência. Apps tradicionais são chatos, desmotivadores e você acaba desistindo em poucos dias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
              <div className="text-4xl mb-4">😔</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Falta de Motivação</h3>
              <p className="text-gray-600 dark:text-gray-400">Você começa empolgado, mas em poucos dias perde o interesse e abandona seus objetivos.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Apps Entediantes</h3>
              <p className="text-gray-600 dark:text-gray-400">Listas de tarefas monótonas que não te inspiram a continuar. Onde está a diversão?</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sem Progresso Visível</h3>
              <p className="text-gray-600 dark:text-gray-400">Você não vê seu crescimento, não sente que está evoluindo. Resultado? Desiste.</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl">
              É hora de uma solução diferente. É hora do LevelUp.
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-full font-bold mb-6">
              <Trophy className="w-5 h-5" />
              A Solução
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Transforme Hábitos em uma Jornada Épica
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              LevelUp usa gamificação inteligente para tornar o desenvolvimento de hábitos viciante, motivador e recompensador.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sistema de XP e Níveis</h3>
                    <p className="text-gray-600 dark:text-gray-400">Evolua como em um jogo</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Cada hábito completado te dá XP. Acumule experiência, suba de nível e desbloqueie conquistas exclusivas. Veja seu progresso de forma visual e motivadora.
                </p>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold">Nível 12 → Nível 13</span>
                    <span className="text-sm">850/1000 XP</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-gradient-to-r from-yellow-300 to-orange-400 h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <Target className="w-10 h-10 text-indigo-600 mb-3" />
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Hábitos Diários</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Crie e acompanhe seus objetivos</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <Flame className="w-10 h-10 text-orange-500 mb-3" />
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Streaks</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Mantenha sua sequência viva</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <Trophy className="w-10 h-10 text-yellow-500 mb-3" />
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Missões</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Desafios semanais épicos</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Estatísticas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Acompanhe sua evolução</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white shadow-xl">
                  <Check className="w-10 h-10 mb-3" />
                  <p className="font-bold text-lg mb-2">Rotina Inteligente</p>
                  <p className="text-sm text-emerald-100">Organize seu dia perfeitamente</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white shadow-xl">
                  <Star className="w-10 h-10 mb-3" />
                  <p className="font-bold text-lg mb-2">Recompensas</p>
                  <p className="text-sm text-blue-100">Desbloqueie conquistas únicas</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
                  <Users className="w-10 h-10 mb-3" />
                  <p className="font-bold text-lg mb-2">Comunidade</p>
                  <p className="text-sm text-purple-100">Conecte-se com outros usuários</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
                  <Shield className="w-10 h-10 mb-3" />
                  <p className="font-bold text-lg mb-2">Privacidade</p>
                  <p className="text-sm text-orange-100">Seus dados 100% seguros</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sistema de Streaks</h3>
                    <p className="text-gray-600 dark:text-gray-400">Nunca perca o ritmo</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Mantenha sua sequência de dias consecutivos e veja sua chama crescer. Quanto maior o streak, maiores as recompensas e o sentimento de conquista.
                </p>
                <div className="flex items-center justify-center gap-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                  <Flame className="w-16 h-16 text-orange-500" />
                  <div>
                    <p className="text-5xl font-bold text-gray-900 dark:text-white">47</p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Dias Consecutivos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Tudo que você precisa para evoluir
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Recursos poderosos projetados para transformar sua rotina em uma jornada de crescimento constante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Hábitos Personalizados", desc: "Crie hábitos únicos adaptados aos seus objetivos pessoais" },
              { icon: Flame, title: "Streaks Motivadores", desc: "Mantenha sequências diárias e ganhe bônus de XP" },
              { icon: Trophy, title: "Missões Épicas", desc: "Complete desafios semanais e ganhe recompensas exclusivas" },
              { icon: TrendingUp, title: "Estatísticas Detalhadas", desc: "Visualize seu progresso com gráficos e insights" },
              { icon: Zap, title: "Notificações Inteligentes", desc: "Lembretes no momento certo para manter você no caminho" },
              { icon: Star, title: "Sistema de Conquistas", desc: "Desbloqueie badges e títulos conforme evolui" },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Histórias de Transformação
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Veja como o LevelUp mudou a vida de milhares de pessoas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria Silva", role: "Empreendedora", text: "Em 3 meses, criei 8 novos hábitos e mantive 100% de consistência. O sistema de gamificação me mantém motivada todos os dias!", avatar: "👩‍💼" },
              { name: "João Santos", role: "Estudante", text: "Consegui manter uma rotina de estudos pela primeira vez na vida. Já subi 15 níveis e não pretendo parar!", avatar: "👨‍🎓" },
              { name: "Ana Costa", role: "Designer", text: "O LevelUp transformou minha produtividade. Ver meu progresso visualmente me dá uma motivação que nunca tive antes.", avatar: "👩‍🎨" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Comece grátis e evolua quando estiver pronto
            </p>
            
            <div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 shadow-lg"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-gray-700 text-indigo-600 shadow-lg"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Anual <span className="text-green-500 text-sm ml-2">-40%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-800">
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
              <Link href="/quiz" className="w-full block text-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl border-2 border-indigo-400 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl">
                MAIS POPULAR
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
                onClick={() => handleCheckout('Pro', billingCycle === 'monthly' ? 'price_pro_monthly' : 'price_pro_yearly')}
                disabled={loading}
                className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : 'Começar Teste Grátis'}
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
              <Link href="/support" className="w-full block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                Falar com Vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { q: "Como funciona o sistema de gamificação?", a: "Cada hábito completado te dá XP. Acumule experiência para subir de nível, desbloquear conquistas e ganhar recompensas exclusivas. É como jogar um RPG, mas com sua vida real!" },
              { q: "Posso usar o LevelUp gratuitamente?", a: "Sim! O plano gratuito permite até 5 hábitos e acesso ao sistema básico de XP e níveis. Você pode evoluir para o Pro quando quiser mais recursos." },
              { q: "O que acontece se eu perder um dia?", a: "Seu streak será resetado, mas você não perde seu nível ou XP acumulado. Além disso, usuários Pro têm 'Vidas Extras' para proteger streaks longos." },
              { q: "Posso cancelar a qualquer momento?", a: "Sim, sem burocracias. Cancele quando quiser e mantenha acesso até o fim do período pago." },
              { q: "Funciona offline?", a: "Sim! Você pode marcar hábitos offline e tudo será sincronizado quando voltar online." },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <ChevronDown className="w-6 h-6 text-indigo-600" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pronto para Evoluir?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
            Junte-se a mais de 50.000 pessoas que já transformaram suas vidas com o LevelUp. Comece gratuitamente hoje mesmo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/quiz" className="group bg-white text-indigo-600 px-12 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3">
              Fazer Quiz e Começar
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/support" className="bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
              Agendar Demo
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="font-medium">Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="font-medium">7 dias grátis no Pro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-300" />
              <span className="font-medium">Cancele quando quiser</span>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Disponível em todas as plataformas</span>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                <span className="text-white font-bold">📱 iOS</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                <span className="text-white font-bold">🤖 Android</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                <span className="text-white font-bold">💻 Web</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-500" />
                LevelUp
              </h3>
              <p className="text-sm leading-relaxed">
                Transforme seus hábitos em conquistas diárias e evolua constantemente.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/quiz" className="hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Suporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/support" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Carreiras</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/support" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Termos</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Segurança</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 LevelUp. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
