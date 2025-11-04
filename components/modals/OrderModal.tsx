'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const variantMap: Record<string, string> = {
  'Small-Standard': '34867137085605',
  'Small-Long': '34867137151141',
  'Regular-Standard': '34867137216677',
  'Regular-Long': '34867137249445',
  'Tall-Standard': '34867137314981',
  'Tall-Long': '34867137347749',
};

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [measurementA, setMeasurementA] = useState('');
  const [measurementB, setMeasurementB] = useState('');
  const [braceSize, setBraceSize] = useState('');
  const [strapSize, setStrapSize] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedA = localStorage.getItem('fl-measurement-a');
      const savedB = localStorage.getItem('fl-measurement-b');
      if (savedA) setMeasurementA(savedA);
      if (savedB) setMeasurementB(savedB);
      if (savedA && savedB) {
        calculateSize(parseFloat(savedA), parseFloat(savedB));
      }
    }
  }, [isOpen]);

  const calculateSize = (inputA: number, inputB: number) => {
    if (!inputA || !inputB) {
      setShowResult(false);
      setShowWarning(false);
      setShowPrice(false);
      return;
    }

    localStorage.setItem('fl-measurement-a', inputA.toString());
    localStorage.setItem('fl-measurement-b', inputB.toString());

    if (inputA < 16 || inputA > 24 || inputB < 14 || inputB > 29) {
      setShowResult(false);
      setShowWarning(true);
      setShowPrice(false);
      return;
    }

    setShowWarning(false);

    let brace: string;
    if (inputA >= 16 && inputA <= 18.5) {
      brace = 'Small';
    } else if (inputA > 18.5 && inputA <= 21) {
      brace = 'Regular';
    } else {
      brace = 'Tall';
    }

    let strap: string;
    if (inputB >= 14 && inputB <= 21) {
      strap = 'Standard';
    } else {
      strap = 'Long';
    }

    setBraceSize(brace);
    setStrapSize(strap);
    localStorage.setItem('fl-brace-size', brace);
    localStorage.setItem('fl-strap-size', strap);
    setShowResult(true);
    setShowPrice(true);
  };

  const handleInputChange = (field: 'A' | 'B', value: string) => {
    const numValue = parseFloat(value);

    if (field === 'A') {
      setMeasurementA(value);
      if (measurementB) {
        calculateSize(numValue, parseFloat(measurementB));
      }
    } else {
      setMeasurementB(value);
      if (measurementA) {
        calculateSize(parseFloat(measurementA), numValue);
      }
    }
  };

  const proceedToOrder = () => {
    const sizeKey = `${braceSize}-${strapSize}`;
    const variantId = variantMap[sizeKey];

    if (variantId) {
      window.location.href = `https://freedom-leg-brace.myshopify.com/cart/${variantId}:1`;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Order">
      <ModalBody>
        <div className="text-center mb-6">
          <h3 className="text-[1.3em] mb-[10px] text-[#333]">Find Your Perfect Fit</h3>
          <p className="text-[0.95em] text-[#666] leading-[1.5]">
            Take two quick measurements to get your size
          </p>
        </div>
        <div className="flex flex-col gap-5 mb-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base text-[#333] flex items-center gap-2">
              📏 Measurement A
            </label>
            <p className="text-[0.85em] text-[#666] leading-[1.4] ml-7">
              From floor to top of kneecap
            </p>
            <div className="flex gap-[10px] items-center">
              <input
                type="number"
                value={measurementA}
                onChange={(e) => handleInputChange('A', e.target.value)}
                placeholder="Enter inches"
                className="flex-1 p-3 border-2 border-[#ddd] rounded-lg text-[1.1em] font-semibold transition-all duration-250 focus:outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.1)]"
              />
              <span className="text-base text-[#666] font-semibold">inches</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-base text-[#333] flex items-center gap-2">
              📏 Measurement B
            </label>
            <p className="text-[0.85em] text-[#666] leading-[1.4] ml-7">Mid-thigh circumference</p>
            <div className="flex gap-[10px] items-center">
              <input
                type="number"
                value={measurementB}
                onChange={(e) => handleInputChange('B', e.target.value)}
                placeholder="Enter inches"
                className="flex-1 p-3 border-2 border-[#ddd] rounded-lg text-[1.1em] font-semibold transition-all duration-250 focus:outline-none focus:border-[#0f766e] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.1)]"
              />
              <span className="text-base text-[#666] font-semibold">inches</span>
            </div>
          </div>
        </div>
        {showResult && (
          <div className="bg-[rgba(15,118,110,0.1)] border-2 border-[#0f766e] rounded-lg p-5 text-center mb-5">
            <h3 className="text-[#0f766e] text-[1.4em] mb-[10px]">Your Size</h3>
            <div className="text-[1.8em] font-bold text-[#0f766e] mb-[5px]">
              {braceSize} Brace / {strapSize} Strap
            </div>
            <p className="text-[0.9em] text-[#666]">
              Measurement A: {measurementA}" | Measurement B: {measurementB}"
            </p>
          </div>
        )}
        {showPrice && (
          <div className="bg-[#f5f5f5] border-2 border-[#e0e0e0] rounded-lg p-5 text-center mb-5">
            <div className="text-[2.2em] font-bold text-[#0f766e] mb-[10px]">$395</div>
            <div className="text-[0.85em] text-[#666] leading-[1.6] mb-[15px]">
              Insurance code L2136 • HSA/FSA eligible
            </div>
            <div className="h-[1px] bg-[#ddd] my-[15px]"></div>
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-start gap-2 text-[0.9em] text-[#333]">
                <span className="text-[#0f766e] font-bold flex-shrink-0">✓</span>
                <span>0% financing — Just $66/month for 6 months</span>
              </div>
              <div className="flex items-start gap-2 text-[0.9em] text-[#333]">
                <span className="text-[#0f766e] font-bold flex-shrink-0">✓</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-start gap-2 text-[0.9em] text-[#333]">
                <span className="text-[#0f766e] font-bold flex-shrink-0">✓</span>
                <span>Free 2-3 day delivery (ships same day)</span>
              </div>
              <div className="flex items-start gap-2 text-[0.9em] text-[#333]">
                <span className="text-[#0f766e] font-bold flex-shrink-0">✓</span>
                <span>Eligible for insurance reimbursement (code L2136)</span>
              </div>
            </div>
            <div className="text-[0.85em] text-[#666] mt-[15px] italic">
              That's less than $6/day during your recovery
            </div>
          </div>
        )}
        {showWarning && (
          <div className="bg-[#fff7ed] border-2 border-[#ff9800] rounded-lg p-5 text-center">
            <h3 className="text-[#ff9800] text-[1.3em] mb-[15px]">📞 Please Call for Sizing Help</h3>
            <p className="text-[0.95em] text-[#333] leading-[1.6] mb-[10px]">
              Your measurements fall outside our standard range. Our team can help find the right
              solution for you.
            </p>
            <div className="text-[1.3em] font-bold text-[#ff9800] my-[15px]">(888) 816-8127</div>
            <p className="text-[0.95em] text-[#333] leading-[1.6] mb-[10px]">
              Mon-Fri, 9am-5pm EST
            </p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className="hidden lg:inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e]"
        >
          Close
        </button>
        <button
          onClick={proceedToOrder}
          disabled={!showResult}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.98)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0]"
        >
          Add to Cart
        </button>
      </ModalFooter>
    </Modal>
  );
}
