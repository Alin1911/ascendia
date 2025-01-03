<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MentorController extends Controller
{

    public function show($id)
    {
        $mentor = [
            'name' => 'Dr. Emily Chen',
            'title' => 'AI Research Scientist & Tech Entrepreneur',
            'location' => 'San Francisco, CA',
            'rating' => 4.9,
            'reviewCount' => 127,
            'hourlyRate' => 150,
            'expertise' => [
                'Artificial Intelligence',
                'Machine Learning',
                'Data Science',
                'Tech Entrepreneurship'
            ],
            'languages' => [
                'English',
                'Mandarin Chinese'
            ],
            'about' => "With over 15 years of experience in AI and machine learning, I've led groundbreaking research projects and founded two successful tech startups. My passion lies in bridging the gap between cutting-edge AI research and practical business applications. I'm here to guide aspiring data scientists, AI engineers, and tech entrepreneurs on their journey to success.",
            'experience' => [
                [
                    'title' => 'Founder & CEO',
                    'company' => 'AInnova Tech',
                    'period' => '2018 - Present',
                    'description' => 'Leading a team of 50+ in developing AI-powered solutions for healthcare and finance sectors.'
                ],
                [
                    'title' => 'Senior Research Scientist',
                    'company' => 'Google AI',
                    'period' => '2012 - 2018',
                    'description' => 'Spearheaded research in natural language processing and computer vision, resulting in 20+ publications and 5 patents.'
                ],
                [
                    'title' => 'Postdoctoral Researcher',
                    'company' => 'Stanford University',
                    'period' => '2010 - 2012',
                    'description' => 'Conducted research on deep learning algorithms for medical image analysis.'
                ]
            ],
            'education' => [
                [
                    'degree' => 'Ph.D. in Computer Science',
                    'institution' => 'MIT',
                    'year' => '2010'
                ],
                [
                    'degree' => 'M.S. in Artificial Intelligence',
                    'institution' => 'Stanford University',
                    'year' => '2006'
                ],
                [
                    'degree' => 'B.S. in Computer Science',
                    'institution' => 'UC Berkeley',
                    'year' => '2004'
                ]
            ],
            'mentorshipAreas' => [
                'AI and Machine Learning Career Guidance',
                'Tech Startup Strategy and Execution',
                'Research to Product Translation',
                'Leadership in Tech',
                'Women in STEM Empowerment'
            ],
            'achievements' => [
                'Named in Forbes 30 Under 30 for Enterprise Technology (2015)',
                'Best Paper Award at NeurIPS 2017',
                'Raised $50M in venture capital for AInnova Tech',
                'TEDx speaker on "The Future of AI in Healthcare"',
                'Author of "AI Entrepreneurship: From Lab to Market" (2020)'
            ]
        ];

        return response()->json($mentor);
    }

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
