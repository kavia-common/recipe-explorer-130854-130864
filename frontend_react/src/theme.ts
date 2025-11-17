export const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B', // success as amber
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.08)',
    lg: '0 10px 15px rgba(0,0,0,0.12)',
  },
  spacing: (n: number) => `${n * 4}px`,
  transition: 'all 200ms ease',
};

export const gradientHeader = {
  background:
    'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1))',
};

// PUBLIC_INTERFACE
export function applyThemeToDocument(): void {
  /** Applies theme CSS variables to document root for global CSS usage. */
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-error', theme.colors.error);
  root.style.setProperty('--color-bg', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--radius-md', theme.radius.md);
  root.style.setProperty('--shadow-md', theme.shadow.md);
  root.style.setProperty('--transition', theme.transition);
}
