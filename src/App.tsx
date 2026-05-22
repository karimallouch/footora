import { useState, useEffect, useRef } from "react";
import {
  Home,
  Radio,
  Calendar,
  PlaySquare,
  Trophy,
  Star,
  Bell,
  Settings,
  Search,
  X,
  Eye,
  Maximize2,
  Volume2,
  VolumeX,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Monitor,
  Globe,
  Shield,
  Hd,
  Menu,
  Goal,
  Square,
  Clock,
  Flag,
  Zap,
  Wifi,
  Activity,
  ChevronDown,
  Server,
  Plus,
} from "lucide-react";
import MatchCountdown from "./Countdown";

const featuredMatch = {
  id: 1,
  league: "UEFA Champions League",
  home: { name: "Arsenal", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png", score: 1 },
  away: { name: "Bayern Munich", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png", score: 1 },
  time: "63:24",
  stadium: "https://images.pexels.com/photos/9251066/pexels-photo-9251066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
};

const liveMatches = [
  {
    id: 2,
    league: "UCL",
    home: { name: "PSG", short: "PSG", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/160.png", score: 2 },
    away: { name: "Barcelona", short: "Barcelona", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png", score: 0 },
    time: "58:11",
    viewers: "128K",
  },
  {
    id: 3,
    league: "Premier League",
    home: { name: "Man City", short: "Man City", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png", score: 1 },
    away: { name: "Liverpool", short: "Liverpool", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png", score: 0 },
    time: "45:00",
    viewers: "98K",
  },
  {
    id: 4,
    league: "La Liga",
    home: { name: "Real Madrid", short: "Real Madrid", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png", score: 0 },
    away: { name: "Atletico", short: "Atletico", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/1068.png", score: 0 },
    time: "32:45",
    viewers: "76K",
  },
  {
    id: 5,
    league: "Serie A",
    home: { name: "AC Milan", short: "AC Milan", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/103.png", score: 1 },
    away: { name: "Inter", short: "Inter", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/110.png", score: 1 },
    time: "61:20",
    viewers: "65K",
  },
];

const topLeagues = [
  { name: "Premier League", country: "England", matches: 380, logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png", color: "from-purple-600/20 to-blue-600/20" },
  { name: "Champions League", country: "Europe", matches: 125, logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png", color: "from-blue-600/20 to-cyan-600/20" },
  { name: "La Liga", country: "Spain", matches: 240, logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png", color: "from-red-600/20 to-orange-600/20" },
  { name: "Serie A", country: "Italy", matches: 230, logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png", color: "from-blue-700/20 to-indigo-600/20" },
  { name: "Bundesliga", country: "Germany", matches: 200, logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png", color: "from-red-700/20 to-red-500/20" },
];

const trendingMatches = [
  {
    home: "Man United",
    away: "Chelsea",
    score: "3 - 2",
    league: "Premier League",
    viewers: "245K",
    time: "2h ago",
    image: "https://images.pexels.com/photos/10463646/pexels-photo-10463646.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    home: "Dortmund",
    away: "Leverkusen",
    score: "2 - 2",
    league: "Bundesliga",
    viewers: "198K",
    time: "1h ago",
    image: "https://images.pexels.com/photos/30340460/pexels-photo-30340460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    home: "Juventus",
    away: "Napoli",
    score: "1 - 0",
    league: "Serie A",
    viewers: "167K",
    time: "3h ago",
    image: "https://images.pexels.com/photos/18799030/pexels-photo-18799030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
  {
    home: "Tottenham",
    away: "West Ham",
    score: "4 - 1",
    league: "Premier League",
    viewers: "142K",
    time: "2h ago",
    image: "https://images.pexels.com/photos/23848401/pexels-photo-23848401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800",
  },
];

const recentGoals = [
  { minute: "63'", player: "Bukayo Saka", match: "Arsenal 1 - 1 Bayern", teamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png" },
  { minute: "58'", player: "Kylian Mbappé", match: "PSG 2 - 0 Barcelona", teamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/160.png" },
  { minute: "47'", player: "Erling Haaland", match: "Man City 1 - 0 Liverpool", teamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png" },
  { minute: "32'", player: "Vinicius Júnior", match: "Real Madrid 0 - 0 Atletico", teamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png" },
];

const upcomingMatches = [
  { time: "20:00", home: "Chelsea", away: "Newcastle", homeLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png", awayLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/361.png", league: "PL" },
  { time: "17:30", home: "Sevilla", away: "Real Betis", homeLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/106.png", awayLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/244.png", league: "La Liga" },
  { time: "21:00", home: "Lazio", away: "AS Roma", homeLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/105.png", awayLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/104.png", league: "Serie A" },
  { time: "19:45", home: "Marseille", away: "Lyon", homeLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/176.png", awayLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/174.png", league: "Ligue 1" },
];

type NotificationType = "goal" | "redcard" | "matchstart" | "halftime" | "fulltime" | "yellowcard" | "substitution";

interface LiveNotification {
  id: string;
  type: NotificationType;
  minute: string;
  homeTeam: { name: string; logo: string; score: number };
  awayTeam: { name: string; logo: string; score: number };
  player?: string;
  assist?: string;
  league: string;
}

const notificationConfigs = {
  goal: { icon: Goal, color: "from-emerald-500 to-green-600", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]", label: "GOAL!" },
  redcard: { icon: Square, color: "from-red-500 to-rose-600", bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]", label: "RED CARD" },
  yellowcard: { icon: Square, color: "from-amber-500 to-yellow-600", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]", label: "YELLOW" },
  matchstart: { icon: Play, color: "from-blue-500 to-violet-600", bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]", label: "KICK OFF" },
  halftime: { icon: Clock, color: "from-violet-500 to-purple-600", bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]", label: "HALF TIME" },
  fulltime: { icon: Flag, color: "from-slate-500 to-zinc-600", bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-300", glow: "shadow-[0_0_30px_rgba(100,116,139,0.3)]", label: "FULL TIME" },
  substitution: { icon: Zap, color: "from-cyan-500 to-blue-600", bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]", label: "SUB" },
};

const continueWatching = [
  {
    id: 1,
    home: { name: "Barcelona", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png" },
    away: { name: "Real Madrid", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png" },
    score: "2-1",
    progress: 67,
    timeWatched: "63:24",
    totalTime: "94:00",
    league: "La Liga",
    thumbnail: "https://images.pexels.com/photos/30340460/pexels-photo-30340460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    isLive: true,
  },
  {
    id: 2,
    home: { name: "Liverpool", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png" },
    away: { name: "Man United", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/360.png" },
    score: "3-0",
    progress: 45,
    timeWatched: "42:15",
    totalTime: "94:00",
    league: "Premier League",
    thumbnail: "https://images.pexels.com/photos/10463646/pexels-photo-10463646.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    isLive: false,
  },
  {
    id: 3,
    home: { name: "Bayern", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png" },
    away: { name: "Dortmund", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/124.png" },
    score: "1-1",
    progress: 82,
    timeWatched: "77:30",
    totalTime: "94:00",
    league: "Bundesliga",
    thumbnail: "https://images.pexels.com/photos/18799030/pexels-photo-18799030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    isLive: true,
  },
  {
    id: 4,
    home: { name: "PSG", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/160.png" },
    away: { name: "Marseille", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/176.png" },
    score: "4-2",
    progress: 23,
    timeWatched: "21:45",
    totalTime: "94:00",
    league: "Ligue 1",
    thumbnail: "https://images.pexels.com/photos/23848401/pexels-photo-23848401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    isLive: false,
  },
  {
    id: 5,
    home: { name: "Inter", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/110.png" },
    away: { name: "Juventus", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/111.png" },
    score: "0-0",
    progress: 91,
    timeWatched: "85:20",
    totalTime: "94:00",
    league: "Serie A",
    thumbnail: "https://images.pexels.com/photos/30689705/pexels-photo-30689705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1000",
    isLive: true,
  },
];

const streamServers = [
  { id: 1, name: "Server EU-1", location: "Frankfurt", ping: 24, quality: "4K", health: 98, viewers: "42.3K", language: "English", flag: "🇬🇧", primary: true },
  { id: 2, name: "Server EU-2", location: "Amsterdam", ping: 31, quality: "1080p", health: 95, viewers: "28.7K", language: "English", flag: "🇬🇧", primary: true },
  { id: 3, name: "Server US-E", location: "New York", ping: 67, quality: "1080p", health: 92, viewers: "15.2K", language: "English", flag: "🇺🇸", primary: false },
  { id: 4, name: "Server ES-1", location: "Madrid", ping: 45, quality: "1080p", health: 88, viewers: "19.4K", language: "Español", flag: "🇪🇸", primary: false },
  { id: 5, name: "Server DE-1", location: "Berlin", ping: 29, quality: "720p", health: 85, viewers: "8.1K", language: "Deutsch", flag: "🇩🇪", primary: false },
  { id: 6, name: "Backup 1", location: "London", ping: 38, quality: "1080p", health: 76, viewers: "3.2K", language: "English", flag: "🇬🇧", primary: false },
];

export default function App() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStream, setCurrentStream] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [matchTime, setMatchTime] = useState("63:24");
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [showServerSelector, setShowServerSelector] = useState(false);
  const [selectedServer, setSelectedServer] = useState(streamServers[0]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const notificationIdRef = useRef(0);
  
  const upcomingMatchTime = new Date();
  upcomingMatchTime.setDate(upcomingMatchTime.getDate() + 1);
  upcomingMatchTime.setHours(20, 45, 0, 0);

  useEffect(() => {
    if (!selectedMatch) return;
    const interval = setInterval(() => {
      setMatchTime(prev => {
        const [m, s] = prev.split(":").map(Number);
        let total = m * 60 + s + 1;
        const nm = Math.floor(total / 60);
        const ns = total % 60;
        return `${nm}:${ns.toString().padStart(2, "0")}`;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedMatch]);

  useEffect(() => {
    const demoNotifications: Omit<LiveNotification, "id">[] = [
      {
        type: "goal",
        minute: "64'",
        homeTeam: { name: "Arsenal", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png", score: 2 },
        awayTeam: { name: "Bayern", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png", score: 1 },
        player: "Bukayo Saka",
        assist: "Ødegaard",
        league: "UCL",
      },
      {
        type: "redcard",
        minute: "71'",
        homeTeam: { name: "PSG", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/160.png", score: 2 },
        awayTeam: { name: "Barcelona", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/83.png", score: 0 },
        player: "Ronald Araújo",
        league: "UCL",
      },
      {
        type: "matchstart",
        minute: "0'",
        homeTeam: { name: "Chelsea", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png", score: 0 },
        awayTeam: { name: "Newcastle", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/361.png", score: 0 },
        league: "Premier League",
      },
      {
        type: "halftime",
        minute: "HT",
        homeTeam: { name: "Man City", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png", score: 1 },
        awayTeam: { name: "Liverpool", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png", score: 0 },
        league: "Premier League",
      },
      {
        type: "fulltime",
        minute: "FT",
        homeTeam: { name: "Real Madrid", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png", score: 0 },
        awayTeam: { name: "Atletico", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/1068.png", score: 0 },
        league: "La Liga",
      },
    ];

    let index = 0;
    const addNotification = () => {
      if (index < demoNotifications.length) {
        const notif = { ...demoNotifications[index], id: `notif-${notificationIdRef.current++}` };
        setNotifications(prev => [notif, ...prev].slice(0, 4));
        index++;
        setTimeout(() => removeNotification(notif.id), 5000);
      }
    };

    const timeout1 = setTimeout(addNotification, 2000);
    const interval = setInterval(addNotification, 6000);

    return () => {
      clearTimeout(timeout1);
      clearInterval(interval);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const openPlayer = (match: any) => {
    setSelectedMatch(match);
    setMatchTime(match.time || "00:00");
    setIsPlaying(true);
  };

  const sidebarItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Radio, label: "Live Matches", badge: "LIVE" },
    { icon: Calendar, label: "Today Matches" },
    { icon: PlaySquare, label: "Highlights" },
    { icon: Trophy, label: "Leagues" },
    { icon: Star, label: "Favorites" },
    { icon: Bell, label: "Notifications", badge: "12" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(ellipse_80%_50%_at_80%_100%,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[200] w-[calc(100vw-1.5rem)] sm:w-[340px] max-w-[340px] space-y-2 sm:space-y-3 pointer-events-none">
        {notifications.map((notification) => {
          const config = notificationConfigs[notification.type];
          const Icon = config.icon;
          
          return (
            <div
              key={notification.id}
              className="pointer-events-auto group relative overflow-hidden"
              style={{ animation: "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <div className={`absolute -inset-1 rounded-[20px] bg-gradient-to-r ${config.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
              
              <div className={`relative overflow-hidden rounded-[18px] border ${config.border} bg-[#080C14]/90 backdrop-blur-2xl ${config.glow} transition-all hover:bg-[#0B111C]/90 hover:-translate-y-0.5 hover:scale-[1.02]`}>
                <div className={`h-[2px] w-full bg-gradient-to-r ${config.color}`} />
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${config.bg} border ${config.border}`}>
                        <Icon className={`h-3.5 w-3.5 ${config.text} ${notification.type === 'redcard' ? 'fill-current' : ''}`} />
                      </div>
                      <div>
                        <div className={`text-[11px] font-bold uppercase tracking-wider ${config.text}`}>{config.label}</div>
                        <div className="text-[10px] text-zinc-500 -mt-0.5">{notification.league} • {notification.minute}</div>
                      </div>
                    </div>
                    <button onClick={() => removeNotification(notification.id)} className="flex h-6 w-6 items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-white/5 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="mt-3.5 flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
                        <img src={notification.homeTeam.logo} alt="" className="relative h-9 w-9 object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-medium leading-tight">{notification.homeTeam.name}</div>
                        {notification.player && notification.type === "goal" && (
                          <div className="truncate text-[11px] text-zinc-500">{notification.player}</div>
                        )}
                        {notification.player && notification.type === "redcard" && (
                          <div className="truncate text-[11px] text-red-400/80">{notification.player}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-[20px] font-light leading-none tabular-nums ${notification.type === 'goal' ? config.text : 'text-white'}`}>{notification.homeTeam.score}</span>
                        <span className="text-[12px] text-zinc-600">:</span>
                        <span className="text-[20px] font-light leading-none tabular-nums text-white">{notification.awayTeam.score}</span>
                      </div>
                      {notification.type === "goal" && notification.assist && (
                        <div className="mt-0.5 text-[9px] text-zinc-600">Ast: {notification.assist}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <div className="min-w-0 flex-1 text-right">
                        <div className="truncate text-[13px] font-medium leading-tight">{notification.awayTeam.name}</div>
                        <div className="text-[11px] text-zinc-600">Away</div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
                        <img src={notification.awayTeam.logo} alt="" className="relative h-9 w-9 object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${config.color}`} style={{ animation: "shrink 5s linear forwards" }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%) scale(0.95); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes fadeInUp {
          from { transform: translate(-50%, 10px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="relative flex h-screen">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed lg:relative z-50 h-full w-[280px] sm:w-[270px] shrink-0 border-r border-white/[0.06] bg-[#050812]/98 backdrop-blur-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[#00D4FF]/40 to-[#0099FF]/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#050812] border border-[#00D4FF]/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_20px_rgba(0,212,255,0.15)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-transparent" />
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="relative z-10">
                    <defs>
                      <linearGradient id="footora-gradient" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#0099FF" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Stylized F with football */}
                    <path d="M8 6H24V10H14V14H22V18H14V26H8V6Z" fill="url(#footora-gradient)" filter="url(#glow)" />
                    <circle cx="22" cy="22" r="5" fill="none" stroke="url(#footora-gradient)" strokeWidth="1.5" opacity="0.9"/>
                    <path d="M22 19V25M19 22H25" stroke="url(#footora-gradient)" strokeWidth="1.2" opacity="0.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-[20px] font-bold leading-none tracking-[-0.02em] text-white">FOOTORA</div>
                <div className="text-[11px] font-medium leading-none tracking-widest text-[#00D4FF] mt-0.5 uppercase">Premium</div>
              </div>
            </div>

            <nav className="mt-10 space-y-1.5">
              {sidebarItems.map((item) => (
                <button key={item.label} className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-[14px] transition-all ${item.active ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {item.active && (
                    <>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-r-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </>
                  )}
                  <item.icon className={`h-[18px] w-[18px] relative z-10 transition-transform group-hover:scale-110 ${item.active ? "text-blue-400" : ""}`} />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto relative z-10 rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${item.badge === "LIVE" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <div className="mt-auto" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#030712]/90 backdrop-blur-2xl">
            <div className="flex h-[60px] sm:h-[72px] items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-8">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden -ml-1 p-2.5 text-zinc-400 hover:text-white active:scale-95 transition-all touch-manipulation">
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="relative hidden w-full max-w-[480px] md:block">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input placeholder="Search for matches, teams, leagues..." className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-[14px] placeholder-zinc-500 outline-none transition-all hover:bg-white/[0.05] focus:border-blue-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/20" />
              </div>

              {/* Mobile search button */}
              <button className="md:hidden p-2.5 text-zinc-400 hover:text-white active:scale-95 transition-all">
                <Search className="h-5 w-5" />
              </button>

              <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
                <button className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white active:scale-95 touch-manipulation">
                  <Calendar className="h-4 w-4" />
                </button>
                <button onClick={() => {
                    const testNotif: LiveNotification = {
                      id: `test-${Date.now()}`,
                      type: "goal",
                      minute: "89'",
                      homeTeam: { name: "Arsenal", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/359.png", score: 3 },
                      awayTeam: { name: "Bayern", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/132.png", score: 2 },
                      player: "Gabriel Jesus",
                      assist: "Saka",
                      league: "UCL"
                    };
                    setNotifications(prev => [testNotif, ...prev].slice(0, 4));
                    setTimeout(() => removeNotification(testNotif.id), 5000);
                  }} className="relative flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-white active:scale-95 group touch-manipulation">
                  <Bell className="h-4 w-4 sm:h-4 sm:w-4 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                </button>
                <div className="ml-1 flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-white/10">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face" alt="User" className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl object-cover ring-1 ring-white/10" />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto max-w-[1600px] p-3 sm:p-4 lg:p-8">
              <div className="flex gap-6 lg:gap-8">
                <div className="min-w-0 flex-1">
                  {showCountdown ? (
                    <div className="mb-8">
                      <MatchCountdown
                        homeTeam={{ name: "Manchester City", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png" }}
                        awayTeam={{ name: "Real Madrid", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/86.png" }}
                        matchTime={upcomingMatchTime}
                        league="UEFA Champions League"
                        leagueLogo="https://a.espncdn.com/i/leaguelogos/soccer/500/2.png"
                        stadium="Etihad Stadium"
                        venue="Manchester, England"
                        onComplete={() => setShowCountdown(false)}
                      />
                      <button onClick={() => setShowCountdown(false)} className="mt-3 text-[12px] text-zinc-500 hover:text-zinc-300">← Back to live matches</button>
                    </div>
                  ) : null}
                  
                  <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0F1C]">
                    <div className="absolute inset-0">
                      <img src={featuredMatch.stadium} alt="" className="h-full w-full object-cover opacity-[0.35] transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/80 to-[#0A0F1C]/40" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0F1C_80%)]" />
                    </div>

                    <div className="relative p-4 sm:p-6 md:p-10 lg:p-12">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">Live Now</span>
                          </div>
                          <div className="mt-3 text-[13px] text-zinc-400">{featuredMatch.league}</div>
                        </div>
                        <button onClick={() => openPlayer(featuredMatch)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105">
                          <Maximize2 className="h-4 w-4 text-zinc-300" />
                        </button>
                      </div>

                      <div className="mt-6 sm:mt-8 md:mt-10 flex items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-24">
                        <div className="flex flex-col items-center gap-2 sm:gap-4">
                          <div className="relative">
                            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-blue-600/15 blur-2xl" />
                            <img src={featuredMatch.home.logo} alt="" className="relative h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-2xl" />
                          </div>
                          <div className="text-center">
                            <div className="text-[13px] sm:text-[15px] md:text-[17px] font-semibold leading-tight">{featuredMatch.home.name}</div>
                            <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-zinc-500">Home</div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-red-500/15 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-red-500/20">
                            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-red-400">LIVE</span>
                          </div>
                          <div className="mt-2 sm:mt-4 flex items-baseline gap-2 sm:gap-4 md:gap-6">
                            <span className="text-[32px] sm:text-[42px] md:text-[56px] font-thin leading-none tracking-tighter">{featuredMatch.home.score}</span>
                            <span className="text-[20px] sm:text-[28px] md:text-[36px] font-thin text-zinc-600">-</span>
                            <span className="text-[32px] sm:text-[42px] md:text-[56px] font-thin leading-none tracking-tighter">{featuredMatch.away.score}</span>
                          </div>
                          <div className="mt-1 sm:mt-2 text-[13px] sm:text-[15px] font-medium text-blue-400 tabular-nums">{featuredMatch.time}</div>
                        </div>

                        <div className="flex flex-col items-center gap-2 sm:gap-4">
                          <div className="relative">
                            <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-red-600/15 blur-2xl" />
                            <img src={featuredMatch.away.logo} alt="" className="relative h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-2xl" />
                          </div>
                          <div className="text-center">
                            <div className="text-[13px] sm:text-[15px] md:text-[17px] font-semibold leading-tight">{featuredMatch.away.name}</div>
                            <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-zinc-500">Away</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex flex-col items-center gap-5">
                        <button onClick={() => openPlayer(featuredMatch)} className="group relative overflow-hidden rounded-2xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-all group-hover:from-blue-500 group-hover:to-violet-500" />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 blur-xl transition-opacity group-hover:opacity-70" />
                          <div className="relative flex items-center gap-2.5 px-8 py-3.5">
                            <Play className="h-4 w-4 fill-white" />
                            <span className="text-[14px] font-semibold tracking-wide">Watch Live</span>
                          </div>
                        </button>

                        <div className="flex flex-wrap items-center justify-center gap-2.5">
                          {[
                            { icon: Hd, label: "1080p" },
                            { icon: Globe, label: "Multi Language" },
                            { icon: Shield, label: "No Ads" },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                              <item.icon className="h-3.5 w-3.5 text-zinc-400" />
                              <span className="text-[12px] text-zinc-300">{item.label}</span>
                            </div>
                          ))}
                          <button onClick={() => setShowCountdown(true)} className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 backdrop-blur-md hover:bg-amber-500/20 transition-colors">
                            <Clock className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[12px] text-amber-300">View Countdown</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]" />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <div className="text-[12px] text-zinc-600 mr-2 py-1.5">Test notifications:</div>
                    {[
                      { type: "goal" as NotificationType, label: "GOAL" },
                      { type: "redcard" as NotificationType, label: "Red Card" },
                      { type: "matchstart" as NotificationType, label: "Kick Off" },
                      { type: "halftime" as NotificationType, label: "Half Time" },
                      { type: "fulltime" as NotificationType, label: "Full Time" },
                    ].map((btn) => (
                      <button
                        key={btn.type}
                        onClick={() => {
                          const samples = {
                            goal: { home: 2, away: 1, player: "Haaland", assist: "De Bruyne" },
                            redcard: { home: 1, away: 1, player: "Casemiro" },
                            matchstart: { home: 0, away: 0 },
                            halftime: { home: 1, away: 0 },
                            fulltime: { home: 3, away: 2 },
                          };
                          const s = samples[btn.type as keyof typeof samples];
                          const notif: LiveNotification = {
                            id: `manual-${Date.now()}`,
                            type: btn.type,
                            minute: btn.type === "matchstart" ? "0'" : btn.type === "halftime" ? "HT" : btn.type === "fulltime" ? "FT" : "78'",
                            homeTeam: { name: "Man City", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/382.png", score: s.home },
                            awayTeam: { name: "Liverpool", logo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/364.png", score: s.away },
                            player: "player" in s ? s.player : undefined,
                            assist: "assist" in s ? s.assist : undefined,
                            league: "Premier League",
                          };
                          setNotifications(prev => [notif, ...prev].slice(0, 4));
                          setTimeout(() => removeNotification(notif.id), 5000);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-400 text-[11px] font-medium hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Continue Watching - Netflix Style */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[17px] font-semibold tracking-tight flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/20">
                          <Play className="h-3.5 w-3.5 text-violet-400 fill-violet-400" />
                        </div>
                        Continue Watching
                      </h2>
                      <button className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors">See all</button>
                    </div>
                    
                    <div className="relative -mx-4 px-4 lg:-mx-8 lg:px-8">
                      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {continueWatching.map((match) => (
                          <div
                            key={match.id}
                            onClick={() => openPlayer(match)}
                            className="group relative flex-none w-[300px] sm:w-[340px] snap-start cursor-pointer"
                          >
                            <div className="relative overflow-hidden rounded-2xl bg-[#0B1120] border border-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                              {/* Thumbnail */}
                              <div className="relative aspect-video overflow-hidden bg-black">
                                <img src={match.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                    <Play className="h-6 w-6 text-black fill-black ml-0.5" />
                                  </div>
                                </div>

                                {/* Top badges */}
                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                  {match.isLive && (
                                    <div className="flex items-center gap-1 rounded-md bg-red-500/90 px-2 py-1 backdrop-blur-md border border-red-400/30">
                                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                      <span className="text-[10px] font-bold uppercase tracking-wide text-white">LIVE</span>
                                    </div>
                                  )}
                                  <div className="rounded-md bg-black/70 px-2 py-1 backdrop-blur-md border border-white/10">
                                    <span className="text-[10px] text-white/80">{match.league}</span>
                                  </div>
                                </div>

                                {/* Time watched */}
                                <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 backdrop-blur-md border border-white/10">
                                  <span className="text-[11px] font-medium text-white tabular-nums">{match.timeWatched}</span>
                                </div>

                                {/* Progress bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                  <div 
                                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 relative overflow-hidden"
                                    style={{ width: `${match.progress}%` }}
                                  >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', backgroundSize: '200% 100%' }} />
                                  </div>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="p-3.5">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <div className="flex items-center -space-x-2">
                                      <div className="relative z-10 h-8 w-8 rounded-full bg-[#0B1120] p-0.5 ring-1 ring-white/10">
                                        <img src={match.home.logo} alt="" className="h-full w-full object-contain" />
                                      </div>
                                      <div className="relative h-8 w-8 rounded-full bg-[#0B1120] p-0.5 ring-1 ring-white/10">
                                        <img src={match.away.logo} alt="" className="h-full w-full object-contain" />
                                      </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-baseline gap-1.5">
                                        <span className="truncate text-[13px] font-medium text-white">{match.home.name}</span>
                                        <span className="text-[11px] text-zinc-600">vs</span>
                                        <span className="truncate text-[13px] font-medium text-zinc-400">{match.away.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[12px] font-medium text-white tabular-nums">{match.score}</span>
                                        <span className="text-[11px] text-zinc-600">•</span>
                                        <span className="text-[11px] text-zinc-500">{match.progress}% watched</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:text-white hover:border-white/20">
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add more placeholder */}
                        <div className="flex-none w-[300px] sm:w-[340px] snap-start">
                          <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] backdrop-blur-sm hover:bg-white/[0.03] hover:border-white/20 transition-all cursor-pointer group">
                            <div className="text-center">
                              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                <Plus className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400" />
                              </div>
                              <div className="mt-2 text-[13px] text-zinc-600 group-hover:text-zinc-500">Browse matches</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <h2 className="text-[17px] font-semibold tracking-tight">Live Matches</h2>
                      </div>
                      <button className="text-[13px] font-medium text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {liveMatches.map((match) => (
                        <button key={match.id} onClick={() => openPlayer(match)} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/70 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:bg-[#0F172A]/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 text-left">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">LIVE</span>
                              <span className="text-[11px] text-zinc-500">{match.league}</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex flex-col items-center gap-2">
                                <img src={match.home.logo} alt="" className="h-10 w-10 object-contain transition-transform group-hover:scale-110" />
                                <span className="text-[12px] text-zinc-400">{match.home.short}</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="text-[22px] font-medium leading-none tracking-tight">
                                  {match.home.score} <span className="text-zinc-600 mx-1">-</span> {match.away.score}
                                </div>
                                <div className="mt-1.5 text-[12px] font-medium text-blue-400 tabular-nums">{match.time}</div>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <img src={match.away.logo} alt="" className="h-10 w-10 object-contain transition-transform group-hover:scale-110" />
                                <span className="text-[12px] text-zinc-400">{match.away.short}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                              <div className="flex items-center gap-1.5 text-zinc-500">
                                <Eye className="h-3.5 w-3.5" />
                                <span className="text-[12px]">{match.viewers}</span>
                              </div>
                              <div className="flex items-center gap-1 rounded-md bg-blue-500/15 px-2 py-0.5 border border-blue-500/20">
                                <span className="text-[10px] font-bold text-blue-400">HD</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[17px] font-semibold tracking-tight flex items-center gap-2">
                        <span className="h-4 w-[3px] rounded-full bg-blue-500" />
                        Top Leagues
                      </h2>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {topLeagues.map((league) => (
                        <div key={league.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/50 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-[#0F172A]/70 hover:-translate-y-0.5">
                          <div className={`absolute inset-0 bg-gradient-to-br ${league.color} opacity-50`} />
                          <div className="relative p-4">
                            <div className="flex items-start gap-3">
                              <img src={league.logo} alt="" className="h-10 w-10 object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[13px] font-semibold leading-tight">{league.name}</div>
                                <div className="mt-0.5 text-[12px] text-zinc-500">{league.country}</div>
                                <div className="mt-2 text-[11px] text-zinc-600">{league.matches} Matches</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="hidden w-[320px] shrink-0 xl:block">
                  <div className="sticky top-[88px] space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-[#0B1120]/70 backdrop-blur-xl">
                      <div className="flex items-center justify-between p-5 pb-4">
                        <h3 className="text-[15px] font-semibold">Recent Goals</h3>
                        <button className="text-[12px] text-blue-400 hover:text-blue-300">View All</button>
                      </div>
                      <div className="px-3 pb-3 space-y-1">
                        {recentGoals.map((goal, i) => (
                          <div key={i} className="group flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-white/[0.04]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20">
                              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <img src={goal.teamLogo} alt="" className="h-7 w-7 object-contain" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-[12px] font-medium text-green-400">{goal.minute}</span>
                                <span className="truncate text-[13px] font-medium">{goal.player}</span>
                              </div>
                              <div className="truncate text-[11px] text-zinc-500">{goal.match}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0B1120]/70 backdrop-blur-xl">
                      <div className="flex items-center justify-between p-5 pb-4">
                        <h3 className="text-[15px] font-semibold">Upcoming Matches</h3>
                        <button className="text-[12px] text-blue-400 hover:text-blue-300">View All</button>
                      </div>
                      <div className="px-3 pb-3 space-y-1">
                        {upcomingMatches.map((match, i) => (
                          <div key={i} className="group rounded-xl p-3 transition-all hover:bg-white/[0.04]">
                            <div className="flex items-center justify-between">
                              <div className="text-[11px] text-zinc-500">
                                <div>{match.time}</div>
                                <div>Today</div>
                              </div>
                              <div className="flex-1 px-3">
                                <div className="flex items-center gap-2">
                                  <img src={match.homeLogo} alt="" className="h-5 w-5 object-contain" />
                                  <span className="text-[13px]">{match.home}</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <img src={match.awayLogo} alt="" className="h-5 w-5 object-contain" />
                                  <span className="text-[13px] text-zinc-400">{match.away}</span>
                                </div>
                              </div>
                              <div className="rounded-md bg-white/5 px-2 py-1 border border-white/10">
                                <span className="text-[10px] text-zinc-400">{match.league}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>

      {selectedMatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020208]/90 backdrop-blur-2xl" onClick={() => setSelectedMatch(null)} />
          <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-blue-500/20 bg-[#070B14]/90 shadow-[0_0_80px_rgba(59,130,246,0.2),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-2xl">
            <div className="relative border-b border-white/5 bg-gradient-to-r from-[#0A0F1C]/80 to-[#0F172A]/80 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">LIVE</span>
                  </div>
                  <span className="text-[13px] text-zinc-400">{selectedMatch.league || "UEFA Champions League"}</span>
                </div>
                <button onClick={() => setSelectedMatch(null)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white hover:rotate-90">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0">
                <img src="https://images.pexels.com/photos/15867405/pexels-photo-15867405.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1600" alt="" className="h-full w-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-[#070B14]/90 to-[#070B14]" />
              </div>
              <div className="relative flex items-center justify-center gap-12 px-8 py-6">
                <div className="flex items-center gap-4">
                  <img src={selectedMatch.home.logo} alt="" className="h-14 w-14 object-contain drop-shadow-xl" />
                  <span className="text-[18px] font-semibold">{selectedMatch.home.name}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[40px] font-thin leading-none">{selectedMatch.home.score}</span>
                    <span className="text-[24px] text-zinc-600">-</span>
                    <span className="text-[40px] font-thin leading-none">{selectedMatch.away.score}</span>
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-blue-400 tabular-nums">{matchTime}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[18px] font-semibold">{selectedMatch.away.name}</span>
                  <img src={selectedMatch.away.logo} alt="" className="h-14 w-14 object-contain drop-shadow-xl" />
                </div>
              </div>
            </div>
            <div className="relative aspect-video bg-black">
              <img src="https://images.pexels.com/photos/30689705/pexels-photo-30689705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-xl animate-pulse" />
                    <Play className="relative h-8 w-8 fill-white text-white ml-1" />
                  </div>
                  <div className="mt-4 text-[13px] font-medium text-white/80 tracking-wide">LIVE STREAM • 1080p • 60FPS</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:scale-105">
                    {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors"><SkipBack className="h-4 w-4" /></button>
                  <button className="text-white/70 hover:text-white transition-colors"><SkipForward className="h-4 w-4" /></button>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">LIVE</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="relative h-1 group cursor-pointer">
                      <div className="absolute inset-0 rounded-full bg-white/20" />
                      <div className="absolute inset-0 w-[65%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[65%] h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition-colors">
                      {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <div className="w-20 hidden sm:block">
                      <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full h-1 accent-blue-500" />
                    </div>
                    <button className="text-white/70 hover:text-white transition-colors hidden sm:block"><Settings className="h-4 w-4" /></button>
                    <button className="text-white/70 hover:text-white transition-colors hidden sm:block"><Monitor className="h-4 w-4" /></button>
                    <button className="text-white/70 hover:text-white transition-colors"><Maximize2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 bg-[#050812]/80 px-6 py-4 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <div className="relative">
                  <button 
                    onClick={() => setShowServerSelector(!showServerSelector)}
                    className="group relative overflow-hidden rounded-xl border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/15 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20" />
                    <div className="relative flex items-center gap-2.5 px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="relative">
                          <Wifi className="h-3.5 w-3.5 text-blue-400" />
                          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                        </div>
                        <span className="text-[13px] font-medium">{selectedServer.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-zinc-500">{selectedServer.ping}ms</span>
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${selectedServer.quality === '4K' ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>{selectedServer.quality}</span>
                      </div>
                      <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${showServerSelector ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {showServerSelector && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[360px] z-50" style={{ animation: 'fadeInUp 0.2s ease-out' }}>
                      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#070B14]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(59,130,246,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.03] to-transparent pointer-events-none" />
                        
                        <div className="relative border-b border-white/10 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Server className="h-4 w-4 text-blue-400" />
                              <span className="text-[13px] font-semibold">Stream Servers</span>
                              <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">6 Active</span>
                            </div>
                            <button onClick={() => setShowServerSelector(false)} className="text-zinc-500 hover:text-zinc-300">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="relative max-h-[320px] overflow-y-auto p-2">
                          {streamServers.map((server) => {
                            const isActive = selectedServer.id === server.id;
                            const healthColor = server.health >= 90 ? 'text-emerald-400' : server.health >= 75 ? 'text-amber-400' : 'text-red-400';
                            const pingColor = server.ping < 40 ? 'text-emerald-400' : server.ping < 70 ? 'text-amber-400' : 'text-red-400';
                            
                            return (
                              <button
                                key={server.id}
                                onClick={() => {
                                  if (!isActive) {
                                    setIsSwitching(true);
                                    setTimeout(() => {
                                      setSelectedServer(server);
                                      setCurrentStream(server.id - 1);
                                      setIsSwitching(false);
                                      setShowServerSelector(false);
                                    }, 800);
                                  }
                                }}
                                className={`group relative w-full overflow-hidden rounded-xl border transition-all text-left mb-1.5 last:mb-0 ${
                                  isActive 
                                    ? 'border-blue-500/50 bg-blue-500/10' 
                                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
                                }`}
                              >
                                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10" />}
                                
                                <div className="relative p-3">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-medium truncate">{server.name}</span>
                                        {server.primary && (
                                          <span className="shrink-0 rounded px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-blue-500/20 text-blue-400 border border-blue-500/30">Primary</span>
                                        )}
                                        {isActive && (
                                          <div className="shrink-0 flex items-center gap-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                                        <div className="flex items-center gap-1">
                                          <span className="text-zinc-600">{server.flag}</span>
                                          <span className="text-zinc-500">{server.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Activity className={`h-3 w-3 ${healthColor}`} />
                                          <span className={healthColor}>{server.health}%</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Wifi className={`h-3 w-3 ${pingColor}`} />
                                          <span className={pingColor}>{server.ping}ms</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                                        server.quality === '4K' 
                                          ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' 
                                          : server.quality === '1080p'
                                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                          : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
                                      }`}>
                                        {server.quality}
                                      </span>
                                      <span className="text-[10px] text-zinc-600">{server.viewers}</span>
                                    </div>
                                  </div>

                                  <div className="mt-2.5 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <Globe className="h-3 w-3 text-zinc-600" />
                                      <span className="text-[11px] text-zinc-500">{server.language}</span>
                                    </div>
                                    <div className="h-1 w-20 overflow-hidden rounded-full bg-white/5">
                                      <div 
                                        className={`h-full transition-all duration-500 ${
                                          server.health >= 90 ? 'bg-emerald-500' : server.health >= 75 ? 'bg-amber-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${server.health}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="relative border-t border-white/5 bg-white/[0.02] px-4 py-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-zinc-500">Excellent</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                <span className="text-zinc-500">Good</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                <span className="text-zinc-500">Poor</span>
                              </div>
                            </div>
                            <span className="text-zinc-600">Auto-switch enabled</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mx-2 h-6 w-px bg-white/10" />
                
                <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all hover:bg-white/[0.06] hover:border-white/20">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-[13px] font-medium">{selectedServer.language}</span>
                  <span className="text-[14px]">{selectedServer.flag}</span>
                </button>
              </div>

              {isSwitching && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050812]/90 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full border-2 border-white/10" />
                      <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
                    </div>
                    <div className="text-center">
                      <div className="text-[13px] font-medium">Switching server...</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">Connecting to {selectedServer.name}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}