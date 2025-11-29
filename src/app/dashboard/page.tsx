"use client"

import { useState, useEffect } from "react"
import { Trophy, Target, TrendingUp, Calendar, Award, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  date: string
  plan: string
  amount: string
  status: "completed" | "pending" | "failed"
}

interface Stats {
  totalHabits: number
  currentStreak: number
  totalXP: number
  level: number
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      date: "2024-01-15",
      plan: "Pro - Mensal",
      amount: "R$ 19,90",
      status: "completed"
    },
    {
      id: "TXN002",
      date: "2023-12-15",
      plan: "Pro - Mensal",
      amount: "R$ 19,90",
      status: "completed"
    }
  ])

  const [stats, setStats] = useState<Stats>({
    totalHabits: 8,
    currentStreak: 15,
    totalXP: 2450,
    level: 12
  })

  const statusColors = {
    completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  }

  const statusLabels = {
    completed: "Concluído",
    pending: "Pendente",
    failed: "Falhou"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Meu Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Acompanhe seu progresso e histórico
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total de Hábitos</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalHabits}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Sequência Atual</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.currentStreak} dias</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total de XP</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalXP.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Nível Atual</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.level}</p>
          </div>
        </div>

        {/* Transactions History */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Histórico de Pagamentos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Todas as suas transações e cobranças
              </p>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Nenhuma transação ainda
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                      ID
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                      Data
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                      Plano
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                      Valor
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.id}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {transaction.plan}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">
                        {transaction.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            statusColors[transaction.status]
                          }`}
                        >
                          {statusLabels[transaction.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Link
            href="/quiz"
            className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all"
          >
            <Target className="w-8 h-8 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Refazer Quiz</h3>
            <p className="text-indigo-100">Descubra se outro plano é melhor para você</p>
          </Link>

          <button className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all text-left">
            <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Conquistas</h3>
            <p className="text-gray-600 dark:text-gray-400">Veja todas as suas conquistas</p>
          </button>

          <button className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all text-left">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Estatísticas</h3>
            <p className="text-gray-600 dark:text-gray-400">Análise detalhada do seu progresso</p>
          </button>
        </div>
      </div>
    </div>
  )
}
