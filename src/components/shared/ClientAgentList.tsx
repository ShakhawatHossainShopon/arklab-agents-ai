import React from "react";
import AnimatedCard from "./Card";
import Image from "next/image";
import heroblur from "@/assets/hero blur img.png";
interface IAgentsFromServer {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
  pricingModel: string;
}
interface agentsFromServer {
  agentsFromServer: IAgentsFromServer[];
}
export const ClientAgentList = ({ agentsFromServer }: agentsFromServer) => {
  return (
    <div>
      <section className="w-full py-36 relative">
        <Image className="absolute" src={heroblur} alt="hero blur" />
        <div>
          <div className="flex flex-wrap px-[100px] gap-6">
            {agentsFromServer?.map((agents, index) => {
              return <AnimatedCard agents={agents} key={index} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
