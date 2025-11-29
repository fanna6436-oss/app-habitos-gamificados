"use client"

import { useState, useEffect } from "react"
import { Check, Flame, Trophy, Target, Calendar, Settings, User, Star, Zap, Award, TrendingUp, Clock, Plus, X, BarChart3 } from "lucide-react"

type Habit = {
  id: string
  name: string
  icon: string
  completed: boolean
  streak: number
  xp: number
  category: string
}

type Mission = {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
  progress: number
  total: number
}

type RoutineTask = {
  id: string
  time: string
  task: string
  completed: boolean
  category: string
}

export default function LevelUpApp() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "habits" | "routine" | "avatar" | "missions" | "stats" | "settings">("home")
  const [userLevel, setUserLevel] = useState(5)
  const [userXP, setUserXP] = useState(320)
  const [xpToNextLevel, setXpToNextLevel] = useState(500)
  const [totalStreak, setTotalStreak] = useState(12)
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [newHabitName, setNewHabitName] = useState("")

  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Meditação Matinal", icon: "🧘", completed: false, streak: 7, xp: 20, category: "Bem-estar" },
    { id: "2", name: "Leitura Diária", icon: "📚", completed: false, streak: 12, xp: 30, category: "Desenvolvimento" },
    { id: "3", name: "Exercício Físico", icon: "💪", completed: true, streak: 5, xp: 40, category: "Saúde" },
    { id: "4", name: "Hidratação", icon: "💧", completed: false, streak: 15, xp: 15, category: "Saúde" },
    { id: "5", name: "Estudo Focado", icon: "🎓", completed: true, streak: 8, xp: 35, category: "Desenvolvimento" },
  ])

  const [missions, setMissions] = useState<Mission[]>([
    { id: "1", title: "Mestre da Consistência", description: "Complete todos os hábitos por 7 dias consecutivos", xp: 200, completed: false, progress: 3, total: 7 },
    { id: "2", title: "Despertar Produtivo", description: "Inicie sua rotina antes das 6h por 5 dias", xp: 150, completed: false, progress: 2, total: 5 },
    { id: "3", title: "Foco Semanal", description: "Complete 20 hábitos esta semana", xp: 100, completed: false, progress: 12, total: 20 },
  ])

  const [routine, setRoutine] = useState<RoutineTask[]>([
    { id: "1", time: "06:00", task: "Despertar e Hidratação", completed: true, category: "Manhã" },
    { id: "2", time: "06:30", task: "Exercício Matinal", completed: true, category: "Manhã" },
    { id: "3", time: "07:30", task: "Café da Manhã Saudável", completed: false, category: "Manhã" },
    { id: "4", time: "09:00", task: "Trabalho Focado", completed: false, category: "Trabalho" },
    { id: "5", time: "12:00", task: "Almoço", completed: false, category: "Alimentação" },
    { id: "6", time: "14:00", task: "Sessão de Estudos", completed: false, category: "Desenvolvimento" },
    { id: "7", time: "18:00", task: "Tempo Livre", completed: false, category: "Lazer" },
    { id: "8", time: "22:00", task: "Preparação para Descanso", completed: false, category: "Noite" },
  ])

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id && !h.completed) {
        setUserXP(prev => prev + h.xp)
        return { ...h, completed: true, streak: h.streak + 1 }
      }
      return h
    }))
  }

  const toggleRoutineTask = (id: string) => {
    setRoutine(routine.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ))
  }

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        icon: "⭐",
        completed: false,
        streak: 0,
        xp: 25,
        category: "Personalizado"
      }
      setHabits([...habits, newHabit])
      setNewHabitName("")
      setShowAddHabit(false)
    }
  }

  const completedHabitsToday = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const progressPercentage = (completedHabitsToday / totalHabits) * 100
  const xpPercentage = (userXP / xpToNextLevel) * 100

  useEffect(() => {
    if (userXP >= xpToNextLevel) {
      setUserLevel(prev => prev + 1)
      setUserXP(prev => prev - xpToNextLevel)
      setXpToNextLevel(prev => Math.floor(prev * 1.5))
    }
  }, [userXP, xpToNextLevel])

  // HOME SCREEN
  const HomeScreen = () => (
    <div className="space-y-6 pb-24">
      {/* Header com Avatar e Level */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl border-4 border-white/40 shadow-xl">
              🎯
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Nível {userLevel}</h2>
              <p className="text-indigo-100 text-base font-medium">Profissional Elite</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full shadow-lg">
            <Flame className="w-6 h-6 text-orange-300" />
            <span className="font-bold text-xl">{totalStreak}</span>
          </div>
        </div>

        {/* Barra de XP */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-indigo-100">Experiência: {userXP}/{xpToNextLevel}</span>
            <span className="text-indigo-100">{Math.floor(xpPercentage)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 h-full rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Progresso Diário */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Target className="w-6 h-6 text-indigo-600" />
            Progresso Diário
          </h3>
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {completedHabitsToday}/{totalHabits}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-full rounded-full transition-all duration-700 shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">
          {completedHabitsToday === totalHabits ? "✨ Excelente! Todos os objetivos alcançados hoje" : `${totalHabits - completedHabitsToday} objetivos restantes para completar o dia`}
        </p>
      </div>

      {/* Hábitos Rápidos */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
          <Zap className="w-6 h-6 text-yellow-500" />
          Objetivos de Hoje
        </h3>
        <div className="space-y-3">
          {habits.slice(0, 4).map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`w-full flex items-center justify-between p-5 rounded-xl transition-all duration-300 ${
                habit.completed 
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl scale-[0.98]" 
                  : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{habit.icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-base">{habit.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs opacity-80 flex items-center gap-1 font-medium">
                      <Flame className="w-3 h-3" /> {habit.streak} dias
                    </p>
                    <span className="text-xs opacity-70">•</span>
                    <p className="text-xs opacity-80">{habit.category}</p>
                  </div>
                </div>
              </div>
              {habit.completed ? (
                <Check className="w-7 h-7" />
              ) : (
                <div className="w-7 h-7 border-2 border-gray-400 dark:border-gray-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Missões Ativas */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Missões Ativas
        </h3>
        <div className="space-y-4">
          {missions.slice(0, 2).map(mission => (
            <div key={mission.id} className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-base text-gray-900 dark:text-white">{mission.title}</h4>
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-3 py-1.5 rounded-full font-bold shadow-md">
                  +{mission.xp} XP
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{mission.description}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">{mission.progress}/{mission.total} concluído</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // HABITS SCREEN
  const HabitsScreen = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Hábitos</h2>
        <button 
          onClick={() => setShowAddHabit(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {showAddHabit && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-indigo-500">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Novo Hábito</h3>
            <button onClick={() => setShowAddHabit(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Nome do hábito..."
            className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
          />
          <button
            onClick={addHabit}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Adicionar Hábito
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {habits.map(habit => (
          <div
            key={habit.id}
            className={`p-6 rounded-2xl shadow-xl transition-all duration-300 border ${
              habit.completed
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{habit.icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-1">{habit.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm opacity-90 flex items-center gap-1 font-medium">
                      <Flame className="w-4 h-4" /> {habit.streak} dias
                    </span>
                    <span className="text-sm opacity-90 flex items-center gap-1 font-medium">
                      <Star className="w-4 h-4" /> {habit.xp} XP
                    </span>
                  </div>
                  <p className="text-xs opacity-75 mt-1">{habit.category}</p>
                </div>
              </div>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  habit.completed
                    ? "bg-white/20 backdrop-blur-md"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-110 shadow-lg"
                }`}
              >
                {habit.completed ? <Check className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ROUTINE SCREEN
  const RoutineScreen = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Rotina Diária</h2>
      <div className="space-y-3">
        {routine.map(task => (
          <button
            key={task.id}
            onClick={() => toggleRoutineTask(task.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 ${
              task.completed
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              task.completed ? "bg-white/20 backdrop-blur-md" : "bg-indigo-100 dark:bg-indigo-900/30"
            }`}>
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-base">{task.task}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm opacity-80 font-medium">{task.time}</p>
                <span className="text-xs opacity-60">•</span>
                <p className="text-xs opacity-75">{task.category}</p>
              </div>
            </div>
            {task.completed && <Check className="w-6 h-6" />}
          </button>
        ))}
      </div>
    </div>
  )

  // AVATAR SCREEN
  const AvatarScreen = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meu Perfil</h2>
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="w-36 h-36 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-7xl border-4 border-white/40 shadow-2xl">
            🎯
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-2">Nível {userLevel}</h3>
            <p className="text-indigo-100 text-lg font-medium">Profissional Elite</p>
          </div>
          <div className="w-full space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Experiência: {userXP}/{xpToNextLevel}</span>
              <span>{Math.floor(xpPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-center border border-gray-200 dark:border-gray-700">
          <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStreak}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Dias Consecutivos</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-center border border-gray-200 dark:border-gray-700">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{missions.filter(m => m.completed).length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Missões Completas</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-center border border-gray-200 dark:border-gray-700">
          <Target className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{habits.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Hábitos Ativos</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-center border border-gray-200 dark:border-gray-700">
          <Star className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{userXP}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">XP Acumulado</p>
        </div>
      </div>
    </div>
  )

  // MISSIONS SCREEN
  const MissionsScreen = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
        <Trophy className="w-8 h-8 text-yellow-500" />
        Missões
      </h2>
      <div className="space-y-4">
        {missions.map(mission => (
          <div key={mission.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-9 h-9 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mission.title}</h3>
              </div>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-md">
                +{mission.xp} XP
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{mission.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700 dark:text-gray-300">Progresso</span>
                <span className="font-bold text-gray-900 dark:text-white">{mission.progress}/{mission.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // STATS SCREEN
  const StatsScreen = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
        <BarChart3 className="w-8 h-8 text-green-500" />
        Estatísticas
      </h2>

      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
        <h3 className="text-xl font-bold mb-6">Resumo Semanal</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold mb-1">87%</p>
            <p className="text-sm text-indigo-100 font-medium">Taxa de Conclusão</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-1">24</p>
            <p className="text-sm text-indigo-100 font-medium">Hábitos Completos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-1">12</p>
            <p className="text-sm text-indigo-100 font-medium">Dias Ativos</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Hábitos Mais Consistentes</h3>
        <div className="space-y-3">
          {habits.sort((a, b) => b.streak - a.streak).slice(0, 5).map((habit, index) => (
            <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 w-8">#{index + 1}</span>
                <span className="text-3xl">{habit.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{habit.name}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-500">
                <Flame className="w-5 h-5" />
                <span className="font-bold text-lg">{habit.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Calendário de Atividades</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg transition-all ${
                Math.random() > 0.3
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-5 text-center font-medium">
          Últimos 28 dias de atividade
        </p>
      </div>
    </div>
  )

  // SETTINGS SCREEN
  const SettingsScreen = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h2>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white">Notificações</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Lembretes diários</span>
              <div className="w-12 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Missões novas</span>
              <div className="w-12 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Conquistas</span>
              <div className="w-12 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white">Conta</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium text-gray-700 dark:text-gray-300">
              Editar perfil
            </button>
            <button className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium text-gray-700 dark:text-gray-300">
              Alterar avatar
            </button>
            <button className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium text-gray-700 dark:text-gray-300">
              Privacidade e segurança
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white">Plano Premium</h3>
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 rounded-xl p-6 text-yellow-900 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-7 h-7" />
              <span className="font-bold text-xl">Upgrade para Premium</span>
            </div>
            <p className="text-sm mb-4 leading-relaxed">Desbloqueie recursos exclusivos, avatares especiais, estatísticas avançadas e muito mais!</p>
            <button className="w-full bg-yellow-900 text-yellow-100 py-3 rounded-lg font-bold hover:bg-yellow-800 transition-colors shadow-md">
              Assinar por R$ 9,90/mês
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      {/* Container Principal */}
      <div className="max-w-md mx-auto min-h-screen bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-2xl">
        {/* Content */}
        <div className="p-6 pt-8">
          {currentScreen === "home" && <HomeScreen />}
          {currentScreen === "habits" && <HabitsScreen />}
          {currentScreen === "routine" && <RoutineScreen />}
          {currentScreen === "avatar" && <AvatarScreen />}
          {currentScreen === "missions" && <MissionsScreen />}
          {currentScreen === "stats" && <StatsScreen />}
          {currentScreen === "settings" && <SettingsScreen />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-around p-4">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentScreen === "home" ? "text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Target className="w-6 h-6" />
              <span className="text-xs font-semibold">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen("habits")}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentScreen === "habits" ? "text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Check className="w-6 h-6" />
              <span className="text-xs font-semibold">Hábitos</span>
            </button>
            <button
              onClick={() => setCurrentScreen("routine")}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentScreen === "routine" ? "text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs font-semibold">Rotina</span>
            </button>
            <button
              onClick={() => setCurrentScreen("missions")}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentScreen === "missions" ? "text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-semibold">Missões</span>
            </button>
            <button
              onClick={() => setCurrentScreen("avatar")}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                currentScreen === "avatar" ? "text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-semibold">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
