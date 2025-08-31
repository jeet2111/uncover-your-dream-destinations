import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatInterface.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            text: "Hello! I'm your travel assistant. Please select an option:",
            sender: 'bot',
            options: [
                "Budget Planning",
                "Destination Guide",
                "Transportation",
                "Accommodation",
                "Activities & Attractions"
            ]
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Check authentication status
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null; // Or your auth check method
    };

    // Handle unauthorized access
    const handleUnauthorizedAccess = () => {
        setIsOpen(false);
        navigate('/login'); // Redirect to login page
    };

    const handleChatOpen = () => {
        if (!isAuthenticated()) {
            handleUnauthorizedAccess();
            return;
        }
        setIsOpen(true);
        // Initialize chat only if not already initialized
        if (messages.length === 0) {
            setMessages([
                {
                    text: "Hello! I'm your travel assistant. Please select an option:",
                    sender: 'bot',
                    options: [
                        "Budget Planning",
                        "Destination Guide",
                        "Transportation",
                        "Accommodation",
                        "Activities & Attractions"
                    ]
                }
            ]);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOptionSelect = (option) => {
        if (!isAuthenticated()) {
            handleUnauthorizedAccess();
            return;
        }
        // Add user's selection as a message
        setMessages(prev => [...prev, { text: option, sender: 'user' }]);

        // Get and show bot's response based on selection
        const response = getBotResponse(option);
        setTimeout(() => {
            setMessages(prev => [...prev, response]);
        }, 500);
    };

    const getBotResponse = (selectedOption) => {
        switch(selectedOption) {
            case "Budget Planning":
                return {
                    text: "What type of budget information would you like?",
                    sender: 'bot',
                    options: [
                        "Europe Travel Costs",
                        "Asia Travel Costs",
                        "Americas Travel Costs",
                        "Daily Budget Estimates"
                    ]
                };

            case "Europe Travel Costs":
                return {
                    text: "Typical daily budgets for Europe:\n" +
                          "• Budget: €50-70 (hostels, local food, public transport)\n" +
                          "• Mid-range: €100-150 (3-star hotels, restaurants)\n" +
                          "• Luxury: €200+ (4-5 star hotels, fine dining)\n\n" +
                          "Which aspect would you like to know more about?",
                    sender: 'bot',
                    options: [
                        "Europe Accommodation",
                        "Europe Transportation",
                        "Europe Food Costs",
                        "Europe Activities",
                        "Back to Main Menu"
                    ]
                };

            case "Europe Accommodation":
                return {
                    text: "Accommodation costs in Europe:\n" +
                          "• Hostels: €20-40/night\n" +
                          "• Budget Hotels: €50-80/night\n" +
                          "• Mid-range Hotels: €100-200/night\n" +
                          "• Luxury Hotels: €200+/night\n\n" +
                          "Would you like to know about specific countries?",
                    sender: 'bot',
                    options: [
                        "Western Europe Hotels",
                        "Eastern Europe Hotels",
                        "Mediterranean Hotels",
                        "Back to Europe Costs"
                    ]
                };

            case "Europe Transportation":
                return {
                    text: "Transportation options in Europe:\n" +
                          "• Train (Eurail Pass): €20-50/day\n" +
                          "• Budget Airlines: €30-100/flight\n" +
                          "• Local Transport: €5-10/day\n" +
                          "• Car Rental: €30-60/day\n\n" +
                          "What would you like to know more about?",
                    sender: 'bot',
                    options: [
                        "Train Travel Tips",
                        "Budget Airlines Info",
                        "Local Transport Guide",
                        "Back to Europe Costs"
                    ]
                };

            case "Asia Travel Costs":
                return {
                    text: "Typical daily budgets for Southeast Asia:\n" +
                          "• Budget: $25-35 (hostels, street food)\n" +
                          "• Mid-range: $50-80 (3-star hotels, restaurants)\n" +
                          "• Luxury: $150+ (luxury resorts, fine dining)\n\n" +
                          "What would you like to know more about?",
                    sender: 'bot',
                    options: [
                        "Asia Accommodation",
                        "Asia Transportation",
                        "Asia Food Costs",
                        "Asia Activities",
                        "Back to Main Menu"
                    ]
                };

            case "Asia Accommodation":
                return {
                    text: "Accommodation costs in Asia:\n" +
                          "• Hostels: $5-15/night\n" +
                          "• Budget Hotels: $20-40/night\n" +
                          "• Mid-range Hotels: $50-100/night\n" +
                          "• Luxury Hotels: $150+/night\n\n" +
                          "Select a region for specific information:",
                    sender: 'bot',
                    options: [
                        "Southeast Asia Hotels",
                        "East Asia Hotels",
                        "South Asia Hotels",
                        "Back to Asia Costs"
                    ]
                };

            case "Destination Guide":
                return {
                    text: "What type of destination interests you?",
                    sender: 'bot',
                    options: [
                        "Beach Destinations",
                        "Mountain Destinations",
                        "Cultural Cities",
                        "Adventure Travel",
                        "Island Getaways"
                    ]
                };

            case "Beach Destinations":
                return {
                    text: "Popular beach destinations:\n" +
                          "• Bali, Indonesia (Budget-friendly)\n" +
                          "• Maldives (Luxury)\n" +
                          "• Greek Islands (Mixed budget)\n" +
                          "• Thailand (Budget-friendly)\n\n" +
                          "What would you like to know about these destinations?",
                    sender: 'bot',
                    options: [
                        "Beach Destination Costs",
                        "Best Time to Visit",
                        "Beach Activities",
                        "Accommodation Options",
                        "Back to Destination Guide"
                    ]
                };

            case "Beach Activities":
                return {
                    text: "Popular beach activities and approximate costs:\n" +
                          "• Snorkeling: $20-40 per session\n" +
                          "• Scuba Diving: $60-120 per dive\n" +
                          "• Surfing Lessons: $30-50 per hour\n" +
                          "• Island Hopping: $40-100 per day\n\n" +
                          "Would you like specific information about:",
                    sender: 'bot',
                    options: [
                        "Water Sports Details",
                        "Beach Clubs",
                        "Boat Tours",
                        "Back to Beach Destinations"
                    ]
                };

            case "Mountain Destinations":
                return {
                    text: "Popular mountain destinations:\n" +
                          "• Swiss Alps (Luxury)\n" +
                          "• Nepal Himalayas (Budget-friendly)\n" +
                          "• Rocky Mountains (Mid-range)\n" +
                          "• Andes (Budget to Mid-range)\n\n" +
                          "What would you like to know?",
                    sender: 'bot',
                    options: [
                        "Mountain Activity Costs",
                        "Best Hiking Trails",
                        "Mountain Accommodation",
                        "Seasonal Information",
                        "Back to Destination Guide"
                    ]
                };

            case "Back to Main Menu":
                return {
                    text: "What would you like to know about?",
                    sender: 'bot',
                    options: [
                        "Budget Planning",
                        "Destination Guide",
                        "Transportation",
                        "Accommodation",
                        "Activities & Attractions"
                    ]
                };

            case "Transportation":
                return {
                    text: "Transportation options and costs:\n" +
                          "• Air Travel: Regional & international flights\n" +
                          "• Ground Transport: Trains, buses, cars\n" +
                          "• Local Transport: Public transit, taxis\n" +
                          "• Water Transport: Ferries, boats\n\n" +
                          "Select category for details:",
                    sender: 'bot',
                    options: [
                        "Air Travel Info",
                        "Ground Transport",
                        "Local Transport",
                        "Water Transport"
                    ]
                };

            case "Train Travel Tips":
                return {
                    text: "Essential train travel tips in Europe:\n" +
                          "• Book early for best prices (2-3 months ahead)\n" +
                          "• Eurail Pass costs: €190-€400 for 4-10 days\n" +
                          "• Night trains save accommodation costs\n" +
                          "• Most scenic routes: Swiss Alps, Norwegian fjords\n\n" +
                          "What specific information do you need?",
                    sender: 'bot',
                    options: [
                        "Eurail Pass Info",
                        "Booking Strategies",
                        "Popular Routes",
                        "Back to Transportation"
                    ]
                };

            case "Budget Airlines Info":
                return {
                    text: "Budget airline travel tips:\n" +
                          "• Popular carriers: Ryanair, EasyJet, WizzAir\n" +
                          "• Book 6-8 weeks ahead for best deals\n" +
                          "• Watch for extra fees (baggage, seat selection)\n" +
                          "• Average fares: €30-80 within Europe\n\n" +
                          "What would you like to know more about?",
                    sender: 'bot',
                    options: [
                        "Baggage Policies",
                        "Hidden Costs",
                        "Best Booking Times",
                        "Back to Transportation"
                    ]
                };

            case "Western Europe Hotels":
                return {
                    text: "Western Europe hotel costs by country:\n" +
                          "France:\n" +
                          "• Budget: €70-100\n" +
                          "• Mid-range: €120-200\n" +
                          "• Luxury: €250+\n\n" +
                          "Germany:\n" +
                          "• Budget: €60-90\n" +
                          "• Mid-range: €100-180\n" +
                          "• Luxury: €200+\n\n" +
                          "Select a country for more details:",
                    sender: 'bot',
                    options: [
                        "France Hotels",
                        "Germany Hotels",
                        "Netherlands Hotels",
                        "Back to Europe Accommodation"
                    ]
                };

            case "Southeast Asia Hotels":
                return {
                    text: "Southeast Asia accommodation by country:\n" +
                          "Thailand:\n" +
                          "• Hostels: $8-15\n" +
                          "• Budget hotels: $20-35\n" +
                          "• Mid-range: $40-80\n" +
                          "• Luxury: $100+\n\n" +
                          "Vietnam:\n" +
                          "• Hostels: $5-10\n" +
                          "• Budget hotels: $15-30\n" +
                          "• Mid-range: $35-70\n" +
                          "• Luxury: $80+\n\n" +
                          "Select a country:",
                    sender: 'bot',
                    options: [
                        "Thailand Details",
                        "Vietnam Details",
                        "Indonesia Details",
                        "Back to Asia Accommodation"
                    ]
                };

            case "Water Sports Details":
                return {
                    text: "Popular water sports and costs:\n" +
                          "Scuba Diving:\n" +
                          "• Discover Scuba: $80-120\n" +
                          "• PADI certification: $350-500\n" +
                          "• Fun dive: $60-100\n\n" +
                          "Surfing:\n" +
                          "• Board rental: $10-20/day\n" +
                          "• Group lesson: $30-50\n" +
                          "• Private lesson: $60-100\n\n" +
                          "Select activity for more info:",
                    sender: 'bot',
                    options: [
                        "Diving Locations",
                        "Surfing Spots",
                        "Snorkeling Tours",
                        "Back to Beach Activities"
                    ]
                };

            case "Best Hiking Trails":
                return {
                    text: "Popular hiking destinations and costs:\n" +
                          "Nepal Himalayas:\n" +
                          "• Everest Base Camp: $1500-2500 (14-16 days)\n" +
                          "• Annapurna Circuit: $1000-2000 (12-14 days)\n\n" +
                          "European Alps:\n" +
                          "• Tour du Mont Blanc: €1500-2500 (7-10 days)\n" +
                          "• Haute Route: €1800-2800 (12-14 days)\n\n" +
                          "Select region for trail details:",
                    sender: 'bot',
                    options: [
                        "Himalayan Treks",
                        "Alpine Trails",
                        "Andes Treks",
                        "Back to Mountain Destinations"
                    ]
                };

            case "Air Travel Tips":
                return {
                    text: "Essential air travel tips:\n" +
                          "• Book 3-6 months ahead for best deals\n" +
                          "• Tuesday/Wednesday flights often cheaper\n" +
                          "• Off-season travel saves 20-40%\n" +
                          "• Use flight comparison tools\n\n" +
                          "What would you like to know more about?",
                    sender: 'bot',
                    options: [
                        "Booking Strategies",
                        "Airline Comparisons",
                        "Seasonal Prices",
                        "Back to Transportation"
                    ]
                };

            case "Local Transport Guide":
                return {
                    text: "Local transportation options and costs:\n" +
                          "Europe:\n" +
                          "• Metro/Bus passes: €5-15/day\n" +
                          "• City cards: €20-40/day\n\n" +
                          "Asia:\n" +
                          "• Local buses: $0.50-2/ride\n" +
                          "• Metro systems: $0.50-3/ride\n" +
                          "• Tuk-tuks/rickshaws: $2-5/ride\n\n" +
                          "Select region for details:",
                    sender: 'bot',
                    options: [
                        "Europe Transport",
                        "Asia Transport",
                        "Americas Transport",
                        "Back to Transportation"
                    ]
                };

            case "Seasonal Information":
                return {
                    text: "Best times to visit mountain destinations:\n" +
                          "Summer (June-August):\n" +
                          "• Perfect for hiking and climbing\n" +
                          "• Most trails are open\n" +
                          "• Peak season prices\n\n" +
                          "Winter (December-February):\n" +
                          "• Ideal for winter sports\n" +
                          "• Higher accommodation costs\n" +
                          "• Some trails closed\n\n" +
                          "Choose a season for details:",
                    sender: 'bot',
                    options: [
                        "Summer Activities",
                        "Winter Sports",
                        "Spring Hiking",
                        "Back to Mountain Destinations"
                    ]
                };

            case "Mountain Accommodation":
                return {
                    text: "Mountain accommodation options:\n" +
                          "• Mountain Huts: $20-50/night\n" +
                          "• Alpine Hotels: $100-300/night\n" +
                          "• Ski Resorts: $200-500/night\n" +
                          "• Camping: $5-20/night\n\n" +
                          "Select accommodation type:",
                    sender: 'bot',
                    options: [
                        "Mountain Hut Info",
                        "Ski Resorts",
                        "Camping Guide",
                        "Back to Mountain Destinations"
                    ]
                };

            case "Cultural Cities":
                return {
                    text: "Popular cultural destinations:\n" +
                          "Europe:\n" +
                          "• Paris, Rome, Barcelona\n" +
                          "Asia:\n" +
                          "• Kyoto, Bangkok, Seoul\n" +
                          "Americas:\n" +
                          "• Mexico City, Cusco, Boston\n\n" +
                          "Choose region for details:",
                    sender: 'bot',
                    options: [
                        "European Cities",
                        "Asian Cities",
                        "American Cities",
                        "Back to Destination Guide"
                    ]
                };

            case "European Cities":
                return {
                    text: "European cultural cities costs:\n" +
                          "Paris:\n" +
                          "• Museums: €12-20\n" +
                          "• City passes: €45-75/day\n" +
                          "• Guided tours: €30-60\n\n" +
                          "Rome:\n" +
                          "• Attractions: €15-25\n" +
                          "• City passes: €40-70/day\n" +
                          "Select city for details:",
                    sender: 'bot',
                    options: [
                        "Paris Guide",
                        "Rome Guide",
                        "Barcelona Guide",
                        "Back to Cultural Cities"
                    ]
                };

            case "Asian Cities":
                return {
                    text: "Asian cultural cities costs:\n" +
                          "Kyoto:\n" +
                          "• Temples: ¥500-1500\n" +
                          "• Tea ceremonies: ¥3000-5000\n" +
                          "• Cultural tours: ¥5000-10000\n\n" +
                          "Bangkok:\n" +
                          "• Temples: 100-500 baht\n" +
                          "• Cultural shows: 1000-2000 baht\n",
                    sender: 'bot',
                    options: [
                        "Kyoto Guide",
                        "Bangkok Guide",
                        "Seoul Guide",
                        "Back to Cultural Cities"
                    ]
                };

            case "Adventure Travel":
                return {
                    text: "Adventure travel options:\n" +
                          "• Trekking & Hiking\n" +
                          "• Water Sports\n" +
                          "• Safari & Wildlife\n" +
                          "• Extreme Sports\n\n" +
                          "Select adventure type:",
                    sender: 'bot',
                    options: [
                        "Trekking Options",
                        "Water Adventures",
                        "Wildlife Safaris",
                        "Back to Destination Guide"
                    ]
                };

            case "Trekking Options":
                return {
                    text: "Popular trekking destinations and costs:\n" +
                          "• Everest Base Camp: $1500-2500 (15 days)\n" +
                          "• Inca Trail: $700-1000 (4 days)\n" +
                          "• Kilimanjaro: $2000-4000 (7 days)\n" +
                          "• Tour du Mont Blanc: €1500-2500 (11 days)\n",
                    sender: 'bot',
                    options: [
                        "Nepal Treks",
                        "Peru Treks",
                        "Africa Treks",
                        "Back to Adventure Travel"
                    ]
                };

            case "Wildlife Safaris":
                return {
                    text: "Safari destinations and costs:\n" +
                          "East Africa:\n" +
                          "• Budget: $200-300/day\n" +
                          "• Mid-range: $400-600/day\n" +
                          "• Luxury: $800+/day\n\n" +
                          "South Africa:\n" +
                          "• Budget: $150-250/day\n" +
                          "• Mid-range: $300-500/day\n" +
                          "• Luxury: $700+/day\n",
                    sender: 'bot',
                    options: [
                        "Kenya Safaris",
                        "Tanzania Safaris",
                        "South Africa Safaris",
                        "Back to Adventure Travel"
                    ]
                };

            case "Island Getaways":
                return {
                    text: "Popular island destinations:\n" +
                          "Maldives:\n" +
                          "• Budget: $150-200/day\n" +
                          "• Mid-range: $300-500/day\n" +
                          "• Luxury: $1000+/day\n\n" +
                          "Caribbean:\n" +
                          "• Budget: $100-150/day\n" +
                          "• Mid-range: $200-400/day\n" +
                          "• Luxury: $500+/day\n",
                    sender: 'bot',
                    options: [
                        "Maldives Guide",
                        "Caribbean Islands",
                        "Greek Islands",
                        "Back to Destination Guide"
                    ]
                };

            case "Daily Budget Estimates":
                return {
                    text: "Daily budget estimates by region:\n" +
                          "Western Europe:\n" +
                          "• Budget: €50-70\n" +
                          "• Mid-range: €100-150\n" +
                          "• Luxury: €200+\n\n" +
                          "Southeast Asia:\n" +
                          "• Budget: $25-35\n" +
                          "• Mid-range: $50-80\n" +
                          "• Luxury: $150+\n",
                    sender: 'bot',
                    options: [
                        "Europe Budgets",
                        "Asia Budgets",
                        "Americas Budgets",
                        "Back to Budget Planning"
                    ]
                };

            case "Paris Guide":
                return {
                    text: "Paris travel guide:\n" +
                          "Daily Costs:\n" +
                          "• Budget: €70-100\n" +
                          "• Mid-range: €150-200\n" +
                          "• Luxury: €300+\n\n" +
                          "Main Attractions:\n" +
                          "• Eiffel Tower: €26.10\n" +
                          "• Louvre: €17\n" +
                          "• Palace of Versailles: €18-27\n",
                    sender: 'bot',
                    options: [
                        "Paris Accommodation",
                        "Paris Transport",
                        "Paris Food Guide",
                        "Back to European Cities"
                    ]
                };

            case "Rome Guide":
                return {
                    text: "Rome travel guide:\n" +
                          "Daily Costs:\n" +
                          "• Budget: €60-90\n" +
                          "• Mid-range: €120-180\n" +
                          "• Luxury: €250+\n\n" +
                          "Main Attractions:\n" +
                          "• Colosseum: €16\n" +
                          "• Vatican Museums: €17\n" +
                          "• Roma Pass: €32 (48h)\n",
                    sender: 'bot',
                    options: [
                        "Rome Accommodation",
                        "Rome Transport",
                        "Rome Food Guide",
                        "Back to European Cities"
                    ]
                };

            case "Bangkok Guide":
                return {
                    text: "Bangkok travel guide:\n" +
                          "Daily Costs:\n" +
                          "• Budget: $30-50\n" +
                          "• Mid-range: $80-150\n" +
                          "• Luxury: $200+\n\n" +
                          "Main Attractions:\n" +
                          "• Grand Palace: 500 baht\n" +
                          "• Wat Pho: 200 baht\n" +
                          "• River boat: 50 baht\n",
                    sender: 'bot',
                    options: [
                        "Bangkok Hotels",
                        "Bangkok Transport",
                        "Bangkok Food",
                        "Back to Asian Cities"
                    ]
                };

            case "Maldives Guide":
                return {
                    text: "Maldives travel guide:\n" +
                          "Resort Costs:\n" +
                          "• Budget: $150-250/night\n" +
                          "• Mid-range: $300-500/night\n" +
                          "• Luxury: $800+/night\n\n" +
                          "Activities:\n" +
                          "• Snorkeling: $30-50\n" +
                          "• Diving: $100-150\n" +
                          "• Island hopping: $150-200\n",
                    sender: 'bot',
                    options: [
                        "Maldives Resorts",
                        "Best Time to Visit",
                        "Activity Packages",
                        "Back to Island Getaways"
                    ]
                };

            case "Caribbean Islands":
                return {
                    text: "Caribbean islands guide:\n" +
                          "Popular destinations:\n" +
                          "Jamaica:\n" +
                          "• Budget: $100-150/day\n" +
                          "• Mid-range: $200-300/day\n" +
                          "Bahamas:\n" +
                          "• Budget: $150-200/day\n" +
                          "• Mid-range: $300-400/day\n",
                    sender: 'bot',
                    options: [
                        "Jamaica Guide",
                        "Bahamas Guide",
                        "Dominican Republic",
                        "Back to Island Getaways"
                    ]
                };

            case "Nepal Treks":
                return {
                    text: "Nepal trekking guide:\n" +
                          "Popular treks:\n" +
                          "Everest Base Camp:\n" +
                          "• Duration: 12-14 days\n" +
                          "• Cost: $1500-2500\n" +
                          "Annapurna Circuit:\n" +
                          "• Duration: 10-12 days\n" +
                          "• Cost: $1000-1800\n",
                    sender: 'bot',
                    options: [
                        "EBC Details",
                        "Annapurna Details",
                        "Trekking Seasons",
                        "Back to Trekking Options"
                    ]
                };

            case "Europe Budgets":
                return {
                    text: "Detailed Europe budget breakdown:\n" +
                          "Western Europe (daily):\n" +
                          "• Hostel: €20-40\n" +
                          "• Food: €20-30\n" +
                          "• Transport: €10-15\n" +
                          "Eastern Europe (daily):\n" +
                          "• Hostel: €10-20\n" +
                          "• Food: €15-25\n" +
                          "• Transport: €5-10\n",
                    sender: 'bot',
                    options: [
                        "Western Europe",
                        "Eastern Europe",
                        "Nordic Countries",
                        "Back to Daily Budget Estimates"
                    ]
                };

            case "Bangkok Food":
                return {
                    text: "Bangkok food guide:\n" +
                          "Street Food:\n" +
                          "• Pad Thai: 40-60 baht\n" +
                          "• Som Tam: 40-50 baht\n" +
                          "• Mango sticky rice: 80-100 baht\n" +
                          "Restaurants:\n" +
                          "• Local: 150-300 baht/meal\n" +
                          "• Mid-range: 300-600 baht/meal\n" +
                          "• High-end: 1000+ baht/meal\n",
                    sender: 'bot',
                    options: [
                        "Street Food Areas",
                        "Restaurant Guide",
                        "Food Tours",
                        "Back to Bangkok Guide"
                    ]
                };

            case "Bangkok Transport":
                return {
                    text: "Bangkok transport guide:\n" +
                          "Public Transport:\n" +
                          "• BTS Skytrain: 15-52 baht\n" +
                          "• MRT Subway: 16-70 baht\n" +
                          "• River boat: 10-40 baht\n" +
                          "Other Options:\n" +
                          "• Taxi: Start 35 baht\n" +
                          "• Tuk-tuk: 150-300 baht/trip\n" +
                          "• Grab: Similar to taxi\n",
                    sender: 'bot',
                    options: [
                        "BTS/MRT Guide",
                        "Taxi Tips",
                        "Airport Transfer",
                        "Back to Bangkok Guide"
                    ]
                };

            case "Maldives Resorts":
                return {
                    text: "Maldives resort guide:\n" +
                          "Budget Options ($150-250/night):\n" +
                          "• Local islands\n" +
                          "• Guesthouses\n\n" +
                          "Mid-range ($300-500/night):\n" +
                          "• 4-star resorts\n" +
                          "• Water villas\n\n" +
                          "Luxury ($800+/night):\n" +
                          "• 5-star resorts\n" +
                          "• Premium water villas\n",
                    sender: 'bot',
                    options: [
                        "Budget Stays",
                        "Luxury Resorts",
                        "All-Inclusive",
                        "Back to Maldives Guide"
                    ]
                };

            case "Accommodation":
                return {
                    text: "What type of accommodation information do you need?\n" +
                          "Current average prices by category:\n" +
                          "• Hotels: $50-500/night\n" +
                          "• Hostels: $10-50/night\n" +
                          "• Resorts: $150-1000+/night\n" +
                          "• Vacation Rentals: $40-300/night\n",
                    sender: 'bot',
                    options: [
                        "Hotel Options",
                        "Hostel Guide",
                        "Resort Packages",
                        "Vacation Rentals"
                    ]
                };

            case "Hotel Options":
                return {
                    text: "Hotel categories and typical prices:\n" +
                          "Budget Hotels:\n" +
                          "• Europe: €50-80\n" +
                          "• Asia: $30-50\n" +
                          "• Americas: $60-100\n\n" +
                          "Mid-range Hotels:\n" +
                          "• Europe: €100-200\n" +
                          "• Asia: $80-150\n" +
                          "• Americas: $120-250\n",
                    sender: 'bot',
                    options: [
                        "Budget Hotels",
                        "Mid-range Hotels",
                        "Luxury Hotels",
                        "Back to Accommodation"
                    ]
                };

            case "Budget Hotels":
                return {
                    text: "Budget hotel details by region:\n" +
                          "Europe:\n" +
                          "• Basic room: €50-70\n" +
                          "• Double room: €60-80\n" +
                          "• Includes: WiFi, basic breakfast\n\n" +
                          "Asia:\n" +
                          "• Basic room: $25-35\n" +
                          "• Double room: $30-45\n" +
                          "• Includes: AC, WiFi\n",
                    sender: 'bot',
                    options: [
                        "Europe Budget Hotels",
                        "Asia Budget Hotels",
                        "Americas Budget Hotels",
                        "Back to Hotel Options"
                    ]
                };

            case "Hostel Guide":
                return {
                    text: "Hostel accommodation guide:\n" +
                          "Dorm Rooms:\n" +
                          "• Europe: €15-30/night\n" +
                          "• Asia: $5-15/night\n" +
                          "• Americas: $15-25/night\n\n" +
                          "Private Rooms:\n" +
                          "• Europe: €40-60/night\n" +
                          "• Asia: $20-35/night\n" +
                          "• Americas: $40-70/night\n",
                    sender: 'bot',
                    options: [
                        "Dorm Room Info",
                        "Private Room Info",
                        "Hostel Amenities",
                        "Back to Accommodation"
                    ]
                };

            case "Ground Transport":
                return {
                    text: "Ground transportation options:\n" +
                          "Train Travel:\n" +
                          "• Europe: €30-100/journey\n" +
                          "• Asia: $5-50/journey\n\n" +
                          "Bus Travel:\n" +
                          "• Europe: €15-40/journey\n" +
                          "• Asia: $3-20/journey\n\n" +
                          "Car Rental:\n" +
                          "• Europe: €30-70/day\n" +
                          "• USA: $40-80/day\n",
                    sender: 'bot',
                    options: [
                        "Train Details",
                        "Bus Services",
                        "Car Rental Info",
                        "Back to Transportation"
                    ]
                };

            case "Car Rental Info":
                return {
                    text: "Car rental information:\n" +
                          "Daily Rates:\n" +
                          "• Economy: $30-50\n" +
                          "• Mid-size: $50-80\n" +
                          "• SUV: $70-120\n\n" +
                          "Additional Costs:\n" +
                          "• Insurance: $15-30/day\n" +
                          "• Fuel deposit: $100-200\n" +
                          "• Extra driver: $10-15/day\n",
                    sender: 'bot',
                    options: [
                        "Rental Requirements",
                        "Insurance Options",
                        "Best Rental Companies",
                        "Back to Ground Transport"
                    ]
                };

            case "Rental Requirements":
                return {
                    text: "Car rental requirements:\n" +
                          "Documents Needed:\n" +
                          "• Valid driver's license\n" +
                          "• Credit card in renter's name\n" +
                          "• Passport for international rentals\n\n" +
                          "Age Requirements:\n" +
                          "• Minimum age: 21-25\n" +
                          "• Under 25 fee may apply\n",
                    sender: 'bot',
                    options: [
                        "Age Restrictions",
                        "Payment Methods",
                        "Required Documents",
                        "Back to Car Rental Info"
                    ]
                };

            case "Air Travel Info":
                return {
                    text: "Air travel guide:\n" +
                          "Average Flight Costs:\n" +
                          "• Domestic: $150-400\n" +
                          "• Europe Internal: €50-200\n" +
                          "• International: $500-1500\n\n" +
                          "Best Booking Times:\n" +
                          "• Domestic: 1-3 months ahead\n" +
                          "• International: 2-8 months ahead\n",
                    sender: 'bot',
                    options: [
                        "Flight Booking Tips",
                        "Airline Comparison",
                        "Airport Guides",
                        "Back to Transportation"
                    ]
                };

            case "Local Transport":
                return {
                    text: "Local transportation guide:\n" +
                          "Public Transit:\n" +
                          "• Metro/Subway: $1-5 per ride\n" +
                          "• Bus: $1-3 per ride\n" +
                          "• Daily passes: $5-15\n\n" +
                          "Taxi/Ride-share:\n" +
                          "• Base fare: $2-5\n" +
                          "• Per km/mile: $1-3\n" +
                          "• Airport transfer: $20-50\n",
                    sender: 'bot',
                    options: [
                        "Public Transit Info",
                        "Taxi Services",
                        "Bike Rentals",
                        "Back to Transportation"
                    ]
                };

            case "Flight Booking Tips":
                return {
                    text: "Smart flight booking strategies:\n" +
                          "Best Times to Book:\n" +
                          "• Domestic: Tuesday/Wednesday, 3-6 months ahead\n" +
                          "• International: 4-8 months ahead\n" +
                          "• Holiday travel: 6-10 months ahead\n\n" +
                          "Money-Saving Tips:\n" +
                          "• Use incognito mode\n" +
                          "• Book mid-week flights\n" +
                          "• Compare multiple sites\n",
                    sender: 'bot',
                    options: [
                        "Best Booking Sites",
                        "Airline Rewards",
                        "Baggage Tips",
                        "Back to Air Travel Info"
                    ]
                };

            case "Best Booking Sites":
                return {
                    text: "Recommended flight booking websites:\n" +
                          "Search Engines:\n" +
                          "• Skyscanner: Best for flexible dates\n" +
                          "• Google Flights: Good price tracking\n" +
                          "• Momondo: Extensive search options\n\n" +
                          "OTA Sites:\n" +
                          "• Expedia: Package deals\n" +
                          "• Priceline: Name your price\n",
                    sender: 'bot',
                    options: [
                        "Price Tracking",
                        "Booking Strategies",
                        "Site Comparisons",
                        "Back to Flight Booking Tips"
                    ]
                };

            case "Public Transit Info":
                return {
                    text: "Public transportation guide:\n" +
                          "Metro Systems:\n" +
                          "• Paris Metro: €1.90/ticket\n" +
                          "• London Tube: £2.50-5.50/ride\n" +
                          "• NYC Subway: $2.90/ride\n\n" +
                          "Tourist Passes:\n" +
                          "• Paris Visite: €13.20/day\n" +
                          "• London Oyster: £7.70/day cap\n" +
                          "• NYC MetroCard: $34/7-days\n",
                    sender: 'bot',
                    options: [
                        "City Transit Passes",
                        "Airport Connections",
                        "Night Services",
                        "Back to Local Transport"
                    ]
                };

            case "Resort Packages":
                return {
                    text: "Resort vacation packages:\n" +
                          "All-Inclusive Resorts:\n" +
                          "• Caribbean: $200-500/night\n" +
                          "• Mexico: $150-400/night\n" +
                          "• Maldives: $400-1000+/night\n\n" +
                          "What's Included:\n" +
                          "• Meals and drinks\n" +
                          "• Basic activities\n" +
                          "• Entertainment\n",
                    sender: 'bot',
                    options: [
                        "Caribbean Resorts",
                        "Mexico Resorts",
                        "Luxury Resorts",
                        "Back to Accommodation"
                    ]
                };

            case "Vacation Rentals":
                return {
                    text: "Vacation rental options:\n" +
                          "Apartment/House Rentals:\n" +
                          "• Europe: €80-200/night\n" +
                          "• USA: $100-300/night\n" +
                          "• Asia: $50-150/night\n\n" +
                          "Booking Tips:\n" +
                          "• Book early for best selection\n" +
                          "• Read reviews carefully\n" +
                          "• Check cancellation policies\n",
                    sender: 'bot',
                    options: [
                        "Rental Platforms",
                        "Booking Tips",
                        "Safety Guidelines",
                        "Back to Accommodation"
                    ]
                };

            case "Rental Platforms":
                return {
                    text: "Popular rental platforms comparison:\n" +
                          "Airbnb:\n" +
                          "• Largest selection\n" +
                          "• Service fees: 14-16%\n\n" +
                          "VRBO:\n" +
                          "• Entire homes only\n" +
                          "• Service fees: 6-12%\n\n" +
                          "Booking.com:\n" +
                          "• Apartments and apart-hotels\n" +
                          "• No guest service fees\n",
                    sender: 'bot',
                    options: [
                        "Platform Features",
                        "Fee Comparisons",
                        "Booking Protection",
                        "Back to Vacation Rentals"
                    ]
                };

            case "Water Transport":
                return {
                    text: "Water transportation options:\n" +
                          "Ferry Services:\n" +
                          "• Greek Islands: €20-40/route\n" +
                          "• Thailand Islands: $10-20/route\n" +
                          "• Venice Water Bus: €7.50/ride\n\n" +
                          "Cruise Options:\n" +
                          "• Caribbean: $100-200/day\n" +
                          "• Mediterranean: €120-250/day\n" +
                          "• River Cruises: $200-400/day\n",
                    sender: 'bot',
                    options: [
                        "Ferry Routes",
                        "Cruise Options",
                        "Water Taxis",
                        "Back to Transportation"
                    ]
                };

            case "Cruise Options":
                return {
                    text: "Cruise vacation guide:\n" +
                          "Caribbean Cruises:\n" +
                          "• 3-4 days: $200-400/person\n" +
                          "• 7 days: $500-1000/person\n\n" +
                          "Mediterranean Cruises:\n" +
                          "• 7 days: €700-1500/person\n" +
                          "• 10-14 days: €1000-2000/person\n\n" +
                          "What's Included:\n" +
                          "• Accommodation\n" +
                          "• Meals\n" +
                          "• Entertainment\n",
                    sender: 'bot',
                    options: [
                        "Cruise Lines",
                        "Cabin Types",
                        "Shore Excursions",
                        "Back to Water Transport"
                    ]
                };

            case "Insurance Options":
                return {
                    text: "Travel insurance guide:\n" +
                          "Basic Coverage:\n" +
                          "• Trip cancellation\n" +
                          "• Medical emergency\n" +
                          "• Lost baggage\n\n" +
                          "Costs:\n" +
                          "• Basic: 4-6% of trip cost\n" +
                          "• Comprehensive: 6-12% of trip cost\n" +
                          "• Annual plans: $200-500\n",
                    sender: 'bot',
                    options: [
                        "Coverage Types",
                        "Best Providers",
                        "Claim Process",
                        "Back to Car Rental Info"
                    ]
                };

            case "Coverage Types":
                return {
                    text: "Travel insurance coverage types:\n" +
                          "1. Basic Coverage:\n" +
                          "• Trip cancellation: Up to 100% refund\n" +
                          "• Medical: $50,000-100,000\n" +
                          "• Baggage: $500-1000\n\n" +
                          "2. Comprehensive Coverage:\n" +
                          "• All basic coverage plus:\n" +
                          "• Trip interruption: 150% of cost\n" +
                          "• Emergency evacuation\n" +
                          "• Rental car damage\n",
                    sender: 'bot',
                    options: [
                        "Medical Coverage",
                        "Cancellation Policy",
                        "Back to Insurance Options"
                    ]
                };

            case "Medical Coverage":
                return {
                    text: "Travel medical insurance details:\n" +
                          "Coverage Levels:\n" +
                          "• Basic: $50,000\n" +
                          "• Standard: $100,000\n" +
                          "• Premium: $500,000+\n\n" +
                          "What's Covered:\n" +
                          "• Emergency medical treatment\n" +
                          "• Hospital stays\n" +
                          "• Prescription medication\n" +
                          "• Emergency dental\n",
                    sender: 'bot',
                    options: [
                        "Coverage Limits",
                        "Pre-existing Conditions",
                        "Back to Coverage Types"
                    ]
                };

            case "Cruise Lines":
                return {
                    text: "Major cruise line comparison:\n" +
                          "Budget-Friendly:\n" +
                          "• Carnival: $70-150/day\n" +
                          "• MSC: $80-160/day\n\n" +
                          "Mid-Range:\n" +
                          "• Royal Caribbean: $100-200/day\n" +
                          "• Norwegian: $120-220/day\n\n" +
                          "Luxury:\n" +
                          "• Celebrity: $150-300/day\n" +
                          "• Princess: $200-400/day\n",
                    sender: 'bot',
                    options: [
                        "Budget Cruises",
                        "Luxury Cruises",
                        "Back to Cruise Options"
                    ]
                };

            case "Cabin Types":
                return {
                    text: "Cruise cabin categories:\n" +
                          "Interior Cabins:\n" +
                          "• Size: 150-185 sq ft\n" +
                          "• Cost: Lowest fare\n" +
                          "• Best for: Budget travelers\n\n" +
                          "Ocean View:\n" +
                          "• Size: 160-200 sq ft\n" +
                          "• Cost: 15-30% more than interior\n\n" +
                          "Balcony:\n" +
                          "• Size: 175-220 sq ft\n" +
                          "• Cost: 30-50% more than interior\n" +
                          "• Best for: Scenic cruising\n",
                    sender: 'bot',
                    options: [
                        "Interior Details",
                        "Balcony Details",
                        "Back to Cruise Lines"
                    ]
                };

            case "Ferry Routes":
                return {
                    text: "Popular ferry routes and prices:\n" +
                          "Greek Islands:\n" +
                          "• Athens to Santorini: €40-60\n" +
                          "• Mykonos to Santorini: €35-50\n\n" +
                          "Thailand:\n" +
                          "• Phuket to Phi Phi: $15-25\n" +
                          "• Samui to Phangan: $10-15\n\n" +
                          "Italy:\n" +
                          "• Naples to Capri: €20-25\n" +
                          "• Venice to Croatia: €65-85\n",
                    sender: 'bot',
                    options: [
                        "Greek Routes",
                        "Thai Routes",
                        "Back to Water Transport"
                    ]
                };

            case "Greek Routes":
                return {
                    text: "Greek island ferry routes:\n" +
                          "Cyclades Routes:\n" +
                          "• Athens - Santorini: 5-8 hrs\n" +
                          "• Athens - Mykonos: 3-5 hrs\n" +
                          "• Mykonos - Santorini: 2-3 hrs\n\n" +
                          "Prices:\n" +
                          "• Economy: €35-60\n" +
                          "• Business: €50-80\n" +
                          "• VIP: €70-100\n",
                    sender: 'bot',
                    options: [
                        "Ferry Companies",
                        "Booking Tips",
                        "Back to Ferry Routes"
                    ]
                };

            case "Platform Features":
                return {
                    text: "Vacation rental platform features:\n" +
                          "Airbnb:\n" +
                          "• Instant booking\n" +
                          "• Superhost properties\n" +
                          "• Experience bookings\n\n" +
                          "VRBO:\n" +
                          "• Entire homes only\n" +
                          "• Book with Confidence Guarantee\n" +
                          "• Trip Board planning\n\n" +
                          "Booking.com:\n" +
                          "• Free cancellation options\n" +
                          "• Apartment-style stays\n" +
                          "• Loyalty program\n",
                    sender: 'bot',
                    options: [
                        "Booking Protection",
                        "Payment Options",
                        "Back to Rental Platforms"
                    ]
                };

            case "Booking Protection":
                return {
                    text: "Rental booking protection details:\n" +
                          "Airbnb AirCover:\n" +
                          "• Booking protection guarantee\n" +
                          "• Check-in guarantee\n" +
                          "• Get-what-you-booked guarantee\n\n" +
                          "VRBO Protection:\n" +
                          "• Payment protection\n" +
                          "• Lodging guarantee\n" +
                          "• Fraud screening\n",
                    sender: 'bot',
                    options: [
                        "Coverage Details",
                        "Claim Process",
                        "Back to Platform Features"
                    ]
                };

            default:
                return {
                    text: "I can help you plan your perfect trip. What would you like to know?",
                    sender: 'bot',
                    options: [
                        "Budget Planning",
                        "Destination Guide",
                        "Transportation",
                        "Accommodation",
                        "Activities & Attractions"
                    ]
                };
        }
    };

    return (
        <div className="chatbot-wrapper">
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h4>Travel Assistant</h4>
                        <button 
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index}>
                                <div className={`message ${message.sender}`}>
                                    {message.text}
                                </div>
                                {message.options && (
                                    <div className="options-container">
                                        {message.options.map((option, optionIndex) => (
                                            <button
                                                key={optionIndex}
                                                className="option-button"
                                                onClick={() => handleOptionSelect(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}
            
            <button 
                className="chat-toggle-button"
                onClick={handleChatOpen}
            >
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default Chatbot;