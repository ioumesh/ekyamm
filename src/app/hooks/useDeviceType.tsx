"use client"
import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH: number = 767;

export const useDeviceType = (): { isMobile: boolean; isDesktop: boolean } => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth: number = window.innerWidth;
      setIsMobile(screenWidth <= MOBILE_MAX_WIDTH);
      setIsDesktop(screenWidth > MOBILE_MAX_WIDTH);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isDesktop };
};
