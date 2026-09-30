'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, ChevronDown, Check, Search, X } from 'lucide-react';
import { COUNTRY_CODES, DEFAULT_COUNTRY } from '@/lib/countryCodes';

export default function CountryPhoneInput({
  value = '',
  onChange,
  required = false,
  className = '',
  placeholder,
  autoFocus = false,
  helperText,
  id = 'phone-input'
}) {
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  // Adjust state when value prop changes (React recommended pattern without effect)
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (!value) {
      setPhoneNumber('');
    } else {
      const trimmed = value.trim();
      const matched = COUNTRY_CODES.find(c => trimmed.startsWith(c.dialCode));
      if (matched) {
        setSelectedCountry(matched);
        setPhoneNumber(trimmed.slice(matched.dialCode.length).trim());
      } else {
        setPhoneNumber(trimmed);
      }
    }
  }

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 40);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Clean formatting: digits only, formatted with spaces
  const formatInput = (raw, dialCode) => {
    const digits = raw.replace(/\D/g, '');
    if (dialCode === '+91') {
      // 10-digit India format: 5 digits + space + 5 digits
      const trimmed = digits.slice(0, 10);
      if (trimmed.length > 5) {
        return `${trimmed.slice(0, 5)} ${trimmed.slice(5)}`;
      }
      return trimmed;
    }
    // Generic format for other countries
    const trimmed = digits.slice(0, 14);
    if (trimmed.length > 6) {
      return `${trimmed.slice(0, 3)} ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`;
    }
    if (trimmed.length > 3) {
      return `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`;
    }
    return trimmed;
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');

    const formatted = formatInput(phoneNumber, country.dialCode);
    setPhoneNumber(formatted);

    const fullVal = formatted.trim() ? `${country.dialCode} ${formatted.trim()}` : '';
    setPrevValue(fullVal);
    if (onChange) {
      onChange(fullVal, { country, number: formatted.trim() });
    }
  };

  const handleInputChange = (e) => {
    const rawVal = e.target.value;
    const formatted = formatInput(rawVal, selectedCountry.dialCode);
    setPhoneNumber(formatted);

    const fullVal = formatted.trim() ? `${selectedCountry.dialCode} ${formatted.trim()}` : '';
    setPrevValue(fullVal);
    if (onChange) {
      onChange(fullVal, { country: selectedCountry, number: formatted.trim() });
    }
  };

  const handleClear = () => {
    setPhoneNumber('');
    setPrevValue('');
    if (onChange) {
      onChange('', { country: selectedCountry, number: '' });
    }
  };

  // Filter countries
  const filteredCountries = COUNTRY_CODES.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const defaultHelperText = selectedCountry.dialCode === '+91'
    ? 'India (+91) selected by default. Enter your 10-digit mobile number.'
    : `${selectedCountry.name} (${selectedCountry.dialCode}) selected. Enter your mobile number.`;

  return (
    <div className={`country-phone-input-root relative w-full ${className}`} ref={containerRef}>
      {/* Standardized Single Input Row (Height: 48px - 50px) */}
      <div className="relative flex items-center w-full h-12 sm:h-[50px] rounded-xl bg-white border border-[#D3DFD7] focus-within:border-[#2A9D8F] focus-within:ring-2 focus-within:ring-[#2A9D8F]/15 transition-all shadow-xs">
        
        {/* Left: Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Country code selector. Currently ${selectedCountry.name} (${selectedCountry.dialCode})`}
          className="h-full flex items-center gap-1.5 px-3 bg-[#F8FAF9] hover:bg-[#EEF4F0] border-r border-[#D3DFD7] rounded-l-xl transition-colors cursor-pointer select-none flex-shrink-0 text-xs text-[#29443A] focus:outline-none focus:bg-[#EEF4F0]"
        >
          <span className="text-base leading-none" role="img" aria-label={selectedCountry.name}>{selectedCountry.flag}</span>
          <span className="font-mono font-bold text-[#136A5E] text-xs">{selectedCountry.code}</span>
          <span className="font-mono font-semibold text-[#29443A] text-xs">{selectedCountry.dialCode}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-[#5F746B] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2A9D8F]' : ''}`} />
        </button>

        {/* Right: Phone Input Field */}
        <div className="relative flex-1 flex items-center h-full min-w-0">
          <Phone className="w-4 h-4 text-[#2A9D8F] ml-3 mr-1 flex-shrink-0 opacity-60 pointer-events-none" />
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required={required}
            autoFocus={autoFocus}
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder={placeholder || (selectedCountry.dialCode === '+91' ? '98765 43210' : selectedCountry.placeholder)}
            className="w-full h-full px-2.5 bg-transparent text-[#29443A] text-sm font-medium placeholder:text-[#94A79C] placeholder:font-normal focus:outline-none tracking-normal"
          />

          {phoneNumber && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-3 w-4 h-4 rounded-full bg-[#EEF3EF] hover:bg-[#D3DFD7] text-[#5F746B] flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
              title="Clear number"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {/* Compact, Non-overlapping Popover Country Dropdown */}
        {isOpen && (
          <div 
            className="absolute left-0 top-[calc(100%+6px)] w-[320px] sm:w-[350px] max-w-[calc(100vw-2.5rem)] bg-white border border-[#D3DFD7] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in duration-100"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            {/* Search Header */}
            <div className="p-2.5 bg-[#F8FAF9] border-b border-[#E8EFEA]">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-[#5F746B] absolute left-2.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or dial code..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white border border-[#D3DFD7] text-xs text-[#29443A] placeholder:text-[#94A79C] focus:outline-none focus:border-[#2A9D8F] focus:ring-1 focus:ring-[#2A9D8F]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-[#5F746B] hover:text-[#29443A]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Country Rows (Height: 38px each, Max Container: 260px) */}
            <div className="max-h-[260px] overflow-y-auto divide-y divide-[#F2F7F4] p-1 bg-white">
              {filteredCountries.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#5F746B]">
                  No country matching &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = selectedCountry.code === c.code && selectedCountry.dialCode === c.dialCode;
                  return (
                    <button
                      key={`${c.code}-${c.dialCode}`}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={`w-full h-10 px-2.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#EAF7F2] text-[#136A5E] font-semibold'
                          : 'hover:bg-[#F8FAF9] text-[#29443A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm leading-none flex-shrink-0" role="img" aria-label={c.name}>{c.flag}</span>
                        <span className="font-mono text-[11px] text-[#5F746B] font-bold w-6 flex-shrink-0 text-left">{c.code}</span>
                        <span className="truncate max-w-[150px] font-medium text-left">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className="font-mono text-xs text-[#136A5E] font-semibold">{c.dialCode}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#136A5E] stroke-[2.5]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle Aligned Helper Text */}
      <p className="text-[11px] text-[#5F746B] mt-1.5 pl-0.5 leading-normal">
        {helperText || defaultHelperText}
      </p>
    </div>
  );
}
