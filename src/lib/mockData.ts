// Enhanced mock data for UI-first development - Telkom University to Menara BJB
export interface MockTrip {
  id: string;
  date: string;
  day: string;
  time: string;
  duration: number; // in milliseconds
  delta: string;
  deltaType: 'faster' | 'slower' | 'same';
  departureTime: string;
  arrivalTime: string;
  distance: string;
  averageSpeed: string;
  weather: 'sunny' | 'rainy' | 'cloudy' | 'foggy';
  traffic: 'light' | 'moderate' | 'heavy';
  sectors: MockSector[];
  routeId: string;
  direction: 'to-office' | 'to-home';
  notes?: string;
}

export interface MockSector {
  id: string;
  name: string;
  time: string;
  delta: string;
  deltaType: 'faster' | 'slower' | 'same';
  distance: string;
  traffic: 'light' | 'moderate' | 'heavy';
}

export interface MockRoute {
  id: string;
  name: string;
  isActive: boolean;
  totalDistance: string;
  averageTime: string;
  sectors: MockSector[];
  direction: 'to-office' | 'to-home';
}

// Realistic trip scenarios - Telkom University ↔ Menara BJB (2 weeks of data)
export const mockTrips: MockTrip[] = [
  // WEEK 2 (Current Week) - TO OFFICE TRIPS
  {
    id: '1',
    date: 'Dec 21',
    day: 'Today',
    time: '28:45',
    duration: 1725000,
    delta: '+3:15',
    deltaType: 'slower',
    departureTime: '07:15',
    arrivalTime: '07:44',
    distance: '18.2 km',
    averageSpeed: '38.0 km/h',
    weather: 'rainy',
    traffic: 'heavy',
    routeId: 'route-to-office',
    direction: 'to-office',
    notes: 'Heavy rain caused delays at Batununggal',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '17:30',
        delta: '+2:30',
        deltaType: 'slower',
        distance: '8.5 km',
        traffic: 'heavy'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '6:15',
        delta: '+1:15',
        deltaType: 'slower',
        distance: '4.2 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '4:45',
        delta: '-0:45',
        deltaType: 'faster',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  {
    id: '2',
    date: 'Dec 20',
    day: 'Yesterday',
    time: '25:30',
    duration: 1530000,
    delta: '0:00',
    deltaType: 'same',
    departureTime: '07:10',
    arrivalTime: '07:36',
    distance: '18.2 km',
    averageSpeed: '42.8 km/h',
    weather: 'cloudy',
    traffic: 'moderate',
    routeId: 'route-to-office',
    direction: 'to-office',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '8.5 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '4:30',
        delta: '-0:30',
        deltaType: 'faster',
        distance: '4.2 km',
        traffic: 'light'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '6:00',
        delta: '+0:30',
        deltaType: 'slower',
        distance: '5.5 km',
        traffic: 'moderate'
      }
    ]
  },
  {
    id: '3',
    date: 'Dec 19',
    day: 'Wednesday',
    time: '22:15',
    duration: 1335000,
    delta: '-3:15',
    deltaType: 'faster',
    departureTime: '07:05',
    arrivalTime: '07:27',
    distance: '18.2 km',
    averageSpeed: '49.1 km/h',
    weather: 'sunny',
    traffic: 'light',
    routeId: 'route-to-office',
    direction: 'to-office',
    notes: 'Perfect morning - personal best!',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '12:30',
        delta: '-2:30',
        deltaType: 'faster',
        distance: '8.5 km',
        traffic: 'light'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '4:15',
        delta: '-0:45',
        deltaType: 'faster',
        distance: '4.2 km',
        traffic: 'light'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '0:00',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  {
    id: '4',
    date: 'Dec 18',
    day: 'Tuesday',
    time: '27:00',
    duration: 1620000,
    delta: '+1:30',
    deltaType: 'slower',
    departureTime: '07:20',
    arrivalTime: '07:47',
    distance: '18.2 km',
    averageSpeed: '40.4 km/h',
    weather: 'cloudy',
    traffic: 'moderate',
    routeId: 'route-to-office',
    direction: 'to-office',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '16:00',
        delta: '+1:00',
        deltaType: 'slower',
        distance: '8.5 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '5:30',
        delta: '+0:30',
        deltaType: 'slower',
        distance: '4.2 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '0:00',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  {
    id: '5',
    date: 'Dec 17',
    day: 'Monday',
    time: '29:15',
    duration: 1755000,
    delta: '+3:45',
    deltaType: 'slower',
    departureTime: '07:25',
    arrivalTime: '07:54',
    distance: '18.2 km',
    averageSpeed: '37.3 km/h',
    weather: 'foggy',
    traffic: 'heavy',
    routeId: 'route-to-office',
    direction: 'to-office',
    notes: 'Monday morning traffic + fog',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '18:15',
        delta: '+3:15',
        deltaType: 'slower',
        distance: '8.5 km',
        traffic: 'heavy'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '5:30',
        delta: '+0:30',
        deltaType: 'slower',
        distance: '4.2 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '0:00',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  // WEEK 1 (Previous Week) - TO OFFICE TRIPS
  {
    id: '6',
    date: 'Dec 14',
    day: 'Friday',
    time: '24:45',
    duration: 1485000,
    delta: '-0:45',
    deltaType: 'faster',
    departureTime: '07:12',
    arrivalTime: '07:37',
    distance: '18.2 km',
    averageSpeed: '44.1 km/h',
    weather: 'sunny',
    traffic: 'light',
    routeId: 'route-to-office',
    direction: 'to-office',
    notes: 'Friday light traffic',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '14:15',
        delta: '-0:45',
        deltaType: 'faster',
        distance: '8.5 km',
        traffic: 'light'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '5:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '4.2 km',
        traffic: 'light'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '0:00',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  {
    id: '7',
    date: 'Dec 13',
    day: 'Thursday',
    time: '26:30',
    duration: 1590000,
    delta: '+1:00',
    deltaType: 'slower',
    departureTime: '07:18',
    arrivalTime: '07:45',
    distance: '18.2 km',
    averageSpeed: '41.1 km/h',
    weather: 'rainy',
    traffic: 'moderate',
    routeId: 'route-to-office',
    direction: 'to-office',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '16:00',
        delta: '+1:00',
        deltaType: 'slower',
        distance: '8.5 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '5:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '4.2 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '0:00',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'light'
      }
    ]
  },
  // EVENING TRIPS (TO HOME) - More variable timing
  {
    id: '8',
    date: 'Dec 20',
    day: 'Yesterday Evening',
    time: '52:30',
    duration: 3150000,
    delta: '+7:30',
    deltaType: 'slower',
    departureTime: '17:45',
    arrivalTime: '18:38',
    distance: '18.2 km',
    averageSpeed: '20.8 km/h',
    weather: 'rainy',
    traffic: 'heavy',
    routeId: 'route-to-home',
    direction: 'to-home',
    notes: 'Evening rush hour + rain = nightmare',
    sectors: [
      {
        id: 'sector-1',
        name: 'Menara BJB to Pelajar Pejuang',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.0 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Pelajar Pejuang to Suryalaya',
        time: '22:30',
        delta: '+7:30',
        deltaType: 'slower',
        distance: '6.1 km',
        traffic: 'heavy'
      },
      {
        id: 'sector-3',
        name: 'Suryalaya to Telkom University',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.1 km',
        traffic: 'moderate'
      }
    ]
  },
  {
    id: '9',
    date: 'Dec 19',
    day: 'Wednesday Evening',
    time: '45:00',
    duration: 2700000,
    delta: '0:00',
    deltaType: 'same',
    departureTime: '17:30',
    arrivalTime: '18:15',
    distance: '18.2 km',
    averageSpeed: '24.3 km/h',
    weather: 'cloudy',
    traffic: 'moderate',
    routeId: 'route-to-home',
    direction: 'to-home',
    sectors: [
      {
        id: 'sector-1',
        name: 'Menara BJB to Pelajar Pejuang',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.0 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Pelajar Pejuang to Suryalaya',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.1 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'Suryalaya to Telkom University',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.1 km',
        traffic: 'moderate'
      }
    ]
  },
  {
    id: '10',
    date: 'Dec 18',
    day: 'Tuesday Evening',
    time: '48:45',
    duration: 2925000,
    delta: '+3:45',
    deltaType: 'slower',
    departureTime: '18:00',
    arrivalTime: '18:49',
    distance: '18.2 km',
    averageSpeed: '22.4 km/h',
    weather: 'sunny',
    traffic: 'heavy',
    routeId: 'route-to-home',
    direction: 'to-home',
    notes: 'Tuesday evening traffic jam',
    sectors: [
      {
        id: 'sector-1',
        name: 'Menara BJB to Pelajar Pejuang',
        time: '15:00',
        delta: '0:00',
        deltaType: 'same',
        distance: '6.0 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Pelajar Pejuang to Suryalaya',
        time: '20:45',
        delta: '+5:45',
        deltaType: 'slower',
        distance: '6.1 km',
        traffic: 'heavy'
      },
      {
        id: 'sector-3',
        name: 'Suryalaya to Telkom University',
        time: '13:00',
        delta: '-2:00',
        deltaType: 'faster',
        distance: '6.1 km',
        traffic: 'light'
      }
    ]
  }
];

export const mockRoutes: MockRoute[] = [
  {
    id: 'route-to-office',
    name: 'Telkom University to Menara BJB',
    isActive: true,
    totalDistance: '18.2 km',
    averageTime: '25:30',
    direction: 'to-office',
    sectors: [
      {
        id: 'sector-1',
        name: 'Telkom University to Batununggal Traffic Light',
        time: '15:00',
        delta: '±2:30',
        deltaType: 'same',
        distance: '8.5 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Batununggal to BKR Traffic Light',
        time: '5:00',
        delta: '±0:45',
        deltaType: 'same',
        distance: '4.2 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'BKR Traffic Light to Menara BJB',
        time: '5:30',
        delta: '±0:30',
        deltaType: 'same',
        distance: '5.5 km',
        traffic: 'moderate'
      }
    ]
  },
  {
    id: 'route-to-home',
    name: 'Menara BJB to Telkom University',
    isActive: false,
    totalDistance: '18.2 km',
    averageTime: '45:00',
    direction: 'to-home',
    sectors: [
      {
        id: 'sector-1',
        name: 'Menara BJB to Pelajar Pejuang',
        time: '15:00',
        delta: '±2:00',
        deltaType: 'same',
        distance: '6.0 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-2',
        name: 'Pelajar Pejuang to Suryalaya',
        time: '15:00',
        delta: '±7:30',
        deltaType: 'same',
        distance: '6.1 km',
        traffic: 'moderate'
      },
      {
        id: 'sector-3',
        name: 'Suryalaya to Telkom University',
        time: '15:00',
        delta: '±3:00',
        deltaType: 'same',
        distance: '6.1 km',
        traffic: 'moderate'
      }
    ]
  }
];

// Weekly statistics - calculated from actual trip data
export const mockWeeklyStats = {
  totalTrips: 10,
  averageTime: '32:45', // Average of morning commutes
  bestTime: '22:15', // Best morning commute
  worstTime: '52:30', // Worst evening commute
  averageDeparture: '07:15', // Average departure time for morning
  consistency: 75, // Based on variation in trip times
  improvement: '-1:15', // vs last week (improvement)
  totalDistance: '182.0 km'
};

// Utility functions
export const getTodaysTrip = (): MockTrip | null => {
  return mockTrips.find(trip => trip.day === 'Today') || null;
};

export const getYesterdaysTrip = (): MockTrip | null => {
  return mockTrips.find(trip => trip.day === 'Yesterday') || null;
};

export const getPersonalBest = (): MockTrip => {
  return mockTrips.reduce((best, trip) => 
    trip.duration < best.duration ? trip : best
  );
};

export const getRecentTrips = (count: number = 10): MockTrip[] => {
  return mockTrips.slice(0, count);
};

export const getTripsByDirection = (direction: 'to-office' | 'to-home'): MockTrip[] => {
  return mockTrips.filter(trip => trip.direction === direction);
};

// Weather icons mapping
export const weatherIcons = {
  sunny: '☀️',
  rainy: '🌧️',
  cloudy: '☁️',
  foggy: '🌫️'
};

// Traffic color mapping
export const trafficColors = {
  light: 'text-green-600',
  moderate: 'text-yellow-600',
  heavy: 'text-red-600'
};
