import React from 'react';

export default function BuyerDossierModal({ isOpen, onClose, batch, qrUrl }) {
  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-base text-slate-800">Buyer Readiness Dossier</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
        </div>
        <div className="text-xs space-y-2 text-slate-600">
          <p className="font-medium text-slate-800">1-Page verified summary for retail & ONDC buyers:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>FSSAI Registration & Category Code</li>
            <li>Traceable Batch Lot ID & Lineage</li>
            <li>100g Macro Nutritional Profile</li>
            <li>Allergen & Additive INS Declarations</li>
            <li>True Landed Cost & Retail Margin Sheet</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
          <p className="text-[11px] text-emerald-800 font-semibold mb-1">Scannable QR Verification Link</p>
          <span className="font-mono text-[10px] text-emerald-600 break-all">{qrUrl || `https://ahaarsetu.in/verify/${batch.batchId}`}</span>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition"
        >
          Close Dossier
        </button>
      </div>
    </div>
  );
}
