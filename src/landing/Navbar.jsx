'use client';
import React from 'react';

// Navbar.jsx
export const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (id) => {
    if (window.triggerPageTransition) {
      window.triggerPageTransition(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setDropdownOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: scrolled ? '0' : '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: scrolled ? '100%' : 'calc(100% - 96px)',
      maxWidth: scrolled ? '100%' : '1200px',
      height: '64px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      borderRadius: scrolled ? '0' : '999px',
      background: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 12px 32px rgba(0, 0, 0, 0.4)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }}>
      <Logo size={20} />
      
      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
           onMouseLeave={e => e.currentTarget.style.color = '#A0A0A0'}>Home</a>
        <a href="#avatar" onClick={(e) => { e.preventDefault(); handleScroll('avatar-explainer'); }} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
           onMouseLeave={e => e.currentTarget.style.color = '#A0A0A0'}>AI Avatar</a>
        <a href="#features" onClick={(e) => { e.preventDefault(); handleScroll('explainer-video'); }} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
           onMouseLeave={e => e.currentTarget.style.color = '#A0A0A0'}>Features</a>
        
        {/* Resources Dropdown Container */}
        <div 
          style={{ 
            position: 'relative',
            paddingBottom: '16px', // Hover bridge
            marginBottom: '-16px' // offset padding
          }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span style={{ 
            fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#A0A0A0', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            transition: 'color 0.2s' 
          }}
             onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
             onMouseLeave={e => e.currentTarget.style.color = '#A0A0A0'}
             onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Resources
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}>
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0,
              background: '#111111', border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 8, padding: '8px 0', minWidth: 160,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 101,
              marginTop: 0 // Flush with container bottom
            }}>
              {[
                { label: "FAQ's", target: 'faq' },
                { label: "About Founder", target: 'about-founder' },
                { label: "Blogs", target: 'blogs' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleScroll(item.target)}
                  style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#888880',
                    padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#888880'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a
          href="/login"
          style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 500, color: '#A0A0A0', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
          onMouseLeave={e => e.currentTarget.style.color = '#A0A0A0'}
        >
          Sign In
        </a>
        <button
          onClick={() => handleScroll('contact')}
          style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 600,
            background: '#C9A84C', color: '#0A0A0A',
            border: 'none', borderRadius: '99px',
            padding: '6px 16px', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#DFBE60'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Book a Demo
        </button>
      </div>
    </nav>
  );
};

export const Logo = ({ size = 22 }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: size, fontWeight: 700, letterSpacing: '-0.02em' }}>
    <span style={{ color: '#F5F0E8' }}>intervie</span>
    <span style={{ background: 'linear-gradient(90deg,#FF6B35,#E91E8C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hire</span>
    <svg style={{ marginLeft: 4 }} width={size * 0.7} height={size * 0.7} viewBox="0 0 22 22" fill="none">
      <path d="M6 16L16 6M16 6H9M16 6V13" stroke="#FF6B35" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

