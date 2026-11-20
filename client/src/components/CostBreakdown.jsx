import React from 'react';

export default function CostBreakdown({ costData }) {
  if (!costData) return null;

  const isLoss = costData.sellingPrice < costData.costPerPack;

  return (
    <div className="bg-slate-50 p-4 rounded-xl border space-y-2 text-xs">
      <h4 className="font-bold text-slate-700">True Landed Cost Breakdown</h4>
      <div className="flex justify-between text-slate-600">
        <span>Raw Material:</span>
        <span className="font-mono">₹{costData.rawMaterialCost}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Packaging (Jar + Cap + Sticker):</span>
        <span className="font-mono">₹{costData.packagingCost}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>LPG Fuel & Utilities:</span>
        <span className="font-mono">₹{costData.fuelCost}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Labour:</span>
        <span className="font-mono">₹{costData.labourCost}</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-bold text-slate-800">
        <span>Cost Per Pack:</span>
        <span className="font-mono text-emerald-700">₹{costData.costPerPack}</span>
      </div>

      {isLoss && (
        <div className="p-2 bg-red-100 text-red-700 rounded-md font-semibold text-[11px]">
          ⚠️ Alert: Your selling price (₹{costData.sellingPrice}) is below break-even!
        </div>
      )}
    </div>
  );
}
