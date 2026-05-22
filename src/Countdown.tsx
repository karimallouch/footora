import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Trophy, Users, Tv } from "lucide-react";

interface CountdownProps {
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  matchTime: Date;
  league: string;
  leagueLogo: string;
  stadium: string;
  venue: string;
  onComplete?: () => void;
}

export default function MatchCountdown({
  homeTeam,
  awayTeam,
  matchTime,
  league,
  leagueLogo,
  stadium,
  venue,
  onComplete,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = matchTime.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsLive(true);
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [matchTime, onComplete]);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  if (isLive) {
    return (
      <div className="relative overflow-hidden rounded-[28px] border border-red-500/30 bg-[#0A0F1C]">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/15867405/pexels-photo-15867405.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920" 
            alt="" 
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/90 to-[#0A0F1C]/70" />
        </div>
        <div className="relative p-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/20 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-[13px] font-bold uppercase tracking-wider text-red-400">LIVE NOW</span>
          </div>
          <div className="mt-6 text-2xl font-light">Match has started!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050812]">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/9251066/pexels-photo-9251066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920" 
          alt="" 
          className="h-full w-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050812] via-[#050812]/95 to-[#050812]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050812_70%)]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative">
        <div className="border-b border-white/5 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <img src={leagueLogo} alt="" className="h-5 w-5 object-contain brightness-0 invert opacity-80" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-white/90">{league}</div>
                <div className="text-[11px] text-zinc-500">Upcoming Match</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1">
              <Clock className="h-3 w-3 text-amber-400" />
              <span className="text-[11px] font-medium uppercase tracking-wide text-amber-400">Countdown</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-10 md:px-10 md:py-12">
          <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-20">
            <div className="flex flex-col items-center">
              <div className="group relative">
                <div className="absolute -inset-6 rounded-full bg-blue-600/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-xl" />
                  <img src={homeTeam.logo} alt={homeTeam.name} className="relative h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-2xl" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-[15px] md:text-[18px] font-semibold tracking-tight">{homeTeam.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-600">Home</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-white/10 rounded-full" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <span className="text-[13px] font-light tracking-widest text-zinc-500">VS</span>
                </div>
              </div>
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="flex flex-col items-center">
              <div className="group relative">
                <div className="absolute -inset-6 rounded-full bg-violet-600/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-xl" />
                  <img src={awayTeam.logo} alt={awayTeam.name} className="relative h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-2xl" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-[15px] md:text-[18px] font-semibold tracking-tight">{awayTeam.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-600">Away</div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <div className="flex items-center justify-center gap-2.5 md:gap-4">
              {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-2.5 md:gap-4">
                  <div className="group relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-blue-500/20 to-violet-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/80 backdrop-blur-2xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                      <div className="relative px-5 py-4 md:px-7 md:py-5">
                        <div className="text-center">
                          <div className="font-mono text-[28px] md:text-[40px] font-light leading-none tracking-tighter text-white tabular-nums">
                            {formatTime(unit.value)}
                          </div>
                          <div className="mt-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                            {unit.label}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
                    </div>
                  </div>
                  {index < timeUnits.length - 1 && (
                    <div className="hidden md:block text-[24px] font-thin text-zinc-700">:</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <span className="text-[11px] uppercase tracking-widest text-zinc-600">Match starts in</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[12px]">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{matchTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{matchTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="h-3.5 w-3.5" />
              <span>{stadium}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Trophy className="h-3.5 w-3.5" />
              <span>{venue}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.1)]" />
    </div>
  );
}