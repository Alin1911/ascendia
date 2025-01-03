'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Globe, Mail, MapPin, Phone, Star, Video } from 'lucide-react'
import posthog from 'posthog-js'

export default function MentorProfileComponent() {
  const { mentorId } = useParams(); // Get the mentorId from the URL
  const [mentor, setMentor] = useState(null); // State to store mentor data
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    // Fetch data when the component mounts
    posthog.capture('Mentor Profile Page');
    if (mentorId) {
      axios.get(`/api/v1/mentor/${mentorId}`)
        .then((response) => {
          setMentor(response.data); // Set mentor data from API response
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });
    }
  }, [mentorId]); // Dependency on mentorId to re-fetch if it changes

  if (!mentor) {
    return <div>Loading...</div>; // Loading state until mentor data is fetched
  }

  return (
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={`https://api.dicebear.com/6.x/personas/svg?seed=${mentor.name}`} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <p className="text-muted-foreground mt-1">{mentor.title}</p>
                    <div className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{mentor.location}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-muted-foreground ml-1">({mentor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="font-semibold">{mentor.hourlyRate} RON/hr</span>
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center">
                      <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{mentor.languages.join(', ')}</span>
                    </div>
                    <Button className="mt-6 w-full">Book a Session</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>emily.chen@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>Zoom, Google Meet, Skype</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{mentor.about}</p>
                    </CardContent>
                  </Card>
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {mentor.education.map((edu, index) => (
                          <li key={index} className="flex justify-between">
                            <div>
                              <p className="font-semibold">{edu.degree}</p>
                              <p className="text-muted-foreground">{edu.institution}</p>
                            </div>
                            <span>{edu.year}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-6">
                        {mentor.experience.map((exp, index) => (
                          <li key={index}>
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-muted-foreground">{exp.company} | {exp.period}</p>
                            <p className="mt-2">{exp.description}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="mentorship">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mentorship Areas</CardTitle>
                      <CardDescription>I specialize in guiding mentees in the following areas:</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mentor.mentorshipAreas.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <Clock className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Mentorship Approach</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        My mentorship style is hands-on and tailored to each mentee's unique goals and challenges. I believe in a combination of strategic guidance, practical advice, and actionable feedback. Our sessions will focus on:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Setting clear, achievable goals</li>
                        <li>Developing personalized learning and career roadmaps</li>
                        <li>Tackling real-world problems and case studies</li>
                        <li>Building a strong professional network</li>
                        <li>Cultivating leadership and communication skills</li>
                      </ul>
                      <p className="mt-4">
                        Whether you're looking to advance your AI career, launch a tech startup, or bridge the gap between research and industry, I'm here to support your journey and help you reach your full potential.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mentor.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Star className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
  )
}