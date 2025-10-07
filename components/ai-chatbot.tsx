"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm NexaTech's AI assistant. I can help you learn about our services, team, and how we're building Africa's tech ecosystem. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIKnowledge = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_knowledge')
        .select('topic, content, category')
        .eq('active', true)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching AI knowledge:', error)
      return []
    }
  }

  const generateAIResponse = async (userMessage: string) => {
    try {
      const knowledge = await getAIKnowledge()
      
      const knowledgeContext = knowledge.map(item => 
        `Topic: ${item.topic}\nCategory: ${item.category}\nContent: ${item.content}`
      ).join('\n\n')

      const systemPrompt = `You are NexaTech Rwanda's AI assistant. You help visitors learn about NexaTech Rwanda, a technology company building Africa's tech ecosystem from Rwanda.

IMPORTANT RULES:
1. ONLY answer questions about NexaTech Rwanda, its services, team, projects, or general tech topics related to the company
2. If asked about anything unrelated to NexaTech Rwanda, politely redirect to company topics
3. Be helpful, professional, and enthusiastic about NexaTech's mission
4. Keep responses concise but informative
5. Use the knowledge base provided below to answer questions accurately

NEXATECH KNOWLEDGE BASE:
${knowledgeContext}

COMPANY OVERVIEW:
- NexaTech Rwanda is building Africa's tech ecosystem from Rwanda
- We provide web development, mobile apps, AI solutions, digital marketing, and cybersecurity
- We work with businesses and governments across Africa
- Our mission is to make Rwanda the brain of Africa's technological revolution

User Question: ${userMessage}

Provide a helpful response about NexaTech Rwanda:`

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          systemPrompt
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Error generating AI response:', error)
      return "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at nexatech317@gmail.com for immediate assistance."
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(userMessage.content)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Futuristic Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="relative w-16 h-16 bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-200 rounded-2xl shadow-2xl border border-gray-800 dark:border-gray-300 overflow-hidden group"
          onClick={() => setIsOpen(!isOpen)}
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent dark:via-gray-400/20"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 dark:from-gray-400 dark:via-gray-200 dark:to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 text-white dark:text-gray-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Bot className="w-7 h-7 text-white dark:text-gray-900" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </motion.div>

      {/* Futuristic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Futuristic Header */}
            <div className="relative bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-gray-900 p-4">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>
              
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center border border-gray-600 dark:border-gray-300">
                    <Bot className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">NexaTech AI</h3>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Powered by Gemini AI
                  </p>
                </div>
              </div>
            </div>

            {/* Futuristic Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {!message.isUser && (
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center border border-gray-600 dark:border-gray-300">
                        <Bot className="w-4 h-4 text-white dark:text-gray-900" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>
                  )}
                  <motion.div
                    className={`max-w-[75%] p-4 text-sm relative ${
                      message.isUser
                        ? 'bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-gray-900 rounded-2xl rounded-br-md border border-gray-700 dark:border-gray-300'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-600 backdrop-blur-sm'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Message glow effect */}
                    {!message.isUser && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-green-400/10" />
                    )}
                    <div className="relative z-10">{message.content}</div>
                    
                    {/* Timestamp */}
                    <div className={`text-xs mt-2 opacity-60 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border border-gray-500 dark:border-gray-400">
                      <User className="w-4 h-4 text-white dark:text-gray-900" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex gap-3 justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center border border-gray-600 dark:border-gray-300">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Bot className="w-4 h-4 text-white dark:text-gray-900" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white dark:border-gray-900"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-600 backdrop-blur-sm">
                    <div className="flex space-x-2 items-center">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">AI thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Futuristic Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about NexaTech..."
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isLoading}
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-green-400/10 pointer-events-none" />
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="relative px-4 py-3 bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 dark:border-gray-300 overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 dark:via-gray-400/20 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}