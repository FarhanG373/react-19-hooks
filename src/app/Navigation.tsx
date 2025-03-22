"use client";
import React from "react";
import { NavBar } from "mfg-ui-components";
import Link from "next/link";
const Navigation = () => {
  return (
    <NavBar
      Logo={
        "https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png"
      }
      baseUrl="/"
      navPosition="scroler"
      navBarColor="light"
    >
      <ul>
        <li>
          <Link href="/useHook">Use Hook</Link>
        </li>
        <li>
          <Link href="/useActionState">use Action State</Link>
        </li>
        <li>
          <Link href="/useFormStatus">use Form Status</Link>
        </li>
        <li>
          <Link href="/useOptimistic">use Optimistic</Link>
        </li>
      </ul>
    </NavBar>
  );
};

export default Navigation;
