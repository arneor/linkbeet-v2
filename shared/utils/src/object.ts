// Remove undefined keys from object
export function cleanObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Pick specific keys from object
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (key in obj) result[key] = obj[key]
      return result
    },
    {} as Pick<T, K>,
  )
}

// Omit specific keys from object
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result as Omit<T, K>
}
