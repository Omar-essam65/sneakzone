import React from 'react';

// Reusable PasswordStrength component - receives props (password value)
function PasswordStrength({ password }) {
  const getStrength = (val) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strength = getStrength(password);

  const levels = ['', 'Weak', 'Medium', 'Good', 'Strong'];
  const colors = ['', '#e53e3e', '#dd6b20', '#3182ce', '#38a169'];
  const widths = ['0%', '25%', '50%', '75%', '100%'];

  if (!password) return null;

  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ height: '6px', background: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: widths[strength],
          background: colors[strength],
          borderRadius: '4px',
          transition: 'width 0.3s, background 0.3s'
        }} />
      </div>
      <p style={{ fontSize: '12px', marginTop: '4px', color: colors[strength], fontWeight: 600 }}>
        {levels[strength]}
      </p>
    </div>
  );
}

export default PasswordStrength;
