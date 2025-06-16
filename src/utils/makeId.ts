export function makeId(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let prefix = '';
  for (let i = 0; i < 8; i++) {
    prefix += letters[Math.floor(Math.random() * letters.length)];
  }
  return `${prefix}_${Date.now()}`;
}