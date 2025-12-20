import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Flame } from "lucide-react"; // Ikon api lilin

export default function Cake() {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (isBlown) return; // Kalau udah ditiup, jangan jalan lagi

    setIsBlown(true);

    // --- LOGIC CONFETTI KHUSUS MOBILE & DESKTOP ---
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Ledakan Confetti Random dari Kiri & Kanan
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="relative flex flex-col items-center justify-end h-64 w-64">
      {/* LILIN (Mati kalau diklik) */}
      <motion.div 
        animate={{ opacity: isBlown ? 0 : 1, y: isBlown ? -20 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-10 z-20 flex flex-col items-center cursor-pointer"
        onClick={handleBlow}
      >
        {/* Api Lilin Animasi */}
        <div className="relative">
             <div className="absolute -inset-1 bg-orange-500 blur-lg opacity-50 animate-pulse"></div>
             <Flame className="w-8 h-8 text-orange-400 fill-orange-500 animate-bounce" />
        </div>
        <div className="w-2 h-8 bg-gradient-to-b from-yellow-100 to-yellow-600 rounded-sm mt-1"></div>
      </motion.div>

      {/* KUE (Simple CSS Art) */}
      <div 
        className="relative cursor-pointer transition-transform duration-300 active:scale-95"
        onClick={handleBlow}
      >
        {/* Layer Atas (Frosting) */}
        <div className="w-48 h-16 bg-pink-400 rounded-t-2xl relative z-10 border-b-4 border-pink-500/20">
           {/* Lelehan Krim */}
           <div className="absolute -bottom-2 flex w-full justify-around px-2">
              {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-8 bg-pink-400 rounded-full -mt-2"></div>
              ))}
           </div>
        </div>

        {/* Layer Tengah */}
        <div className="w-48 h-12 bg-rose-200 relative z-0 mx-auto border-x-4 border-black/5"></div>
        
        {/* Layer Bawah */}
        <div className="w-56 h-16 bg-rose-500 rounded-lg relative -mt-2 shadow-2xl flex items-center justify-center">
             <span className="text-white/50 text-xs font-bold tracking-widest">HBD 20</span>
        </div>

        {/* Piring */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-4 bg-white/20 rounded-[50%] blur-sm"></div>
      </div>

      {/* Instruksi Kecil */}
      {!isBlown && (
        <p className="mt-8 text-white/50 text-xs animate-pulse">
            ( Klik Lilinnya / Kuenya )
        </p>
      )}
    </div>
  );
}