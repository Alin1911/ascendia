'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Contact, MessageCircle, Video } from 'lucide-react'

export default function PurchasedSessionsComponent() {
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      mentor: "Dr. Emily Chen",
      topic: "AI Project Consultation",
      date: "2023-06-15T14:00:00Z",
      duration: 60,
      status: "Upcoming"
    },
    {
      id: 2,
      mentor: "John Smith",
      topic: "Career Development in Tech",
      date: "2023-06-18T10:00:00Z",
      duration: 45,
      status: "In Progress"
    }
  ])

  const [concludedSessions, setConcludedSessions] = useState([
    {
      id: 3,
      mentor: "Sarah Johnson",
      topic: "Machine Learning Basics",
      date: "2023-06-10T15:00:00Z",
      duration: 90,
      status: "Completed"
    },
    {
      id: 4,
      mentor: "Michael Brown",
      topic: "Startup Funding Strategies",
      date: "2023-06-05T11:00:00Z",
      duration: 60,
      status: "Completed"
    }
  ])

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Emily Chen",
      expertise: "AI Research",
      sessionsCompleted: 3
    },
    {
      id: 2,
      name: "John Smith",
      expertise: "Tech Career Coach",
      sessionsCompleted: 1
    },
    {
      id: 3,
      name: "Sarah Johnson",
      expertise: "Machine Learning Expert",
      sessionsCompleted: 2
    },
    {
      id: 4,
      name: "Michael Brown",
      expertise: "Startup Advisor",
      sessionsCompleted: 1
    }
  ])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Mentoring Sessions</h1>
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="concluded">Concluded Sessions</TabsTrigger>
          <TabsTrigger value="mentors">My Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2">
            {activeSessions.map((session) => (
              <SessionCard key={session.id} session={session} isActive={true} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="concluded">
          <div className="grid gap-4 md:grid-cols-2">
            {concludedSessions.map((session) => (
              <SessionCard key={session.id} session={session} isActive={false} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mentors">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SessionCard({ session, isActive }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.topic}</CardTitle>
        <CardDescription>with {session.mentor}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(session.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {session.duration} minutes
          </div>
        </div>
        <Badge className="mt-2" variant={session.status === "Upcoming" ? "outline" : session.status === "In Progress" ? "default" : "secondary"}>
          {session.status}
        </Badge>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Join Session
          </Button>
        ) : (
          <Button variant="outline" className="w-full">View Notes</Button>
        )}
      </CardFooter>
    </Card>
  )
}

function MentorCard({ mentor }) {
  return (
    <Card>
      <CardHeader>
        <Avatar className="h-12 w-12 mb-2">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${mentor.name}`} alt={mentor.name} />
          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle>{mentor.name}</CardTitle>
        <CardDescription>{mentor.expertise}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Sessions completed: {mentor.sessionsCompleted}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  )
}