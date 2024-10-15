import { remove } from "../../storage"
import { logout } from "./logout"

jest.mock("../../storage", () => ({
  remove: jest.fn(),
}))

test("should remove user profile and access token from localStorage at logout", () => {
  logout()

  expect(remove).toHaveBeenCalledWith("token")
  expect(remove).toHaveBeenCalledWith("profile")
})
