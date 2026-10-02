"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, RotateCcw } from "lucide-react";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";

interface DemoItem {
  id: string;
  name: string;
  image: string;
  className?: string;
}

// Characters assets
const characters: DemoItem[] = [
  {
    id: "pablo",
    name: "Pablo le renard",
    image: "/images/preview/characters/pablo.png",
  },
  {
    id: "marina",
    name: "Marina la sirène",
    image: "/images/preview/characters/marina.png",
  },
  {
    id: "olga",
    name: "Olga la licorne",
    image: "/images/preview/characters/olga.png",
    className: "scale-125 group-hover:scale-130",
  },
  {
    id: "robin",
    name: "Robin le chevalier",
    image: "/images/preview/characters/robin.png",
  },
];

// Objects assets
const objects: DemoItem[] = [
  {
    id: "golden-key",
    name: "Clé d'or",
    image: "/images/preview/objects/golden-key.png",
  },
  {
    id: "enchanted-compass",
    name: "Boussole enchantée",
    image: "/images/preview/objects/enchanted-compass.png",
  },
  {
    id: "animal-flute",
    name: "Flûte des animaux",
    image: "/images/preview/objects/animal-flute.png",
  },
  {
    id: "time-hourglass",
    name: "Sablier du temps",
    image: "/images/preview/objects/time-hourglass.png",
  },
];

// Landscapes assets
const landscapes: DemoItem[] = [
  {
    id: "cloud-mountain",
    name: "Montagne des nuages",
    image: "/images/preview/landscapes/cloud-mountain.png",
  },
  {
    id: "crystal-cave",
    name: "Grotte aux cristaux",
    image: "/images/preview/landscapes/crystal-cave.png",
  },
  {
    id: "treasure-island",
    name: "Île aux trésors",
    image: "/images/preview/landscapes/treasure-island.png",
  },
  {
    id: "undersea-kingdom",
    name: "Royaume sous-marin",
    image: "/images/preview/landscapes/undersea-kingdom.png",
  },
];

const steps = [
  {
    id: 0,
    name: "Personnages",
    items: characters,
    searchPlaceholder: "Rechercher des personnages",
  },
  {
    id: 1,
    name: "Objets",
    items: objects,
    searchPlaceholder: "Rechercher des objets",
  },
  {
    id: 2,
    name: "Décors",
    items: landscapes,
    searchPlaceholder: "Rechercher des décors",
  },
];

export function PhoneDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const [selections, setSelections] = useState<Record<number, Set<string>>>({
    0: new Set(["pablo", "marina"]),
    1: new Set(),
    2: new Set(),
  });

  const step = steps[currentStep];
  const selectedItems = selections[currentStep] || new Set();
  const selectedCount = selectedItems.size;

  const toggleSelection = (id: string) => {
    setSelections((prev) => {
      const newSet = new Set(prev[currentStep]);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { ...prev, [currentStep]: newSet };
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Show teaser screen
      setShowTeaser(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setShowTeaser(false);
    setCurrentStep(0);
    setSelections({
      0: new Set(["pablo", "marina"]),
      1: new Set(),
      2: new Set(),
    });
  };

  return (
    <div className="relative glass rounded-[2.5rem] p-2 shadow-2xl shadow-conteo-secondary/20">
      <div className="bg-white rounded-[2rem] overflow-hidden">
        {/* App content */}
        <div className="p-4 min-h-[420px] flex flex-col">
          {showTeaser ? (
            /* Teaser Screen */
            <div className="flex flex-col items-center justify-center flex-1 text-center px-2">
              {/* Logo */}
              <div className="relative size-24 mb-4">
                <Image
                  src="/logo.png"
                  alt="Contéo"
                  fill
                  sizes="96px"
                  className="object-contain rounded-[22.5%]"
                />
              </div>

              {/* Message */}
              <h3 className="font-heading font-semibold text-xl text-conteo-dark mb-2">
                Votre histoire est prête à naître !
              </h3>
              <p className="text-sm text-conteo-text-muted mb-6 leading-relaxed">
                Téléchargez Contéo dès sa sortie pour créer des histoires
                magiques avec vos choix.
              </p>

              {/* App Store Badges */}
              <AppStoreBadges size="sm" className="mb-6" />

              {/* Restart button */}
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 text-sm text-conteo-secondary hover:text-conteo-secondary/80 transition-colors"
              >
                <RotateCcw className="size-4" />
                Recommencer la démo
              </button>
            </div>
          ) : (
            /* Selection Steps */
            <>
              {/* Header with step name and progress */}
              <div className="flex items-center gap-3 mb-4">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="size-6 flex items-center justify-center text-conteo-dark/60 hover:text-conteo-dark transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}
                <span className="text-sm font-medium text-conteo-dark">
                  {step.name}
                </span>
                <div className="flex gap-1 flex-1 justify-end">
                  {steps.map((progressStep, index) => (
                    <div
                      key={progressStep.name}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        index <= currentStep
                          ? "bg-conteo-secondary w-6"
                          : "bg-conteo-light w-6",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                {step.items.slice(0, 4).map((item) => {
                  const isSelected = selectedItems.has(item.id);
                  const isLandscape = currentStep === 2;
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleSelection(item.id)}
                      className={cn(
                        "group relative aspect-square rounded-2xl p-2 transition-all duration-200 overflow-hidden cursor-pointer",
                        isSelected
                          ? "bg-conteo-secondary ring-2 ring-conteo-light"
                          : "bg-conteo-light hover:bg-conteo-light/80",
                      )}
                    >
                      <div className="relative size-full overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="140px"
                          className={cn(
                            "transition-transform duration-300 group-hover:scale-105",
                            isLandscape ? "object-cover" : "object-contain p-1",
                            item.className,
                          )}
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 size-5 bg-white rounded-full flex items-center justify-center shadow-md z-10">
                          <Check className="size-3 text-conteo-secondary stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-conteo-light/70">
                <span className="text-sm text-conteo-dark font-medium">
                  {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-conteo-accent text-conteo-dark font-medium py-2 px-6 rounded-2xl text-sm hover:bg-conteo-accent/90 transition-colors"
                >
                  {currentStep < steps.length - 1 ? "Suivant" : "C'est parti !"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
