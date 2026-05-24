import React, { useEffect } from "react";
import BannerCarousel from "../components/BannerCarousel";
import FeaturedCollection from "../components/FeaturedCollection";
import KeyCustomersMarquee from "../components/KeyCustomersMarquee";
import CollectionsSection from "../components/CollectionsSection";
import Brands from "../components/Brands";

export default function Home() {
  useEffect(() => {

    document.title = "Tecniqa | HVAC Solutions";

  }, []);
  return (
    <>
      <BannerCarousel />
      <CollectionsSection />
      <FeaturedCollection />
      <Brands />
      <KeyCustomersMarquee />

    </>
  );
}
