"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, Search, Send, X, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample FAQ data
const faqData = [
  {
    question: "How do I check my account balance?",
    answer:
      "You can check your account balance by navigating to the 'Accounts' tab on the dashboard. There, you'll see all your accounts with their current balances displayed prominently.",
  },
  {
    question: "How do I transfer money between accounts?",
    answer:
      "To transfer money between accounts, go to the 'Accounts' tab and use the 'Quick Transfer' section. Select the source account, destination account, enter the amount, and click 'Transfer Funds'.",
  },
  {
    question: "How do I add a new beneficiary?",
    answer:
      "To add a new beneficiary, navigate to the 'Beneficiaries' tab and click the 'Add Beneficiary' button. Fill in the required details like name, account number, bank name, and email address.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "If you forget your password, click on the 'Forgot password?' link on the login page. You'll receive instructions to reset your password via your registered email address.",
  },
  {
    question: "How do I enable two-factor authentication?",
    answer:
      "To enable two-factor authentication, go to the 'Settings' tab, select the 'Security' section, and toggle on the options under 'Two-Factor Authentication'. You can choose between authenticator app, SMS, or email verification.",
  },
  {
    question: "How do I report a suspicious transaction?",
    answer:
      "To report a suspicious transaction, go to the 'Transactions' tab, find the transaction in question, click on the three dots menu, and select 'Report Issue'. Follow the prompts to provide details about your concern.",
  },
  {
    question: "How do I set up automatic payments?",
    answer:
      "To set up automatic payments, go to the 'Settings' tab, select the 'Payment' section, and under 'Payment Preferences', choose your preferred option for 'Automatic Payments'. You can set it to pay the minimum balance or the full balance.",
  },
  {
    question: "How do I change my notification preferences?",
    answer:
      "To change notification preferences, go to the 'Settings' tab and select the 'Notifications' section. There, you can toggle different notification types and channels according to your preferences.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Your data is protected with industry-standard encryption and multiple layers of security. We use face ID verification, voice recognition, and two-factor authentication to ensure only you can access your account. All transactions are monitored for suspicious activity.",
  },
  {
    question: "How do I update my personal information?",
    answer:
      "To update your personal information, go to the 'Profile' tab and select the 'Personal Info' section. You can edit details like your address, phone number, and email. Don't forget to click 'Save Changes' after making updates.",
  },
  {
    question: "What are the fees for international transfers?",
    answer:
      "Fees for international transfers vary based on the destination country, transfer amount, and your account type. Generally, there's a base fee of $25 plus a percentage of the transfer amount. For detailed fee information, please contact customer support.",
  },
  {
    question: "How do I apply for a new credit card?",
    answer:
      "To apply for a new credit card, go to the 'Accounts' tab, scroll down to the 'Cards' section, and click on 'Manage Cards'. From there, select 'Apply for New Card' and follow the application process. You'll need to provide income details and consent to a credit check.",
  },
]

// Suggested questions for quick access
const suggestedQuestions = [
  "How do I check my account balance?",
  "How do I transfer money between accounts?",
  "How secure is my data?",
  "How do I enable two-factor authentication?",
]

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your SecureBank assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter FAQ data based on search query
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle sending a message
  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  // Get bot response based on user input
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Check for matches in FAQ data
    for (const faq of faqData) {
      if (
        faq.question.toLowerCase().includes(input) ||
        input.includes(faq.question.toLowerCase().split(" ").slice(2).join(" "))
      ) {
        return faq.answer
      }
    }

    // Check for common keywords
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! How can I assist you with your banking needs today?"
    }

    if (input.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?"
    }

    if (input.includes("bye") || input.includes("goodbye")) {
      return "Goodbye! Have a great day. Feel free to chat again if you need assistance."
    }

    if (input.includes("help")) {
      return "I can help with account information, transfers, security settings, and more. What specific information are you looking for?"
    }

    // Default response
    return "I'm not sure I understand. Could you rephrase your question? You can also try one of the suggested questions below."
  }

  // Handle key press in input field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-20 right-4 w-80 shadow-xl transition-all duration-300 ease-in-out",
            isExpanded ? "h-[80vh] md:h-[70vh] md:w-96" : "h-96",
          )}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-base">SecureBank Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </CardHeader>

          <div className="flex flex-col h-full">
            {/* Search bar */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* FAQ list when searching */}
            {searchQuery && (
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-2 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => {
                        handleSendMessage(faq.question)
                        setSearchQuery("")
                      }}
                    >
                      <p className="font-medium text-sm">{faq.question}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-4">No results found for "{searchQuery}"</p>
                )}
              </div>
            )}

            {/* Chat messages */}
            {!searchQuery && (
              <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted max-w-[80%] rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
            )}

            {/* Suggested questions */}
            {!searchQuery && messages.length < 3 && (
              <div className="px-3 py-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <CardFooter className="p-3 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button size="icon" onClick={() => handleSendMessage()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  )
}
