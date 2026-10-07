import React, { useState } from 'react';

/**
 * @title Vibe/Vibe Cyber-Slot Machine - Progressive Individual Edition
 * @dev Mapped with Official v/v logo and \$COOKING token cultural mechanics.
 * Features 3 real-time progressive pools filling up per spin.
 */
export default function SlotMachine() {
  const [credits, setCredits] = useState(1208); 
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🤖', '💛', '🦅']);
  const [gameResult, setGameResult] = useState('idle');

  const [megaVibePot, setMegaVibePot] = useState(45685); 
  const [cookingPot, setCookingPot] = useState(12080);   
  const [minChefPot, setMinChefPot] = useState(1250);    

  const tokenCA = "0x8754b2dcd680a1334fe8b1d7d0a273b400975932";

  const spinSlots = () => {
    if (isSpinning || credits < 10) return;
    
    setIsSpinning(true);
    setGameResult('idle');
    setCredits(prev => prev - 10); 

    setMegaVibePot(prev => prev + 5);   
    setCookingPot(prev => prev + 25);   
    setMinChefPot(prev => prev + 50);   

    const masterRoll = Math.floor(Math.random() * 1000) + 1;

    setTimeout(() => {
      if (masterRoll === 777) {
        setReels(['💛', '💛', '💛']); 
        setGameResult('mega_jackpot');
        setCredits(prev => prev + megaVibePot);
        setMegaVibePot(45000); 
        setIsSpinning(false);
        return;
      }

      const pool = ['💛', '🐔', '👨‍🍳', '🤖', '🦅'];
      
      const r1 = pool[Math.floor(Math.random() * pool.length)];
      const r2 = pool[Math.floor(Math.random() * pool.length)];
      const r3 = pool[Math.floor(Math.random() * pool.length)];

      const finalR3 = (r1 === '💛' && r2 === '💛' && r3 === '💛') ? '🐔' : r3;
      
      setReels([r1, r2, finalR3]);

      if (r1 === r2 && r2 === finalR3) {
        if (r1 === '🐔') {
          setGameResult('big_win'); 
          setCredits(prev => prev + cookingPot);
          setCookingPot(10000); 
        } else if (r1 === '👨‍🍳') {
          setGameResult('min_win'); 
          setCredits(prev => prev + minChefPot);
          setMinChefPot(1000); 
        } else if (r1 === '🤖') {
          setGameResult('robot_win'); 
          setCredits(prev => prev + 30);
        } else if (r1 === '🦅') {
          setGameResult('robin_win'); 
          setCredits(prev => prev + 15);
        }
      } else {
        setGameResult('lose');
      }
      
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-4 mb-6 text-center space-y-4 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-cyan-400">
          🎰 VIBE PROGRESSIVE POTS // THE KITCHEN IS HEATING UP! 🎰
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950 border border-yellow-500/20 rounded-2xl p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-yellow-400 tracking-wider">💎 MEGA VIBE</span>
            <span className="text-xs font-mono font-black mt-1">\${megaVibePot}</span>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 border border-slate-800 overflow-hidden">
              <div className="bg-yellow-400 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="bg-slate-950 border border-fuchsia-500/20 rounded-2xl p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-fuchsia-400 tracking-wider">🐔 COOKING POT</span>
            <span className="text-xs font-mono font-black mt-1">\${cookingPot}</span>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 border border-slate-800 overflow-hidden">
              <div className="bg-fuchsia-500 h-full rounded-full" style={{ width: '54%' }}></div>
            </div>
          </div>
          <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-cyan-400 tracking-wider">👨‍🍳 DAILY DROP</span>
            <span className="text-xs font-mono font-black mt-1">\${minChefPot}</span>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 border border-slate-800 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: '81%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm bg-slate-900 border-2 border-cyan-500/20 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
        <h1 className="text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          VIBE CYBER-SLOT
        </h1>
        <div className="relative bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-fuchsia-500/60 shadow-[0_0_8px_rgba(240,70,250,0.8)] z-10 transform -translate-y-1/2"></div>
          <div className="flex justify-center gap-4">
            {reels.map((symbol, index) => (
              <div key={index} className={`w-16 h-20 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-3xl ${isSpinning ? 'animate-pulse' : ''}`}>
                {symbol}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900">
            <span className="text-slate-500 block text-[9px] uppercase">Balance</span>
            <strong className="text-cyan-400 text-sm">{credits} \$COOKING</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col justify-center">
            {gameResult === 'idle' && <span className="text-slate-400">PULL LEVER</span>}
            {gameResult === 'lose' && <span className="text-rose-500 font-bold">TRY AGAIN</span>}
            {gameResult === 'min_win' && <span className="text-amber-400 font-bold">👨‍🍳 WIN!</span>}
            {gameResult === 'big_win' && <span className="text-emerald-400 font-bold">🎉 BIG WIN!!</span>}
            {gameResult === 'mega_jackpot' && <span className="text-yellow-400 font-black animate-bounce">💎 JACKPOT!!</span>}
          </div>
        </div>
        <button onClick={spinSlots} disabled={isSpinning || credits < 10} className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-slate-950 font-black py-4 rounded-xl tracking-widest text-xs uppercase transition-all transform active:scale-95 disabled:opacity-50">
          {isSpinning ? 'Spinning...' : 'Play (10 \$COOKING)'}
        </button>
      </div>
    </div>
  );
}
