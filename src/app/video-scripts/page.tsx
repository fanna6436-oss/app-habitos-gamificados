"use client"

import { useState } from "react"
import { Video, Sparkles, Copy, Download, RefreshCw, TrendingUp, Heart, Users, Clock, Target, Zap } from "lucide-react"

export default function VideoScriptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("rotina")
  const [generatedScript, setGeneratedScript] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: "rotina", label: "Rotina Matinal", icon: "☀️" },
    { id: "filhos", label: "Tempo com Filhos", icon: "👨‍👩‍👧‍👦" },
    { id: "autocuidado", label: "Autocuidado", icon: "💆‍♀️" },
    { id: "produtividade", label: "Produtividade", icon: "⚡" },
    { id: "motivacao", label: "Motivação", icon: "🔥" },
    { id: "transformacao", label: "Antes e Depois", icon: "✨" },
  ]

  const scriptTemplates = {
    rotina: {
      title: "Rotina Matinal de Mãe Solteira",
      hook: "POV: Você é mãe solteira e descobriu o segredo para ter uma manhã produtiva",
      scenes: [
        {
          time: "0-3s",
          visual: "Close no rosto dela acordando (5h30 da manhã)",
          audio: "Som de despertador suave",
          text: "5h30 da manhã enquanto eles dormem..."
        },
        {
          time: "3-7s",
          visual: "Abrindo o app LevelUp na cama",
          audio: "Som de notificação motivadora",
          text: "Primeiro hábito do dia: 5min de meditação ✓"
        },
        {
          time: "7-12s",
          visual: "Montagem rápida: café, exercício rápido, planejamento do dia",
          audio: "Música motivacional suave",
          text: "30 minutos SÓ PARA MIM antes deles acordarem"
        },
        {
          time: "12-18s",
          visual: "Mostrando o app com streak de 47 dias",
          audio: "Som de conquista",
          text: "47 dias sem falhar. Nunca pensei que conseguiria!"
        },
        {
          time: "18-25s",
          visual: "Ela sorrindo, crianças acordando ao fundo",
          audio: "Voz dela",
          text: "Agora tenho energia para ser a mãe que eles merecem ❤️"
        },
        {
          time: "25-30s",
          visual: "Tela do app com CTA",
          audio: "Música continua",
          text: "Link na bio para testar 7 dias grátis"
        }
      ],
      cta: "Se você é mãe solo, esse app vai mudar sua vida. Link na bio! 🔗",
      hashtags: "#mãesolteira #rotina #produtividade #maternidade #autocuidado #levelup #habitossaudaveis #motivação"
    },
    filhos: {
      title: "Equilibrando Filhos e Autocuidado",
      hook: "Como eu consegui tempo para mim sendo mãe solo de 2",
      scenes: [
        {
          time: "0-3s",
          visual: "Caos da casa com brinquedos espalhados",
          audio: "Som de crianças brincando",
          text: "Realidade: mãe solo de 2 crianças"
        },
        {
          time: "3-8s",
          visual: "Ela no celular, mostrando o app",
          audio: "Música calma começa",
          text: "Descobri esse app que me ajuda a organizar TUDO"
        },
        {
          time: "8-15s",
          visual: "Mostrando hábitos no app: 'Ler 10min', 'Exercício 15min', 'Tempo de qualidade com filhos'",
          audio: "Voz dela explicando",
          text: "Criei hábitos pequenos mas que fazem DIFERENÇA"
        },
        {
          time: "15-22s",
          visual: "Montagem: ela lendo, brincando com filhos, fazendo exercício",
          audio: "Música motivacional",
          text: "15 minutos aqui, 10 minutos ali... somou!"
        },
        {
          time: "22-28s",
          visual: "Estatísticas do app mostrando progresso",
          audio: "Som de conquista",
          text: "Em 1 mês: 300min de leitura, 20 treinos, 100% presente"
        },
        {
          time: "28-30s",
          visual: "Ela abraçando os filhos, sorrindo",
          audio: "Voz dela",
          text: "Mãe feliz = filhos felizes ❤️"
        }
      ],
      cta: "Teste grátis por 7 dias. Link na bio! 👆",
      hashtags: "#mãesolo #maternidadereal #equilibrio #filhos #autocuidado #organizacao #rotina #vidademãe"
    },
    autocuidado: {
      title: "Autocuidado Não é Egoísmo",
      hook: "Eu me sentia culpada por tirar tempo para mim... até descobrir isso",
      scenes: [
        {
          time: "0-4s",
          visual: "Ela cansada, olheiras, cabelo bagunçado",
          audio: "Silêncio pesado",
          text: "Eu estava me perdendo sendo só 'mãe'"
        },
        {
          time: "4-9s",
          visual: "Scrolling no celular, encontra o app",
          audio: "Música esperançosa começa",
          text: "Até que uma amiga me indicou esse app"
        },
        {
          time: "9-16s",
          visual: "Criando hábitos no app: skincare, exercício, hobby",
          audio: "Voz dela",
          text: "Comecei com 5 minutos de autocuidado por dia"
        },
        {
          time: "16-23s",
          visual: "Transformação visual: ela arrumada, sorrindo, radiante",
          audio: "Música empoderadora",
          text: "3 meses depois... me reconheci no espelho"
        },
        {
          time: "23-28s",
          visual: "Mostrando o app com conquistas desbloqueadas",
          audio: "Som de celebração",
          text: "Nível 15 desbloqueado: 'Mãe que se cuida' 👑"
        },
        {
          time: "28-30s",
          visual: "Ela confiante, mensagem final",
          audio: "Voz dela",
          text: "Autocuidado não é egoísmo. É necessidade."
        }
      ],
      cta: "Comece sua transformação hoje. Link na bio! ✨",
      hashtags: "#autocuidado #mãesolteira #transformação #autoestima #saúdemental #empoderamento #cuidarprimeiro"
    },
    produtividade: {
      title: "Produtividade Real de Mãe Solo",
      hook: "Como eu faço TUDO sendo mãe solteira (sem surtar)",
      scenes: [
        {
          time: "0-3s",
          visual: "Lista gigante de tarefas na tela",
          audio: "Som de estresse",
          text: "Trabalho + casa + filhos + vida = CAOS"
        },
        {
          time: "3-8s",
          visual: "Descobrindo o app, olhos brilhando",
          audio: "Música de descoberta",
          text: "Até eu descobrir esse app de hábitos"
        },
        {
          time: "8-15s",
          visual: "Mostrando sistema de missões e XP",
          audio: "Voz dela animada",
          text: "Transformei minha rotina em um JOGO"
        },
        {
          time: "15-22s",
          visual: "Completando tarefas, ganhando XP, subindo de nível",
          audio: "Sons de conquista",
          text: "Cada tarefa = XP. Cada dia = vitória."
        },
        {
          time: "22-27s",
          visual: "Dashboard mostrando tudo organizado",
          audio: "Música triunfante",
          text: "Agora eu SEI que estou progredindo"
        },
        {
          time: "27-30s",
          visual: "Ela relaxada no sofá, crianças dormindo",
          audio: "Voz dela",
          text: "E ainda sobra tempo para descansar 😴"
        }
      ],
      cta: "Organize sua vida de forma divertida. Link na bio! 🎮",
      hashtags: "#produtividade #organização #mãesolteira #gestãodetempo #rotina #eficiência #vidaorganizada"
    },
    motivacao: {
      title: "Motivação Diária para Não Desistir",
      hook: "Nos dias difíceis, isso me mantém de pé",
      scenes: [
        {
          time: "0-4s",
          visual: "Ela chorando, dia difícil evidente",
          audio: "Silêncio emocional",
          text: "Tem dias que eu quero desistir de tudo..."
        },
        {
          time: "4-9s",
          visual: "Notificação do app aparece: 'Você já chegou tão longe!'",
          audio: "Som de notificação suave",
          text: "Aí vem essa notificação..."
        },
        {
          time: "9-16s",
          visual: "Abrindo o app, vendo streak de 60 dias",
          audio: "Música inspiradora começa",
          text: "60 dias sem falhar. 60 dias de luta."
        },
        {
          time: "16-23s",
          visual: "Scrolling pelas conquistas e progresso",
          audio: "Voz dela emocionada",
          text: "Olha tudo que EU já conquistei sozinha"
        },
        {
          time: "23-28s",
          visual: "Ela secando as lágrimas, sorrindo",
          audio: "Música empoderadora",
          text: "Se eu cheguei até aqui, posso ir mais longe"
        },
        {
          time: "28-30s",
          visual: "Completando o hábito do dia",
          audio: "Som de conquista",
          text: "Dia 61. Vamos que vamos! 💪"
        }
      ],
      cta: "Você também pode. Comece hoje. Link na bio! 🔥",
      hashtags: "#motivação #mãesolteira #nãodesista #força #superação #resiliência #inspiração #guerreira"
    },
    transformacao: {
      title: "Antes e Depois: 90 Dias de Mudança",
      hook: "90 dias usando esse app mudaram minha vida completamente",
      scenes: [
        {
          time: "0-5s",
          visual: "Split screen: ANTES (cansada, desorganizada) vs DEPOIS (radiante, confiante)",
          audio: "Música dramática",
          text: "ANTES vs DEPOIS de 90 dias"
        },
        {
          time: "5-10s",
          visual: "Mostrando o app no dia 1",
          audio: "Voz dela",
          text: "Dia 1: Comecei com 3 hábitos simples"
        },
        {
          time: "10-17s",
          visual: "Timelapse de 90 dias de progresso no app",
          audio: "Música acelerando",
          text: "Água, exercício, leitura. TODO DIA."
        },
        {
          time: "17-24s",
          visual: "Estatísticas impressionantes: 90 dias streak, nível 20, 50 conquistas",
          audio: "Sons de conquista",
          text: "Resultado: 90 dias sem falhar, nível 20 atingido"
        },
        {
          time: "24-28s",
          visual: "Ela agora: saudável, feliz, energizada",
          audio: "Música triunfante",
          text: "Perdi 8kg, ganhei energia, virei exemplo pros meus filhos"
        },
        {
          time: "28-30s",
          visual: "Tela do app com CTA",
          audio: "Voz dela",
          text: "Seus 90 dias começam HOJE. Link na bio! 🚀"
        }
      ],
      cta: "Transforme sua vida em 90 dias. Teste grátis! 🔗",
      hashtags: "#transformação #antesedepois #90dias #mudança #evolução #mãesolteira #inspiração #resultado"
    }
  }

  const generateScript = () => {
    setLoading(true)
    setTimeout(() => {
      setGeneratedScript(scriptTemplates[selectedCategory as keyof typeof scriptTemplates])
      setLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copiado para a área de transferência!")
  }

  const downloadScript = () => {
    if (!generatedScript) return
    
    const scriptText = `
ROTEIRO DE VÍDEO TIKTOK - ${generatedScript.title}

HOOK: ${generatedScript.hook}

CENAS:
${generatedScript.scenes.map((scene: any, i: number) => `
Cena ${i + 1} (${scene.time})
Visual: ${scene.visual}
Áudio: ${scene.audio}
Texto na tela: ${scene.text}
`).join('\n')}

CTA: ${generatedScript.cta}

HASHTAGS: ${generatedScript.hashtags}
    `
    
    const blob = new Blob([scriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roteiro-${selectedCategory}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-indigo-950/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Gerador de Roteiros TikTok</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Para mães solteiras que usam o LevelUp</p>
              </div>
            </div>
            <a href="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              ← Voltar ao App
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Persona Card */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 mb-12 text-white shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-5xl">
              👩‍👧‍👦
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">Perfil da Criadora</h2>
              <div className="grid md:grid-cols-2 gap-4 text-pink-50">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Mãe solteira, pele branca, 1,65m</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Tempo limitado, focada nos filhos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span>Usa LevelUp para organizar rotina</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Quer inspirar outras mães</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: TrendingUp, label: "Taxa de Engajamento", value: "8.5%", color: "from-green-500 to-emerald-500" },
            { icon: Heart, label: "Média de Likes", value: "15K+", color: "from-pink-500 to-rose-500" },
            { icon: Users, label: "Alcance Médio", value: "250K", color: "from-purple-500 to-indigo-500" },
            { icon: Zap, label: "Conversão", value: "12%", color: "from-orange-500 to-red-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Category Selection */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-purple-500" />
            Escolha o Tipo de Vídeo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg scale-105"
                    : "border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white">{cat.label}</p>
              </button>
            ))}
          </div>
          
          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                Gerando Roteiro...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Gerar Roteiro Completo
              </>
            )}
          </button>
        </div>

        {/* Generated Script */}
        {generatedScript && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{generatedScript.title}</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(generatedScript, null, 2))}
                  className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:scale-110 transition-all"
                  title="Copiar roteiro"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadScript}
                  className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:scale-110 transition-all"
                  title="Baixar roteiro"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hook */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 mb-8 text-white">
              <p className="text-sm font-bold mb-2 opacity-90">HOOK (Gancho Inicial)</p>
              <p className="text-xl font-bold">{generatedScript.hook}</p>
            </div>

            {/* Scenes */}
            <div className="space-y-6 mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cenas Detalhadas (30 segundos)</h4>
              {generatedScript.scenes.map((scene: any, index: number) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-purple-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Cena {index + 1}</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">{scene.time}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">📹 Visual:</p>
                      <p className="text-gray-600 dark:text-gray-400">{scene.visual}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">🔊 Áudio:</p>
                      <p className="text-gray-600 dark:text-gray-400">{scene.audio}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">📝 Texto na Tela:</p>
                      <p className="text-gray-900 dark:text-white font-medium">{scene.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 mb-6 text-white">
              <p className="text-sm font-bold mb-2 opacity-90">CALL TO ACTION (Chamada Final)</p>
              <p className="text-lg font-bold">{generatedScript.cta}</p>
            </div>

            {/* Hashtags */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">HASHTAGS RECOMENDADAS:</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{generatedScript.hashtags}</p>
              <button
                onClick={() => copyToClipboard(generatedScript.hashtags)}
                className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copiar hashtags
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-3xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            💡 Dicas para Gravar
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">1</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Iluminação Natural</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Grave perto de janelas ou use ring light</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">2</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Autenticidade</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mostre sua realidade, sem filtros excessivos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">3</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Áudio Limpo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use microfone de lapela ou grave em ambiente silencioso</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">4</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Mostre o App</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Grave a tela do celular mostrando funcionalidades</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">5</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Emoção Genuína</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Compartilhe sentimentos reais, crie conexão</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 text-yellow-900 font-bold">6</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Poste Consistentemente</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2-3 vídeos por semana para crescer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
