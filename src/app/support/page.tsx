"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Como funciona o período de teste gratuito?",
    answer: "O plano Pro oferece 7 dias de teste gratuito. Você pode cancelar a qualquer momento durante o período de teste sem ser cobrado. Após os 7 dias, a cobrança será feita automaticamente."
  },
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, você será cobrado proporcionalmente. Se fizer downgrade, o crédito será aplicado na próxima fatura."
  },
  {
    question: "Como funciona o cancelamento?",
    answer: "Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Após o cancelamento, você continuará tendo acesso aos recursos premium até o final do período pago."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartões de crédito (Visa, Mastercard, American Express), cartões de débito e PIX. Todas as transações são processadas de forma segura e criptografada."
  },
  {
    question: "O que acontece com meus dados se eu cancelar?",
    answer: "Seus dados ficam salvos por 90 dias após o cancelamento. Durante esse período, você pode reativar sua conta e recuperar todos os seus hábitos e progresso. Após 90 dias, os dados são permanentemente excluídos."
  },
  {
    question: "Posso usar em múltiplos dispositivos?",
    answer: "Sim! Sua conta funciona em todos os dispositivos - computador, tablet e smartphone. Seus dados são sincronizados automaticamente em tempo real."
  },
  {
    question: "Como funciona o sistema de XP e níveis?",
    answer: "Você ganha XP ao completar hábitos diariamente. Quanto mais consistente você for, mais XP ganha. Ao acumular XP, você sobe de nível e desbloqueia conquistas, avatares e recursos especiais."
  },
  {
    question: "O plano Equipes é adequado para empresas?",
    answer: "Sim! O plano Equipes foi desenvolvido especialmente para empresas que querem promover hábitos saudáveis entre colaboradores. Inclui dashboard gerencial, relatórios e suporte dedicado."
  },
  {
    question: "Existe desconto para estudantes?",
    answer: "Sim! Oferecemos 50% de desconto no plano Pro para estudantes com email institucional válido. Entre em contato com nosso suporte para ativar o desconto."
  },
  {
    question: "Como funciona a garantia de reembolso?",
    answer: "Oferecemos garantia de 30 dias. Se você não estiver satisfeito por qualquer motivo, basta solicitar o reembolso total dentro dos primeiros 30 dias."
  }
]

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    alert("Mensagem enviada! Entraremos em contato em breve.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Link>
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-full font-bold mb-6">
            <HelpCircle className="w-5 h-5" />
            Central de Ajuda
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Como podemos ajudar?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Encontre respostas rápidas ou entre em contato conosco
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 text-center hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Resposta em até 24h
            </p>
            <a
              href="mailto:suporte@habittracker.com"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              suporte@habittracker.com
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 text-center hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Chat ao Vivo</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Seg-Sex, 9h-18h
            </p>
            <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Iniciar chat
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 text-center hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Base de Conhecimento</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Guias e tutoriais
            </p>
            <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Explorar artigos
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-bold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ainda precisa de ajuda?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Envie sua dúvida e nossa equipe responderá em breve
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Assunto
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Sobre o que você precisa de ajuda?"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Mensagem
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Descreva sua dúvida ou problema em detalhes..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
