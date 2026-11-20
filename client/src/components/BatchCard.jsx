import React from 'react';

export default function BatchCard({ batch, onShare }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
            {batch.batchId}
          </span>
          <h3 className="font-bold text-slate-800 mt-1">{batch.productName}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          batch.ownerApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {batch.ownerApproved ? 'Verified' : 'Draft'}
        </span>
      </div>

      <div className="text-xs text-slate-500 space-y-1 mb-3">
        <p>Total Packs: {batch.totalPacks} ({batch.packSizeGrams}g each)</p>
        <p>Landed Cost: ₹{batch.costPerPack} | MRP: ₹{batch.mrp}</p>
      </div>

      <button
        onClick={() => onShare(batch)}
        className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
      >
        <span>📲</span> Share Buyer Dossier (WhatsApp)
      </button>
    </div>
  );
}
