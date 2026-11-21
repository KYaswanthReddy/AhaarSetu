import React from 'react';

export default function NablReferralNotice({ batch, productCategory, onDownload }) {
  if (!batch) return null;

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b pb-2">
        <h4 className="font-bold text-slate-800 text-sm">NABL Lab Referral Notice</h4>
        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
          Pre-filled
        </span>
      </div>
      <p className="text-xs text-slate-600">
        Pre-populated testing slip for regional food testing laboratories:
      </p>
      <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1 font-mono text-slate-700">
        <div>Product: {batch.productName}</div>
        <div>Batch Lot: {batch.batchId}</div>
        <div>Category: {productCategory || 'Pickles & Preserves'}</div>
        <div>Required Tests: Moisture %, Microbial limits, Free Fatty Acids</div>
      </div>
      <button
        onClick={onDownload}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
      >
        <span>📄</span> Download Vernacular Lab Notice (PDF)
      </button>
    </div>
  );
}
