'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Share, MoreVertical, Send, PlusCircle, FileText } from 'lucide-react'
import posthog from 'posthog-js'

export default function MentoringSessionComponent() {
  const [messages, setMessages] = useState([
    { sender: 'mentor', content: "Hello! Welcome to our mentoring session. How can I help you today?" },
    { sender: 'mentee', content: "Hi Dr. Chen! I'm excited to discuss my AI project and get your insights." },
    { sender: 'mentor', content: "Great! I'd love to hear more about your project. Can you give me an overview of what you're working on?" },
    { sender: 'mentee', content: "I'm developing a machine learning model to predict customer churn for a SaaS company. I'm using historical customer data, but I'm having trouble with feature selection and model performance." },
    { sender: 'mentor', content: "That's an interesting project! Let's break it down and discuss your approach. First, what features are you currently considering for your model?" },
  ])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    posthog.capture('Sent Message', { sender: 'mentee' })
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'mentee', content: newMessage.trim() }])
      setNewMessage('')
    }
  }

  useEffect(() => {
    posthog.capture('Mentoring Session Page');
  }
  , []);

  return (
    <div className="flex flex-col mb-20 bg-white mx-auto border rounded container">
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/6.x/personas/svg?seed=Dr. Emily Chen" alt="Dr. Emily Chen" />
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">Dr. Emily Chen</h1>
            <p className="text-sm text-muted-foreground">AI Research Scientist & Tech Entrepreneur</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button variant="destructive" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="justify-start px-4 py-2 border-b">
              <TabsTrigger value="chat" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'mentor' ? 'justify-start' : 'justify-end'} mb-4`}>
                    <Card className={`max-w-[70%] ${message.sender === 'mentor' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                      <CardContent className="p-3">
                        <p>{message.content}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center space-x-2 mt-4">
                <Button variant="outline" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="flex-1 p-4">
              <ScrollArea className="h-full">
                <h2 className="text-lg font-semibold mb-4">Session Notes</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Project Overview</h3>
                    <p>- Developing ML model for customer churn prediction in SaaS</p>
                    <p>- Using historical customer data</p>
                    <p>- Challenges: feature selection and model performance</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Next Steps</h3>
                    <p>1. Review current feature set</p>
                    <p>2. Discuss feature engineering techniques</p>
                    <p>3. Explore advanced model architectures</p>
                    <p>4. Set up follow-up session for model evaluation</p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <aside className="w-64 border-l p-4 hidden lg:block">
          <h2 className="font-semibold mb-4">Session Info</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Duration</h3>
              <p className="text-sm text-muted-foreground">60 minutes</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Topic</h3>
              <p className="text-sm text-muted-foreground">AI Project Consultation</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Feature Selection Guide</li>
                <li>Model Performance Metrics</li>
                <li>Customer Churn Case Study</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}