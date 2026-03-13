"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, MessageSquare, Instagram, ExternalLink } from "lucide-react";

export default function EmbedPage() {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Simulate widget rendering based on ID
  const renderWidget = () => {
    if (id?.toString().includes("review")) {
      return (
        <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-sm border border-neutral-100">
          <div className="flex gap-1 mb-3 text-yellow-500">
             {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current" />)}
          </div>
          <p className="text-neutral-600 text-sm italic mb-4">"The best service I've ever used. Highly recommended!"</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-100" />
            <span className="text-xs font-bold">Verified Customer</span>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-50 flex justify-between items-center">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Powered by Kodarafroj</span>
             <ExternalLink size={12} className="text-neutral-300" />
          </div>
        </div>
      );
    }
    
    return (
      <div className="p-10 bg-black text-white rounded-3xl flex flex-col items-center justify-center text-center">
        <MessageSquare className="w-12 h-12 text-primary mb-4 animate-bounce" />
        <h2 className="font-bold">Live Chat Active</h2>
        <p className="text-neutral-500 text-sm mt-2">Connecting to support...</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
       {renderWidget()}
    </div>
  );
}
