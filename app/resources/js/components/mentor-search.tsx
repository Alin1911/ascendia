'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, DollarSign, Clock, Briefcase } from 'lucide-react'

export default function MentorSearchComponent() {
  const [priceRange, setPriceRange] = useState([0, 200])

  return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Find Your Perfect Mentor</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with filters */}
            <aside className="w-full md:w-1/4 space-y-6">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="search" placeholder="Search mentors..." className="pl-8" />
                </div>
              </div>
              <div>
                <Label>Expertise</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price Range (per hour)</Label>
                <Slider
                  min={0}
                  max={200}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span>RON{priceRange[0]}</span>
                  <span>RON{priceRange[1]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="available-now" />
                <Label htmlFor="available-now">Available Now</Label>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </aside>
            {/* Main content area with mentor cards */}
            <div className="w-full md:w-3/4 space-y-6">
              <MentorCard
                name="Alice Johnson"
                title="Business Strategy Consultant"
                rating={4.8}
                ratingCount={124}
                hourlyRate={85}
                expertise={['Business', 'Entrepreneurship', 'Marketing']}
                yearsOfExperience={12}
                availableNow={true}
              />
              <MentorCard
                name="David Lee"
                title="Senior Software Engineer"
                rating={4.9}
                ratingCount={89}
                hourlyRate={120}
                expertise={['Web Development', 'Machine Learning', 'Cloud Architecture']}
                yearsOfExperience={8}
                availableNow={false}
              />
              <MentorCard
                name="Emily Chen"
                title="UX/UI Design Lead"
                rating={4.7}
                ratingCount={56}
                hourlyRate={95}
                expertise={['User Experience', 'Product Design', 'Design Systems']}
                yearsOfExperience={6}
                availableNow={true}
              />
              {/* Add more MentorCard components as needed */}
            </div>
          </div>
        </div>
      </main>
  )
}

function MentorCard({ name, title, rating, ratingCount, hourlyRate, expertise, yearsOfExperience, availableNow }) {
  return (
    <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-4">
      <div className="md:w-1/4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      <div className="md:w-3/4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-muted-foreground">{title}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold">{rating}</span>
              <span className="ml-1 text-muted-foreground">({ratingCount})</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-semibold">{hourlyRate} RON /hr</span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
            <span>{yearsOfExperience} years experience</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span>{availableNow ? 'Available now' : 'Not available'}</span>
          </div>
        </div>
        <Button className="mt-4">Book a Session</Button>
      </div>
    </div>
  )
}