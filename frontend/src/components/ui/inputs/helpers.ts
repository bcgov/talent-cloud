export const formatPhone = (value: string) => {
  if (!value) return value;
  let currentValue = value.replace(/[^\d]/g, '');
  console.log(currentValue.length, currentValue);
  if (currentValue.length > 7) {
    currentValue = currentValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (currentValue.length > 6 && currentValue.length < 10) {
    currentValue = currentValue.replace(/(\d{3})(\d{3})/, '($1) $2-');
  }
  if (currentValue.length > 2 && currentValue.length < 10) {
    currentValue = currentValue.replace(/(\d{3})(\d)/, '($1) $2');
  }

  return currentValue;
};
