import { IconType } from "react-icons/lib"
export interface User {
  role?: string | null
  username?: string | null
  accessToken?: string | null
}

export interface NavbarItem {
  id: number,
  label: string,
  icon: IconType,
  href: string,
  onClick?: () => void
}