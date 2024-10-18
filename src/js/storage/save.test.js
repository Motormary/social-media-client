import { save } from "./save"

describe("Save to localStorage", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(global, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
      },
      writable: true,
    })
  })

  //** ---------------- Save to localStorage ------------------- */
  it("Should save a key-value pair to localStorage", () => {
    const value = {
      name: "value",
    }

    save("key", value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify(value)
    )
  })
  //** ------------------------ End ---------------------------- */
})
