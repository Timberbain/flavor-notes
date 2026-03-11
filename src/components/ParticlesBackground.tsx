"use client";

import Particles from "@/components/Particles";

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Particles
        particleCount={80}
        particleSpread={8}
        speed={0.03}
        particleColors={["#c4956a", "#8b6d4a", "#f4e4c1"]}
        alphaParticles
        particleBaseSize={80}
        sizeRandomness={0.8}
        cameraDistance={25}
        className="w-full h-full"
      />
    </div>
  );
}
