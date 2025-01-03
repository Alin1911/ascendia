import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Search, DollarSign, Clock, Briefcase } from "lucide-react";
import posthog from "posthog-js";

export default function MentorSearchComponent() {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [mentors, setMentors] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: searchParams.get("searchQuery") || "",
    expertise: "",
    availableNow: false,
  });

  useEffect(() => {
    posthog.capture("Mentor Search Page");

    const fetchMentors = async () => {
      try {
        const response = await axios.get("/mentors/search", {
          params: { ...searchFilters, priceRange },
        });
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [searchFilters, priceRange]);

  const handleFilterChange = (key, value) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Mentor</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 space-y-6">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search mentors..."
                  className="pl-8"
                  value={searchFilters.searchQuery}
                  onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Expertise</Label>
              <Select
                onValueChange={(value) => handleFilterChange("expertise", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="0">Any</SelectItem>
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
              <Switch
                id="available-now"
                checked={searchFilters.availableNow}
                onCheckedChange={(value) => handleFilterChange("availableNow", value)}
              />
              <Label htmlFor="available-now">Available Now</Label>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                console.log("Filters applied:", searchFilters, priceRange);
              }}
            >
              Apply Filters
            </Button>
          </aside>
          <div className="w-full md:w-3/4 space-y-6">
            {mentors.map((mentor, index) => (
              <MentorCard key={index} {...mentor} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function MentorCard({
  name,
  title,
  rating,
  ratingCount,
  hourlyRate,
  expertise,
  yearsOfExperience,
  availableNow,
}) {
  return (
    <div className="border rounded-lg p-6 flex flex-col md:flex-row gap-4">
      <div className="md:w-1/4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
            alt={name}
          />
          <AvatarFallback>
            {name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
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
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="ml-1 text-sm text-muted-foreground">
              {yearsOfExperience} years of experience
            </span>
          </div>
          {availableNow && (
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="ml-1 text-sm text-muted-foreground">
                Available now
              </span>
            </div>
          )}
        </div>
        <Button className="mt-4">Book a Session</Button>
      </div>
    </div>
  );
}
