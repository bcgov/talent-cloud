export const formatPhone = (value: string) => {
  if (!value) return value;
  let currentValue = value.replace(/[^\d]/g, '');
  if (currentValue.length >= 3 && currentValue.length < 5) {
    currentValue = currentValue.replace(/(\d{3})/, '($1)');
  }
  if (currentValue.length >= 4 && currentValue.length < 10) {
    currentValue = currentValue.replace(/(\d{3})(\d{3})/, '($1) $2-');
  }
  if (currentValue.length >= 10) {
    currentValue = currentValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return currentValue;
};
