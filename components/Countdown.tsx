"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onUnlock: () => void;
  // onToggleMusic dihapus karena sekarang handle sendiri di component
}

// === DATA LAGU (Ganti sesuai file di folder public/music) ===
const songs = [
  {
    id: 1,
    title: "Golden Hour",
    artist: "adalah pokoknnya",
    src: "/music/lagu1.mp3", // Pastikan file ada di public/music/
    color: "from-pink-500 to-rose-500" // Warna kaset
  },
  {
    id: 2,
    title: "Sedia Aku Sebelum Hujan",
    artist: "idgitaf",
    src: "/music/lagu2.mp3",
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Terbuang Dalam Waktu",
    artist: "barasuara",
    src: "/music/lagu3.mp3", // Opsional lagu ke-3
    color: "from-cyan-500 to-blue-500"
  }
];

export default function Countdown({ onUnlock }: CountdownProps) {
  const targetDate = new Date("2024-01-05T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white relative overflow-hidden px-4 selection:bg-pink-500/30">
      
      {/* FONTS & STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600&display=swap');
      `}</style>

      <FloatingHearts />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* === CONTENT UTAMA === */}
      <div className="z-10 flex flex-col items-center text-center relative w-full max-w-4xl">
        
        {/* TIMER SECTION */}
        <div className="mb-12 scale-90 md:scale-100">
            <motion.p 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                className="text-pink-300/80 text-[10px] md:text-xs tracking-[0.4em] uppercase font-serif mb-6"
            >
                {isExpired ? "The Wait is Over" : "Counting Down To Her Day"}
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.5 }}
              className="relative mb-8"
            >
              <span className="absolute inset-0 blur-3xl bg-pink-500/10 rounded-full"></span>
              <div style={{ fontFamily: "'Great Vibes', cursive" }} className="text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)] leading-relaxed p-2">
                Anis Wilandari
              </div>
            </motion.h1>

            {!isExpired ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-start justify-center gap-4 md:gap-10">
                <TimeDigit value={timeLeft.days} label="Days" />
                <Separator />
                <TimeDigit value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeDigit value={timeLeft.minutes} label="Mins" />
                <Separator />
                <TimeDigit value={timeLeft.seconds} label="Secs" />
              </motion.div>
            ) : (
               /* Tombol Buka Kado */
               <motion.button onClick={onUnlock} className="mt-4 px-10 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full tracking-widest uppercase text-xs font-bold shadow-lg hover:scale-105 transition-transform">
                  Open Gift 🎁
               </motion.button>
            )}
        </div>

        {/* === CASSETTE PLAYER STACK (FITUR BARU) === */}
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="w-full relative h-[250px] md:h-[300px] flex items-center justify-center perspective-1000"
        >
            <p className="absolute -top-8 text-pink-200/50 text-[10px] uppercase tracking-widest">
                ♫ Now Playing (Tap to Switch)
            </p>
            <CassetteStack />
        </motion.div>

      </div>
    </div>
  );
}

// === COMPONENT: CASSETTE STACK ===
function CassetteStack() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Ganti lagu saat index berubah
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = songs[activeIndex].src;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        }
    }, [activeIndex]);

    // Play/Pause Toggle
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // Pindah ke kaset berikutnya (Next Song)
    const nextSong = () => {
        setActiveIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true); // Auto play pas ganti
    };

    return (
        <div className="relative w-full max-w-sm flex justify-center items-center h-full">
            <audio ref={audioRef} loop />

            {/* Render Tumpukan Kaset */}
            <AnimatePresence mode="popLayout">
                {songs.map((song, index) => {
                    // Logic Hitung Posisi (Stack Effect)
                    // Cari selisih index biar tau mana yang di depan
                    let offset = index - activeIndex;
                    if (offset < 0) offset += songs.length; 

                    // Hanya render 3 kartu teratas biar ga berat
                    if (offset > 2) return null;

                    return (
                        <motion.div
                            key={song.id}
                            layout
                            onClick={offset === 0 ? togglePlay : nextSong}
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ 
                                scale: offset === 0 ? 1 : 1 - offset * 0.1, // Makin belakang makin kecil
                                y: offset * 15,  // Makin belakang makin turun dikit (efek tumpuk)
                                zIndex: songs.length - offset, // Yang aktif paling atas
                                opacity: 1 - offset * 0.3, // Makin belakang makin transparan
                                rotate: offset === 0 ? 0 : offset % 2 === 0 ? 3 : -3 // Rotasi dikit biar natural
                            }}
                            exit={{ x: -200, opacity: 0, rotate: -20 }} // Efek buang kaset ke kiri
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className={`absolute w-[280px] h-[160px] md:w-[320px] md:h-[190px] rounded-xl shadow-2xl border border-white/10 backdrop-blur-md cursor-pointer overflow-hidden group bg-gradient-to-br ${song.color}`}
                            style={{ transformOrigin: "bottom center" }}
                        >
                            {/* Desain Fisik Kaset */}
                            <div className="absolute inset-0 bg-black/20"></div>
                            
                            {/* Label Kaset (Tengah) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-black/80 rounded-lg border border-white/10 flex items-center justify-between px-6">
                                {/* Roda Kiri */}
                                <div className={`w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center ${offset === 0 && isPlaying ? "animate-spin-slow" : ""}`}>
                                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                                </div>
                                
                                {/* Info Lagu */}
                                <div className="flex-1 text-center px-2 overflow-hidden">
                                    <p className="text-white text-xs font-bold truncate">{song.title}</p>
                                    <p className="text-gray-400 text-[9px] uppercase tracking-wider truncate">{song.artist}</p>
                                </div>

                                {/* Roda Kanan */}
                                <div className={`w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center ${offset === 0 && isPlaying ? "animate-spin-slow" : ""}`}>
                                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                                </div>
                            </div>

                            {/* Tombol Play/Pause Overlay */}
                            {offset === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100">
                                        {isPlaying ? "⏸" : "▶"}
                                    </div>
                                </div>
                            )}

                            {/* Pita Kaset Bawah */}
                            <div className="absolute bottom-2 left-0 right-0 h-4 bg-black/40 mx-8 rounded-full"></div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            
            {/* Navigasi Manual (Optional) */}
            <div className="absolute -bottom-12 flex gap-4">
                <button onClick={nextSong} className="text-xs text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                    Next Tape ⏭
                </button>
            </div>
        </div>
    );
}

// === KOMPONEN VISUAL ===
function TimeDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div style={{ fontFamily: "'Cinzel', serif" }} className="text-3xl md:text-5xl font-light text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mt-2">{label}</span>
    </div>
  );
}

function Separator() {
    return <div className="text-2xl md:text-3xl text-pink-500/40 font-light pt-1 animate-pulse">:</div>
}

function FloatingHearts() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 0.3, 0] }}
                    transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, delay: Math.random() * 10, ease: "linear" }}
                    className="absolute text-pink-500/10 text-4xl"
                    style={{ fontSize: Math.random() * 20 + 20 + "px", left: Math.random() * 100 + "%" }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
}