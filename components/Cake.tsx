"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hand } from "lucide-react"; 

export default function Cake() {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
  };

  return (
    <>
      {/* 1. CONFETTI HUJAN (Full Screen Fixed) */}
      {/* Kita taruh di luar div relative biar dia nempel di layar HP (Fixed) */}
      {isBlown && <ConfettiRain />}

      <div className="relative flex flex-col items-center justify-center pt-2 pb-10 z-10">
        
        {/* 2. TEKS INSTRUKSI */}
        <motion.div 
          animate={{ opacity: isBlown ? 0 : 1, y: isBlown ? -10 : 0 }}
          className="mb-8 text-center"
        >
           <p className="text-pink-200 font-handwriting text-xl tracking-widest mb-1">
              {isBlown ? "Yeay! Make a Wish!" : "Make a wish..."}
           </p>
           {!isBlown && (
              <p className="text-[10px] text-gray-400 uppercase tracking-widest bg-white/10 px-2 py-1 rounded-full inline-block">
                 Tap the Candle
              </p>
           )}
        </motion.div>

        {/* 3. VISUAL KUE (Compact & Cute) */}
        <div 
          className="relative cursor-pointer group scale-75 md:scale-90" 
          onClick={handleBlow}
        >
          {/* INDIKATOR TANGAN (Hilang pas ditiup) */}
          {!isBlown && (
               <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute -top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-white drop-shadow-lg"
               >
                  <Hand className="w-8 h-8 fill-white/80 rotate-180" />
               </motion.div>
          )}

          {/* --- STRUKTUR KUE --- */}
          
          {/* PIRING */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-60 h-20 bg-white/90 rounded-[50%] shadow-2xl blur-[1px]"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-52 h-16 bg-gray-100 rounded-[50%] shadow-inner"></div>

          {/* BODY */}
          <div className="relative w-40 h-28 bg-pink-300 rounded-b-[40%] shadow-[inset_-5px_-5px_20px_rgba(0,0,0,0.1)] mx-auto z-10 transition-transform duration-300 group-hover:scale-105">
              <div className="absolute top-0 w-full flex justify-center space-x-1">
                  <div className="w-3 h-6 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-4 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-8 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-5 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-7 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-4 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-6 bg-pink-200 rounded-b-full"></div>
                  <div className="w-3 h-3 bg-pink-200 rounded-b-full"></div>
              </div>
          </div>

          {/* TOP */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-20 bg-pink-200 rounded-[50%] z-20 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
               <div className="absolute top-3 left-6 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
               <div className="absolute top-2 right-8 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
               <div className="absolute bottom-3 left-8 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
               <span className="text-white/50 font-handwriting text-xs rotate-[-5deg]">HBD Sayang</span>
          </div>

          {/* LILIN */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-3 h-14 bg-gradient-to-r from-yellow-100 to-white rounded-md z-30 shadow-md">
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,182,193,0.5)_5px,rgba(255,182,193,0.5)_10px)] opacity-50"></div>
          </div>

          {/* API (FLAME) */}
          {!isBlown && (
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-40 cursor-pointer">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500/40 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-5 h-10 bg-orange-400 rounded-[50%] animate-bounce blur-[1px] shadow-[0_0_20px_orange]"></div>
                  <div className="absolute top-1 left-1.5 w-2 h-5 bg-yellow-100 rounded-[50%] animate-pulse blur-[1px]"></div>
              </div>
          )}

          {/* ASAP */}
          {isBlown && (
               <motion.div 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -50, x: 10 }}
                  transition={{ duration: 3 }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
               >
                  <span className="text-4xl opacity-40 blur-sm">💨</span>
               </motion.div>
          )}
        </div>

        {/* SURAT CINTA */}
        <AnimatePresence>
          {isBlown && (
              <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  className="mt-6 mx-6 max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-center shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden z-20"
              >
                  <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl"></div>

                  <h3 className="text-2xl font-handwriting mb-3 text-pink-300 drop-shadow-md">
                      Happy Level Up! 🎂
                  </h3>
                  <div className="text-gray-200 text-sm leading-relaxed font-light space-y-3">
                      <p>
                          Semoga di umur 20 ini kamu makin bahagia, makin pinter, dan makin sayang sama aku.
                      </p>
                      <p>
                          Aku nggak bisa kasih dunia, tapi aku janji bakal selalu ada di dunia kamu.
                      </p>
                  </div>
                  <p className="text-xs text-pink-400/80 italic mt-4 font-mono">
                      — Your #1 Fan.
                  </p>
              </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

// ============================================
// KOMPONEN BARU: CONFETTI RAIN (OPTIMAL)
// ============================================
function ConfettiRain() {
    // Warna-warni kertas
    const colors = ["#ff5e7e", "#fca311", "#2ec4b6", "#ffffff", "#e71d36"];
    
    // Kita generate 50 potong kertas
    // Ini ringan karena pakai CSS Transform biasa
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {[...Array(50)].map((_, i) => {
                // Posisi Horizontal Random (0% sampai 100% layar)
                const left = Math.random() * 100;
                // Durasi jatuh (Gravity feel) - beda beda biar natural
                const duration = Math.random() * 3 + 2; 
                // Delay biar ngga jatuh barengan semua
                const delay = Math.random() * 2;
                // Ukuran kertas
                const width = Math.random() * 8 + 5;
                const height = Math.random() * 15 + 10;
                
                return (
                    <motion.div
                        key={i}
                        initial={{ 
                            y: -50, // Mulai dari atas layar (sembunyi)
                            x: 0,
                            rotate: 0,
                            opacity: 1
                        }}
                        animate={{ 
                            y: "110vh", // Jatuh sampai bawah layar lewat dikit
                            x: [0, Math.random() * 100 - 50], // Goyang kanan kiri dikit (Wind effect)
                            rotate: 720, // Muter-muter
                            opacity: [1, 1, 0] // Fade out pas nyampe bawah
                        }}
                        transition={{ 
                            duration: duration,
                            ease: "linear",
                            delay: delay,
                            repeat: Infinity, // Ulangi terus (Hujan abadi)
                            repeatDelay: Math.random() * 2 // Jeda dikit sebelum hujan lagi
                        }}
                        className="absolute top-0"
                        style={{
                            left: `${left}%`,
                            width: width,
                            height: height,
                            backgroundColor: colors[i % colors.length],
                            borderRadius: 2, // Biar kayak potongan kertas
                        }}
                    />
                )
            })}
        </div>
    )
}