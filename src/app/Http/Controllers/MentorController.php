<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function search(Request $request)
    {
        // Filtrele primite (opțional)
        $searchQuery = $request->query('searchQuery', '');
        $expertise = $request->query('expertise', '');
        $priceRange = $request->query('priceRange', [0, 200]);
        $availableNow = $request->query('availableNow', false);

        // Datele de test
        $mentors = [
            [
                "id" => 1,
                "name" => "Alice Johnson",
                "title" => "Business Strategy Consultant",
                "rating" => 4.8,
                "ratingCount" => 124,
                "hourlyRate" => 85,
                "expertise" => ["Business", "Entrepreneurship", "Marketing"],
                "yearsOfExperience" => 12,
                "availableNow" => true,
            ],
            [
                "id" => 2,
                "name" => "David Lee",
                "title" => "Senior Software Engineer",
                "rating" => 4.9,
                "ratingCount" => 89,
                "hourlyRate" => 120,
                "expertise" => ["Web Development", "Machine Learning", "Cloud Architecture"],
                "yearsOfExperience" => 8,
                "availableNow" => false,
            ],
            [
                "id" => 3,
                "name" => "Emily Chen",
                "title" => "UX/UI Design Lead",
                "rating" => 4.7,
                "ratingCount" => 56,
                "hourlyRate" => 95,
                "expertise" => ["User Experience", "Product Design", "Design Systems"],
                "yearsOfExperience" => 6,
                "availableNow" => true,
            ],
        ];

        // Aplicarea filtrelor (doar pentru demonstrație)
        $filteredMentors = array_filter($mentors, function ($mentor) use ($searchQuery, $expertise, $priceRange, $availableNow) {
            $matchesSearch = !$searchQuery || stripos($mentor['name'], $searchQuery) !== false || stripos($mentor['title'], $searchQuery) !== false;
            $matchesExpertise = !$expertise || in_array($expertise, $mentor['expertise']);
            $matchesPrice = $mentor['hourlyRate'] >= $priceRange[0] && $mentor['hourlyRate'] <= $priceRange[1];
            $matchesAvailability = !$availableNow || $mentor['availableNow'];

            return $matchesSearch && $matchesExpertise && $matchesPrice && $matchesAvailability;
        });

        // Returnarea datelor ca JSON
        return response()->json(array_values($filteredMentors));
    }
}
