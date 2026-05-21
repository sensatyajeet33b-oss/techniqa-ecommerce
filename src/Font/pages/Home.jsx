import React from "react";
import BannerCarousel from "../components/BannerCarousel";
import FeaturedCollection from "../components/FeaturedCollection";
import KeyCustomersMarquee from "../components/KeyCustomersMarquee";
import CollectionsSection from "../components/CollectionsSection";
import Brands from "../components/Brands";

export default function Home() {
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
