"use client";

import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function Cake() {
  const [isBlown, setIsBlown] = useState(false);
  
  // 1. KITA BIKIN REFERENSI KE CANVAS SENDIRI
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBlow = () => {
    if (isBlown) return;

    setIsBlown(true);
    
    // 2. INISIALISASI CONFETTI KE CANVAS KITA (BUKAN KE BODY)
    // Ini kuncinya biar gak blank putih di HP
    const myConfetti = confetti.create(canvasRef.current!, {
      resize: true, // Otomatis nyesuain ukuran layar HP
      useWorker: true
    });

    // === SETTINGAN CONFETTI ===
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    
    const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 50, // Layer di atas kue
    };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      
      // Stop interval kalau waktu habis
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Tembak confetti pakai instance 'myConfetti'
      myConfetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      });
      myConfetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      });
    }, 250);
  };

  return (
    <>
      {/* 3. ELEMEN CANVAS MANUAL
          Kita taruh fixed di layar, full screen, tapi pointer-events-none 
          biar tetep bisa klik kue di bawahnya.
      */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      />

      <div className="relative flex flex-col items-center justify-center pt-10 pb-20 z-10">
          
        {/* INSTRUCTION TEXT */}
        <motion.p 
          animate={{ opacity: isBlown ? 0 : 1, y: isBlown ? -20 : 0 }}
          className="text-pink-200 mb-12 font-handwriting text-2xl tracking-widest text-center"
        >
          {isBlown ? "Yeay! Make a Wish!" : "Make a wish & tap the candle..."}
        </motion.p>

        {/* === THE AESTHETIC CAKE === */}
        <div 
          className="relative cursor-pointer group" 
          onClick={handleBlow}
        >
          {/* 1. PIRING (Plate) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-24 bg-white/90 rounded-[50%] shadow-2xl blur-[1px]"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-20 bg-gray-100 rounded-[50%] shadow-inner"></div>

          {/* 2. BODY KUE (Layer Bawah) */}
          <div className="relative w-48 h-32 bg-pink-300 rounded-b-[40%] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.1)] mx-auto z-10 transition-transform duration-300 group-hover:scale-105">
              {/* CREAM DRIPS */}
              <div className="absolute top-0 w-full flex justify-center space-x-1">
                  <div className="w-4 h-8 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-5 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-10 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-6 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-9 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-5 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-8 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-4 bg-pink-200 rounded-b-full"></div>
                  <div className="w-4 h-7 bg-pink-200 rounded-b-full"></div>
              </div>
          </div>

          {/* 3. TOP KUE (Layer Atas - Oval) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-pink-200 rounded-[50%] z-20 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
              {/* Hiasan Cherry */}
              <div className="absolute top-4 left-6 w-4 h-4 bg-red-400 rounded-full shadow-sm"></div>
              <div className="absolute top-2 right-10 w-4 h-4 bg-red-400 rounded-full shadow-sm"></div>
              <div className="absolute bottom-4 left-10 w-4 h-4 bg-red-400 rounded-full shadow-sm"></div>
              {/* Tulisan */}
              <span className="text-white/50 font-handwriting text-sm rotate-[-5deg]">HBD Sayang</span>
          </div>

          {/* 4. LILIN (Candle) */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-3 h-16 bg-gradient-to-r from-yellow-100 to-white rounded-md z-30 shadow-md">
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,182,193,0.5)_5px,rgba(255,182,193,0.5)_10px)] opacity-50"></div>
          </div>

          {/* 5. API (FLAME) */}
          {!isBlown && (
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-40">
                  <div className="w-4 h-8 bg-orange-400 rounded-[50%] animate-bounce blur-[1px]"></div>
                  <div className="absolute top-1 left-1 w-2 h-4 bg-yellow-200 rounded-[50%] animate-pulse blur-[2px]"></div>
                  <div className="absolute -bottom-10 -left-4 w-12 h-12 bg-orange-500/30 rounded-full blur-xl animate-pulse"></div>
              </div>
          )}

          {/* 6. ASAP (Smoke) */}
          {isBlown && (
              <motion.div 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -80, x: 20 }}
                  transition={{ duration: 3 }}
                  className="absolute -top-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              >
                  <span className="text-5xl opacity-40 blur-sm">💨</span>
              </motion.div>
          )}
        </div>

        {/* === SURAT CINTA === */}
        {isBlown && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, type: "spring" }}
              className="mt-16 mx-4 max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center shadow-[0_0_40px_rgba(255,192,203,0.2)] relative overflow-hidden z-50"
            >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>

                <h3 className="text-3xl font-handwriting mb-4 text-pink-300 drop-shadow-md">
                  Selamat Ulang Tahun! ❤️
                </h3>
                <div className="text-gray-200 leading-relaxed font-light space-y-4">
                  <p>
                      Semoga di umur 20 ini kamu makin bahagia, makin pinter, dan makin sayang sama aku (wajib).
                  </p>
                  <p>
                      Aku nggak bisa kasih dunia, tapi aku janji bakal selalu ada di dunia kamu.
                  </p>
                </div>
                <p className="text-sm text-pink-400/80 italic mt-6 font-mono">
                  — Forever Yours.
                </p>
            </motion.div>
        )}

      </div>
    </>
  );
}