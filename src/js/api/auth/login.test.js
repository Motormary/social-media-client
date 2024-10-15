import { save } from "../../storage"
import { login } from "./login"

//** -------------- Mocks -------------*/
global.fetch = jest.fn()

jest.mock("../../storage", () => ({
  save: jest.fn(),
}))

jest.mock("../headers", () => ({
  headers: jest.fn(),
}))
//** -------------- End ---------------- */

describe("login", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  //** ------------------ Save to local --------------------- */
  it("should log in successfully and save profile and token", async () => {
    const mockResponse = {
      accessToken: "mockAccessToken",
      name: "Mel Gibson",
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    })

    const data = await login("test@stud.noroff.no", "correctPw")

    expect(fetch).toHaveBeenCalled()
    expect(save).toHaveBeenCalledWith("token", "mockAccessToken")
    delete mockResponse.accessToken
    expect(save).toHaveBeenCalledWith("profile", mockResponse)
    expect(data).toEqual(mockResponse)
  })
  //** -------------------- End ----------------------------- */

  //** ----------------- Error handling -------------------- */
  it("should throw an error if login fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Username and password doesn't match",
    })

    const data = login("test@stud.noroff.no", "wrongPw")

    await expect(data).rejects.toThrow("Username and password doesn't match")

    expect(save).not.toHaveBeenCalled()
  })
  //** ------------------ End ------------------------- */
})
