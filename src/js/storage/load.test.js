import { load } from "./load" // Import your load function

describe("Load from localStorage", () => {
  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(global, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
      },
      writable: true,
    })
  })

  //** --------------- Load from localStorage ------------------ */
  it("should load and parse a key-value pair from localStorage", () => {
    const storedValue = {
      name: "test",
    }

    localStorage.getItem.mockReturnValueOnce(JSON.stringify(storedValue))

    const result = load("key")

    expect(result).toEqual(storedValue)
    expect(localStorage.getItem).toHaveBeenCalledWith("key")
  })
  //** -------------------- End ------------------------ */

  //** -------------- Error: Key not found ----------------- */
  it("should return null if no data is found for the key", () => {
    localStorage.getItem.mockReturnValueOnce(null)

    const result = load("Nothing")

    expect(result).toBeNull()
    expect(localStorage.getItem).toHaveBeenCalledWith("Nothing")
  })
  //** ------------------------- End -------------------------- */

  //** ------------------ Error: Parsing ------------------- */
  it("should return null if JSON parsing fails", () => {
    localStorage.getItem.mockReturnValueOnce("Invalid JSON")

    const result = load("key")

    expect(result).toBeNull()
    expect(localStorage.getItem).toHaveBeenCalledWith("key")
  })
  //** ---------------------- End --------------------------- */
})
