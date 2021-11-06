


export const delay = (func: () => void, ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {func(), resolve(true)}, ms);
  })
}
