import React from "react";
import Image from "next/image";
import heroblur from "@/assets/hero blur img.png";
import heroIcon from "@/assets/hero icons img.png";
import heroRings from "@/assets/hero rings img.png";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <section className="hero px-[30px] md:px-[100px] container h-[100vh] md:h-[100vh]">
      <Image className="hero-blur-image" src={heroblur} alt="hero blur" />
      <Image
        className="hero-icons-image parallax"
        data-speed="4"
        src={heroIcon}
        alt="hero icons"
      />
      <Image className="hero-rings-image" src={heroRings} alt="" />

      <div className="content opacity-0 animate-fade-in">
        <h1 className="font-bold text-[46px] md:text-[92px] leading-[72px] md:leading-[106px]">
          Revolutionize your business <br /> operations with <br />
          <span className="gradient-text text-[56px] md:text-[86px]">
            Arklab AI
          </span>
        </h1>

        <div className="hero-paragraph">
          <h3 className="text-[16px] md:text-[24px] w-1/2">
            Revolutionize your business operations with our cutting-edge AI
            solutions. From machine learning to intelligent automation, we
            deliver results that matter.
          </h3>

          <Button />
        </div>
      </div>
    </section>
  );
};

export default Home;
