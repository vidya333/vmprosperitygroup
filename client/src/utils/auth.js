export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

export function isAdminUser(user) {
  if (!user) return false;

  // 1) Prefer explicit role if your backend returns it
  if (user.role && user.role.toLowerCase() === 'admin') return true;

  // 2) Fallback: use an env list of admin emails (comma-separated)
  const list = (process.env.REACT_APP_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  return !!(user.email && list.includes(user.email.toLowerCase()));
}
