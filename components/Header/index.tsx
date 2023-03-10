import { Overlay } from "components";
import { Container } from "./style";
import { useAppDispatch, useAppSelector } from "hooks";
import { ShowMotion } from "motion";
import { theme } from "store/modules";
import { DarkMode, HighlightOffOutlined, LightMode, Menu } from "@mui/icons-material";
import { Button } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

export const Header: NextPage = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.value);
  const headerRef = useRef<HTMLBaseElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const NavList = [
    { title: "about", route: "/" },
    { title: "contact", route: "/contact" },
  ];

  useEffect(() => {
    scrollY.onChange((scroll) => {
      if (headerRef.current) {
        if (scroll > 0) {
          headerRef.current.classList.add("active");
        } else {
          headerRef.current.classList.remove("active");
        }
      }
    });
  }, [scrollY]);
  return (
    <>
      <Container isdark={isDark} ref={headerRef}>
        <Link
          href="/"
          shallow={true}
          onClick={() => {
            if (navRef.current) {
              navRef.current.classList.remove("active");
            }
          }}
        >
          <Image
            src={isDark ? "/static/logo-white.png" : "/static/logo-black.png"}
            width={100}
            height={65}
            alt="logo"
            priority
          />
        </Link>
        <nav ref={navRef}>
          <ul>
            {NavList.map((nav, idx) => (
              <li
                key={idx}
                className={router.pathname === nav.route ? "active" : ""}
                onClick={() => {
                  if (navRef.current) {
                    navRef.current.classList.remove("active");
                  }
                  setIsMobileMenu(false);
                }}
              >
                <Link href={nav.route} shallow={true}>
                  {nav.title.toUpperCase()}
                </Link>
                {router.pathname === nav.route && (
                  <motion.span className="circle" layoutId="circle"></motion.span>
                )}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              if (navRef.current) {
                navRef.current.classList.remove("active");
              }
              setIsMobileMenu(false);
            }}
          >
            <HighlightOffOutlined />
          </Button>
        </nav>

        <div style={{ display: "flex" }}>
          <Button type="button" onClick={() => dispatch(theme.isDark())}>
            {isDark ? (
              <LightMode style={{ color: "yellow" }} />
            ) : (
              <DarkMode style={{ color: "darkblue" }} />
            )}
          </Button>
          <Button
            type="button"
            className="mobile-menubar"
            onClick={() => {
              if (navRef.current) {
                navRef.current.classList.add("active");
              }
              setIsMobileMenu(true);
            }}
          >
            <Menu />
          </Button>
        </div>
        {isMobileMenu ? <Overlay variants={ShowMotion} initial="start" animate="end" /> : null}
      </Container>
    </>
  );
};
