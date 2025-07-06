"use client";

import React, { useState } from "react";
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
  const [categoryFilter, setCategoryFilter] = useState("");
  const [pricingFilter, setPricingFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Array.from(
    new Set(agentsFromServer.map((agent) => agent.category))
  );
  const pricingModels = Array.from(
    new Set(agentsFromServer.map((agent) => agent.pricingModel))
  );

  const filteredAgents = agentsFromServer.filter((agent) => {
    const matchesCategory = categoryFilter
      ? agent.category === categoryFilter
      : true;
    const matchesPricing = pricingFilter
      ? agent.pricingModel === pricingFilter
      : true;
    const matchesSearch = searchQuery
      ? agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesPricing && matchesSearch;
  });

  return (
    <div>
      <section className="w-full pt-36 relative">
        <Image className="absolute -z-10" src={heroblur} alt="hero blur" />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 px-[30px] md:px-[100px] mb-6 ">
          <input
            type="text"
            placeholder="Search agents..."
            className="p-2 border-[0.5px] border-[#FF69B4] rounded bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="p-2 border-[0.5px] border-[#FF69B4] rounded bg-transparent  appearance-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, idx) => (
              <option
                key={idx}
                className="bg-black text-white"
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            className="p-2 border-[0.5px] border-[#FF69B4] rounded bg-transparent"
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value)}
          >
            <option className="bg-black " value="">
              All Pricing
            </option>
            {pricingModels.map((model, idx) => (
              <option className="bg-black " key={idx} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Agents List */}
        <div className="flex flex-wrap px-[30px] md:px-[100px] gap-6">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent, index) => (
              <AnimatedCard agents={agent} key={agent.id} />
            ))
          ) : (
            <p className="text-gray-500">No agents found.</p>
          )}
        </div>
      </section>
    </div>
  );
};
