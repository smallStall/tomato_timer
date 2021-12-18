
export const delay = (func: () => void, ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {func(), resolve(true)}, ms);
  })
}

export const minusToZero = (num: number) => num < 0 ? 0 : num;

export const isMobile = () => {
  return window.matchMedia && window.matchMedia('(max-device-width: 576px)').matches;
}
