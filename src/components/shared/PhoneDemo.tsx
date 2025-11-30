"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, RotateCcw } from "lucide-react";
import { AppStoreBadges } from "@/components/shared/AppStoreBadges";

// Characters assets
const characters = [
  {
    id: "cow-sleeping",
    name: "Vache endormie",
    image: "/images/figma/characters/cow-sleeping.png",
  },
  {
    id: "cow-reading",
    name: "Vache lisant",
    image: "/images/figma/characters/cow-reading.png",
  },
  {
    id: "fox-gaming",
    name: "Renard joueur",
    image: "/images/figma/characters/fox-gaming.png",
  },
  {
    id: "cracked-egg",
    name: "Oeuf magique",
    image: "/images/figma/characters/cracked-egg.png",
  },
  {
    id: "teddy-bear",
    name: "Ours en peluche",
    image: "/images/figma/characters/teddy-bear.png",
  },
  {
    id: "frog",
    name: "Grenouille",
    image: "/images/figma/characters/frog.png",
  },
];

// Objects assets
const objects = [
  {
    id: "key",
    name: "Clé",
    image: "/images/figma/objects/key.png",
  },
  {
    id: "sword",
    name: "Épée",
    image: "/images/figma/objects/sword.png",
  },
  {
    id: "shield",
    name: "Bouclier",
    image: "/images/figma/objects/shield.png",
  },
  {
    id: "treasure",
    name: "Trésor",
    image: "/images/figma/objects/treasure.png",
  },
  {
    id: "wand",
    name: "Baguette",
    image: "/images/figma/objects/wand.png",
  },
  {
    id: "map",
    name: "Carte",
    image: "/images/figma/objects/map.png",
  },
];

// Landscapes assets
const landscapes = [
  {
    id: "barn",
    name: "Ferme",
    image: "/images/figma/landscapes/barn.png",
  },
  {
    id: "cave",
    name: "Grotte",
    image: "/images/figma/landscapes/cave.png",
  },
  {
    id: "beach",
    name: "Plage",
    image: "/images/figma/landscapes/beach.png",
  },
  {
    id: "desert",
    name: "Désert",
    image: "/images/figma/landscapes/desert.png",
  },
  {
    id: "castle",
    name: "Château",
    image: "/images/figma/landscapes/castle.png",
  },
  {
    id: "forest",
    name: "Forêt",
    image: "/images/figma/landscapes/forest.png",
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
    0: new Set(["cow-sleeping", "cracked-egg"]),
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
      0: new Set(["cow-sleeping", "cracked-egg"]),
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
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src="/logo.png"
                  alt="Contéo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Message */}
              <h3 className="font-heading font-bold text-xl text-conteo-dark mb-2">
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
                <RotateCcw className="w-4 h-4" />
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
                    className="w-6 h-6 flex items-center justify-center text-conteo-dark/60 hover:text-conteo-dark transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <span className="text-sm font-medium text-conteo-dark">
                  {step.name}
                </span>
                <div className="flex gap-1 flex-1 justify-end">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        index <= currentStep
                          ? "bg-conteo-secondary w-6"
                          : "bg-gray-200 w-6"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden">
                {step.items.slice(0, 4).map((item) => {
                  const isSelected = selectedItems.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleSelection(item.id)}
                      className={cn(
                        "relative aspect-square rounded-2xl p-2 transition-all duration-200",
                        isSelected
                          ? "bg-conteo-secondary ring-2 ring-conteo-light"
                          : "bg-conteo-light hover:bg-conteo-light/80"
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-conteo-secondary" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
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
