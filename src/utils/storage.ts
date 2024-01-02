const storage = {
  set: (key: string, value: string | object | null) => {
    if (typeof (Storage) !== 'undefined' || typeof key != 'string') {
      if (typeof value !== "string") {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
      return true
    } else {
      return false
    }
  },
  get: (key: string) => {
    let value: string | null = localStorage.getItem(key)
    try {
      return JSON.parse(value as string)
    } catch (e) {
      return value
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}
export default storage
