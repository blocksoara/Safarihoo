import React from 'react';
import { X, ShieldAlert, CheckCircle2, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface AirHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AirHelpModal: React.FC<AirHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        id="airhelp-service-modal"
        className="w-full max-w-lg bg-zinc-950 border border-white/20 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Safarihoo AirHelp</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded">Included Service</span>
            </div>
            <p className="text-xs text-white/70">Flight delay & cancellation passenger compensation protection</p>
          </div>
        </div>

        <div className="space-y-3 my-6">
          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Up to $700 Compensation</h4>
              <p className="text-xs text-white/80">Get compensated automatically if your flight is delayed over 3 hours or cancelled.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Instant Lounge Access on Delays</h4>
              <p className="text-xs text-white/80">Complimentary VIP lounge pass activated automatically during airport delays.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Zero Hassle Claims</h4>
              <p className="text-xs text-white/80">Our legal team handles airline negotiations and deposits payouts directly into your bank.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-[#1b64f2] hover:bg-[#1654cc] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Check My Flight Eligibility</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
