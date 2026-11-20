import React from 'react';

export default function LabelPreview({ batch }) {
  if (!batch) return null;

  return (
    <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl bg-amber-50/30">
      <div className="text-center pb-2 border-b border-slate-200">
        <h4 className="font-black text-sm uppercase tracking-wide">{batch.productName}</h4>
        <p className="text-[10px] text-slate-500">FSSAI Lic. No: {batch.fssaiNumber || 'Applied For'}</p>
      </div>

      <div className="text-[11px] py-2 space-y-1">
        <p><span className="font-semibold">Batch No:</span> {batch.batchId}</p>
        <p><span className="font-semibold">Net Weight:</span> {batch.packSizeGrams}g</p>
        <p><span className="font-semibold">Mfg Date:</span> {new Date().toLocaleDateString('en-IN')}</p>
        <p className="leading-snug">
          <span className="font-semibold">Ingredients: </span>
          {batch.ingredients?.map(i => i.name).join(', ')}
        </p>
      </div>

      {batch.allergens && batch.allergens.length > 0 && (
        <div className="mt-1 pt-1 border-t text-[10px] text-red-600 font-bold">
          CONTAINS ALLERGENS: {batch.allergens.join(', ').toUpperCase()}
        </div>
      )}
    </div>
  );
}
