"use client";
// components/MyCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { MouseEventHandler } from "react";
interface IAgentsFromServer {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
  pricingModel: string;
}
// Interaction hyperparameters
const sheenSize = 500;
const cardRotation = 15;
const cardScale = 1.07;

export default function AnimatedCard({
  agents,
}: {
  agents: IAgentsFromServer;
}) {
  // Raw motion values
  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  // Calculated rotation values for styling
  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [`${cardRotation}deg`, `-${cardRotation}deg`]
  );

  // Calculated sheen values for styling
  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);

  // Helper function for getting mouse position
  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  // Mouse event handlers
  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY } = getMousePosition(e);

    mouseX.jump(currentMouseX);
    mouseY.jump(currentMouseY);
    scale.set(cardScale);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    xPcnt.set(0);
    yPcnt.set(0);
    scale.set(1);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col  rounded-xl bg-transparent  shadow-lg overflow-hidden group"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.div
          className="absolute z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-full blur-md"
          style={{
            height: sheenSize,
            width: sheenSize,
            background: "radial-gradient(white, #3984ff00 80%)",
            left: sheenX,
            top: sheenY,
          }}
        />
        <MyCard agents={agents} />
      </motion.div>
    </main>
  );
}
const MyCard = ({ agents }: { agents: IAgentsFromServer }) => {
  return (
    <Card className="w-full bg-transparent text-white max-w-sm shadow-md border-[0.5px] border-[#FF69B4]">
      <CardHeader>
        <div className="pb-3 flex justify-between">
          <Badge className="bg-transparent border-[0.5px] font-bold border-[#FBCEB1] px-3 py-2">
            <Link href="/">{agents?.status}</Link>
          </Badge>

          <Badge className="bg-transparent custom-border-badge px-3 py-2 font-bold">
            <Link href="/">{agents?.pricingModel}</Link>
          </Badge>
        </div>
        <CardTitle>{agents?.name}</CardTitle>
        <CardDescription className="text-white font-light">
          {agents?.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{agents?.description}</p>
        <CardDescription className="pt-2 text-white font-light">
          Category &gt; {agents?.category}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
