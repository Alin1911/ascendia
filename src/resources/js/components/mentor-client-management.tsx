'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MessageSquare, Phone, Search, Star, User, Video } from 'lucide-react'

export default function MentorClientManagementComponent() {
  const [activeClients, setActiveClients] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "AJ",
      lastSession: "2023-06-10T14:00:00Z",
      nextSession: "2023-06-17T14:00:00Z",
      topic: "Career Transition to Tech",
      progress: "On Track"
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "BS",
      lastSession: "2023-06-12T10:00:00Z",
      nextSession: "2023-06-19T10:00:00Z",
      topic: "Leadership Skills Development",
      progress: "Needs Attention"
    }
  ])

  const [pastClients, setPastClients] = useState([
    {
      id: 3,
      name: "Carol White",
      avatar: "CW",
      lastSession: "2023-05-20T15:00:00Z",
      topic: "Startup Pitch Preparation",
      outcome: "Successfully Pitched"
    },
    {
      id: 4,
      name: "David Brown",
      avatar: "DB",
      lastSession: "2023-05-15T11:00:00Z",
      topic: "Machine Learning Project",
      outcome: "Project Completed"
    }
  ])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Client Management</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search clients..." className="w-64" />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <Button>
          <User className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Clients</TabsTrigger>
          <TabsTrigger value="past">Past Clients</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2">
            {activeClients.map((client) => (
              <ClientCard key={client.id} client={client} isActive={true} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-4 md:grid-cols-2">
            {pastClients.map((client) => (
              <ClientCard key={client.id} client={client} isActive={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ClientCard({ client, isActive }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.avatar}`} alt={client.name} />
          <AvatarFallback>{client.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{client.name}</CardTitle>
          <CardDescription>{client.topic}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {isActive ? "Next Session:" : "Last Session:"}
          </div>
          <span>{new Date(isActive ? client.nextSession : client.lastSession).toLocaleDateString()}</span>
        </div>
        {isActive ? (
          <Badge variant={client.progress === "On Track" ? "default" : "destructive"}>
            {client.progress}
          </Badge>
        ) : (
          <Badge variant="secondary">{client.outcome}</Badge>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        {isActive ? (
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schedule">Schedule Session</SelectItem>
              <SelectItem value="notes">View Notes</SelectItem>
              <SelectItem value="progress">Update Progress</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Button variant="outline">View Summary</Button>
        )}
      </CardFooter>
    </Card>
  )
}