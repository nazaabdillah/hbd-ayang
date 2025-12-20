"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false); // State untuk label petunjuk
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // GANTI NOMOR WA PACAR DISINI (Format: 628xxx)
  const phoneNumber = "6283841742172"; 

  // Logic: Label muncul otomatis setelah 2 detik website dibuka
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
      {/* WRAPPER UTAMA (Fixed di pojok kanan bawah) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none">
        
        {/* 1. LABEL PETUNJUK (BUBBLE CHAT) */}
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mr-4 mb-2 pointer-events-auto"
            >
              {/* Box Putih */}
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tr-none shadow-xl border border-pink-100 max-w-[150px] text-right">
                <p className="text-xs font-handwriting font-bold text-pink-500 leading-tight">
                   Kirim ucapan HBD ke Anis di sini! 👇
                </p>
              </div>

              {/* Panah Lengkung (SVG Hand Drawn) */}
              <svg 
                className="absolute -bottom-8 -right-2 w-8 h-8 text-white drop-shadow-sm transform rotate-12"
                viewBox="0 0 100 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8"
                strokeLinecap="round"
              >
                 {/* Gambar panah melengkung simpel */}
                 <path d="M20,10 C40,40 60,60 80,80" className="text-white" strokeWidth="10" />
                 <path d="M80,80 L60,85 M80,80 L75,60" className="text-white" strokeWidth="10" />
                 {/* Layer warna pink biar cantik */}
                 <path d="M20,10 C40,40 60,60 80,80" className="text-pink-400" />
                 <path d="M80,80 L60,85 M80,80 L75,60" className="text-pink-400" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. TOMBOL FLOATING (Bulat) */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(true);
            setShowLabel(false); // Pas diklik, label hilang biar bersih
          }}
          className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(236,72,153,0.6)] border-4 border-white/20 flex items-center justify-center pointer-events-auto group relative overflow-hidden"
        >
          {/* Efek kilap melintas */}
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
          
          <MessageCircle className="w-7 h-7 fill-white/20 animate-pulse" />
        </motion.button>

      </div>

      {/* 3. MODAL FORM (SAMA KAYAK SEBELUMNYA) */}
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