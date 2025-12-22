"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const phoneNumber = "628123456789"; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hai Anis! 🎉%0A%0AAku ${name} mau ngucapin:%0A${message}%0A%0AHappy Birthday ya! 🎂`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    setIsOpen(false);
    setName("");
    setMessage("");
  };

  return (
    <>
      {/* WRAPPER (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center pointer-events-none">
        
        {/* 1. CURVED TEXT RING (TANPA BACKGROUND) */}
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              // Posisi absolute di tengah-tengah tombol
              className="absolute w-32 h-32 flex items-center justify-center"
            >
              {/* SVG Berputar Pelan (Manual Animation di style biar gak ribet config) */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                style={{ animation: "spin 10s linear infinite" }}
              >
                <defs>
                  {/* Jalur Lingkaran untuk Teks */}
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>

                {/* Teks Melengkung */}
                <text fontSize="11.5" fontWeight="bold" letterSpacing="1.2">
                  <textPath 
                    href="#circlePath" 
                    className="fill-white drop-shadow-md uppercase font-mono"
                  >
                    ✨ Kirim Ucapan Ulang Tahun Disini ✨
                  </textPath>
                </text>
              </svg>
              
              {/* Style untuk animasi putar (Inject langsung biar sat-set) */}
              <style jsx>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. TOMBOL FLOATING (TETAP SAMA) */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(true);
            setShowLabel(false);
          }}
          className="relative bg-gradient-to-tr from-pink-500 to-purple-500 text-white w-14 h-14 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.6)] border-2 border-white flex items-center justify-center pointer-events-auto z-20"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          <MessageCircle className="w-6 h-6 fill-white/20" />
        </motion.button>

      </div>

      {/* 3. MODAL FORM (TETAP SAMA) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-handwriting text-pink-500 mb-1">Make a Wish! ✨</h3>
              <p className="text-xs text-gray-500 mb-6">Tulis ucapanmu, nanti akan terkirim ke WhatsApp Anis.</p>

              <form onSubmit={handleSend} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Nama Kamu</label>
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Isi nama kamu..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Ucapan Doa</label>
                    <textarea 
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder="Tulis doa terbaikmu..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all placeholder:text-gray-300 resize-none"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" /> Kirim ke WhatsApp
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}