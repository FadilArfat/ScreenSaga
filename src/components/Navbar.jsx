import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { RiMovie2Line } from "react-icons/ri";

export default function NavBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <RiMovie2Line color="black" />
        <Link href="/">
          <p className="pl-2 font-bold  text-black text-xl">ScreenSaga</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
