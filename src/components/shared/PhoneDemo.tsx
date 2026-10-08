"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Check,
  ChevronLeft,
  Crown,
  Headphones,
  RotateCcw,
  Sparkles,
  VolumeX,
  WandSparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { DownloadCTA } from "@/components/shared/DownloadCTA";

interface Hero {
  id: string;
  name: string;
  role: string;
  image: string;
  imageClassName?: string;
}

interface StoryObject {
  id: string;
  name: string;
  /** Forme utilisée dans la phrase, avec article. */
  phrase: string;
  /** Forme utilisée dans le titre (« Pablo et la Clé d'or »). */
  titleName: string;
  image: string;
}

interface Place {
  id: string;
  name: string;
  /** Complément de lieu (« au sommet de… »). */
  phrase: string;
  image: string;
}

const heroes: Hero[] = [
  { id: "pablo", name: "Pablo", role: "le renard", image: "/images/preview/characters/pablo.png" },
  { id: "marina", name: "Marina", role: "la sirène", image: "/images/preview/characters/marina.png" },
  {
    id: "olga",
    name: "Olga",
    role: "la licorne",
    image: "/images/preview/characters/olga.png",
    imageClassName: "scale-110",
  },
  { id: "robin", name: "Robin", role: "le chevalier", image: "/images/preview/characters/robin.png" },
];

const storyObjects: StoryObject[] = [
  { id: "golden-key", name: "Clé d'or", phrase: "une petite clé d'or", titleName: "la Clé d'or", image: "/images/preview/objects/golden-key.png" },
  {
    id: "enchanted-compass",
    name: "Boussole enchantée",
    phrase: "une boussole enchantée",
    titleName: "la Boussole enchantée",
    image: "/images/preview/objects/enchanted-compass.png",
  },
  { id: "animal-flute", name: "Flûte des animaux", phrase: "une flûte qui parlait aux animaux", titleName: "la Flûte des animaux", image: "/images/preview/objects/animal-flute.png" },
  { id: "time-hourglass", name: "Sablier du temps", phrase: "un sablier plein d'étoiles", titleName: "le Sablier du temps", image: "/images/preview/objects/time-hourglass.png" },
];

const places: Place[] = [
  {
    id: "cloud-mountain",
    name: "Montagne des nuages",
    phrase: "au sommet de la Montagne des nuages",
    image: "/images/preview/landscapes/cloud-mountain.png",
  },
  {
    id: "crystal-cave",
    name: "Grotte aux cristaux",
    phrase: "au fond de la Grotte aux cristaux",
    image: "/images/preview/landscapes/crystal-cave.png",
  },
  {
    id: "treasure-island",
    name: "Île aux trésors",
    phrase: "sur la plage de l'Île aux trésors",
    image: "/images/preview/landscapes/treasure-island.png",
  },
  {
    id: "undersea-kingdom",
    name: "Royaume sous-marin",
    phrase: "au cœur du Royaume sous-marin",
    image: "/images/preview/landscapes/undersea-kingdom.png",
  },
];

const lengths = ["Courte", "Moyenne", "Longue"] as const;
type StoryLength = (typeof lengths)[number];
type StoryMode = "livre" | "audio";

const STEP_TITLES = ["Choisis tes héros", "Un objet magique", "Où se passe l'histoire ?", "Dernier réglage"];
const MAX_HEROES = 2;

type Phase = "steps" | "generating" | "story";

function buildStory(selectedHeroes: Hero[], object: StoryObject, place: Place): { title: string; text: string } {
  const [first, second] = selectedHeroes;
  const who = second ? `${first.name} et ${second.name}` : first.name;
  const verb = second ? "marchaient" : "marchait";
  return {
    title: `${first.name} et ${object.titleName}`,
    text: `Ce soir-là, ${who} ${verb} doucement ${place.phrase}. Soudain, une lueur dorée scintilla entre deux pierres : c'était ${object.phrase} ! ${first.name} s'approcha sans bruit. « Regarde, ça brille de plus en plus fort… », chuchota ${first.name}. Et c'est ainsi que l'aventure commença…`,
  };
}

export function PhoneDemo() {
  const [phase, setPhase] = useState<Phase>("steps");
  const [step, setStep] = useState(0);
  const [heroIds, setHeroIds] = useState<string[]>(["pablo"]);
  const [objectId, setObjectId] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [length, setLength] = useState<StoryLength>("Courte");
  const [mode, setMode] = useState<StoryMode>("audio");

  const selectedHeroes = heroes.filter((hero) => heroIds.includes(hero.id));
  const object = storyObjects.find((item) => item.id === objectId) ?? null;
  const place = places.find((item) => item.id === placeId) ?? null;

  const canContinue =
    (step === 0 && selectedHeroes.length > 0) ||
    (step === 1 && object !== null) ||
    (step === 2 && place !== null) ||
    step === 3;

  useEffect(() => {
    if (phase !== "generating") return;
    const timer = setTimeout(() => setPhase("story"), 1800);
    return () => clearTimeout(timer);
  }, [phase]);

  const toggleHero = (id: string) => {
    setHeroIds((current) => {
      if (current.includes(id)) return current.filter((heroId) => heroId !== id);
      return [...current, id].slice(-MAX_HEROES);
    });
  };

  const next = () => {
    if (!canContinue) return;
    if (step < STEP_TITLES.length - 1) {
      trackEvent("demo_step", { step: step + 1 });
      setStep(step + 1);
      return;
    }
    trackEvent("demo_complete", { mode, length });
    setPhase("generating");
  };

  const restart = () => {
    setPhase("steps");
    setStep(0);
    setHeroIds(["pablo"]);
    setObjectId(null);
    setPlaceId(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-[22rem]">
      <div className="rounded-[2.75rem] bg-[#16162a] p-2 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
        <div className="relative flex h-[36rem] flex-col overflow-hidden rounded-[2.25rem] bg-[#fafaff]">
          {phase === "steps" && (
            <StepsScreen
              step={step}
              canContinue={canContinue}
              onBack={() => setStep(Math.max(0, step - 1))}
              onNext={next}
              selectionPreview={selectedHeroes}
            >
              {step === 0 && (
                <ChoiceGrid
                  items={heroes.map((hero) => ({
                    id: hero.id,
                    title: hero.name,
                    subtitle: hero.role,
                    image: hero.image,
                    imageClassName: hero.imageClassName,
                  }))}
                  selected={heroIds}
                  onToggle={toggleHero}
                />
              )}
              {step === 1 && (
                <ChoiceGrid
                  items={storyObjects.map((item) => ({ id: item.id, title: item.name, image: item.image }))}
                  selected={objectId ? [objectId] : []}
                  onToggle={setObjectId}
                />
              )}
              {step === 2 && (
                <ChoiceGrid
                  items={places.map((item) => ({ id: item.id, title: item.name, image: item.image, cover: true }))}
                  selected={placeId ? [placeId] : []}
                  onToggle={setPlaceId}
                />
              )}
              {step === 3 && (
                <SettingsPanel length={length} mode={mode} onLength={setLength} onMode={setMode} />
              )}
            </StepsScreen>
          )}

          {phase === "generating" && <GeneratingScreen heroes={selectedHeroes} />}

          {phase === "story" && object && place && (
            <StoryScreen
              heroes={selectedHeroes}
              object={object}
              place={place}
              mode={mode}
              onModeChange={setMode}
              onRestart={restart}
            />
          )}
        </div>
      </div>
      <p className="mt-4 text-center font-sans text-xs text-white/45">
        Démo interactive · essayez-la !
      </p>
    </div>
  );
}

function StepsScreen({
  step,
  canContinue,
  onBack,
  onNext,
  selectionPreview,
  children,
}: Readonly<{
  step: number;
  canContinue: boolean;
  onBack: () => void;
  onNext: () => void;
  selectionPreview: Hero[];
  children: React.ReactNode;
}>) {
  const isLast = step === STEP_TITLES.length - 1;

  return (
    <>
      <div className="bg-conteo-dark px-4 pb-7 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={step === 0}
            aria-label="Étape précédente"
            className="flex size-8 items-center justify-center rounded-xl bg-white/10 text-white transition-opacity disabled:opacity-0"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex-1 text-center">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/45">
              Étape {step + 1} sur {STEP_TITLES.length}
            </p>
            <p className="font-heading text-base font-extrabold text-white">{STEP_TITLES[step]}</p>
          </div>
          <span className="size-8" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {STEP_TITLES.map((title, index) => (
            <span
              key={title}
              className={cn(
                "h-1 rounded-full transition-colors duration-300",
                index <= step ? "bg-conteo-accent" : "bg-white/15",
              )}
            />
          ))}
        </div>
      </div>

      <div className="-mt-4 flex flex-1 flex-col overflow-hidden rounded-t-[1.75rem] bg-[#fafaff] px-2.5 pt-3">
        <div className="flex-1 overflow-hidden">{children}</div>
        <div className="flex items-center gap-3 border-t border-conteo-dark/5 py-3">
          {step === 0 && (
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {selectionPreview.map((hero) => (
                  <span key={hero.id} className="relative size-7 overflow-hidden rounded-lg bg-conteo-light ring-2 ring-white">
                    <Image src={hero.image} alt="" fill sizes="28px" className="object-contain p-0.5" />
                  </span>
                ))}
              </div>
              <span className="font-sans text-[11px] text-conteo-text-muted">
                <strong className="text-conteo-dark">{selectionPreview.length}</strong> / {MAX_HEROES}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className={cn(
              "ml-auto flex h-11 items-center justify-center gap-2 rounded-[1rem] px-5 font-sans text-sm font-semibold transition-all",
              step !== 0 && "w-full",
              canContinue
                ? "bg-conteo-accent text-conteo-dark hover:brightness-95"
                : "cursor-not-allowed bg-conteo-dark/5 text-conteo-dark/30",
            )}
          >
            {isLast ? (
              <>
                <WandSparkles className="size-4" />
                Générer l&apos;histoire
              </>
            ) : canContinue ? (
              "Suivant"
            ) : (
              "Fais ton choix"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

interface ChoiceItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  imageClassName?: string;
  cover?: boolean;
}

function ChoiceGrid({
  items,
  selected,
  onToggle,
}: Readonly<{
  items: ChoiceItem[];
  selected: string[];
  onToggle: (id: string) => void;
}>) {
  return (
    <div className="grid grid-cols-2 gap-2.5 p-1">
      {items.map((item) => {
        const isSelected = selected.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            aria-pressed={isSelected}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[1.25rem] text-left ring-2 transition-all duration-200",
              isSelected
                ? "bg-conteo-light ring-conteo-secondary shadow-[0_10px_24px_-12px_rgba(106,90,224,0.6)]"
                : "bg-conteo-light/70 ring-transparent hover:ring-conteo-secondary/30",
            )}
          >
            <div
              className={cn(
                "relative shrink-0",
                item.cover ? "h-[6.75rem] w-full" : "m-2 h-[5.5rem] w-[calc(100%-1rem)]",
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="150px"
                className={cn(
                  "transition-transform duration-300 group-hover:scale-105",
                  item.cover ? "object-cover" : "object-contain",
                  item.imageClassName,
                )}
              />
            </div>
            <div className={cn("px-2.5 pb-2", item.cover && "bg-white/90 pt-1.5 backdrop-blur")}>
              <p className="truncate font-sans text-xs font-semibold text-conteo-dark">{item.title}</p>
              {item.subtitle && <p className="truncate font-sans text-[11px] text-conteo-secondary">{item.subtitle}</p>}
            </div>
            {isSelected && (
              <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-conteo-secondary text-white shadow">
                <Check className="size-3 stroke-[3]" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SettingsPanel({
  length,
  mode,
  onLength,
  onMode,
}: Readonly<{
  length: StoryLength;
  mode: StoryMode;
  onLength: (value: StoryLength) => void;
  onMode: (value: StoryMode) => void;
}>) {
  const modes = [
    { id: "livre" as const, icon: BookOpen, title: "Texte uniquement", subtitle: "À lire ensemble" },
    { id: "audio" as const, icon: Headphones, title: "Avec audio", subtitle: "Voix douce intégrée" },
  ];

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="rounded-[1.25rem] bg-white p-3 ring-1 ring-conteo-dark/5">
        <p className="mb-2 font-sans text-xs font-semibold text-conteo-dark">Longueur de l&apos;histoire</p>
        <div className="grid grid-cols-3 gap-1.5">
          {lengths.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onLength(value)}
              aria-pressed={length === value}
              className={cn(
                "rounded-xl py-2 font-sans text-xs font-semibold transition-colors",
                length === value ? "bg-conteo-secondary text-white" : "bg-conteo-light/60 text-conteo-dark",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[1.25rem] bg-white p-3 ring-1 ring-conteo-dark/5">
        <p className="mb-2 font-sans text-xs font-semibold text-conteo-dark">Mode de l&apos;histoire</p>
        <div className="flex flex-col gap-1.5">
          {modes.map(({ id, icon: Icon, title, subtitle }) => (
            <button
              key={id}
              type="button"
              onClick={() => onMode(id)}
              aria-pressed={mode === id}
              className={cn(
                "flex items-center gap-2.5 rounded-xl p-2 text-left transition-colors",
                mode === id ? "bg-conteo-secondary text-white" : "bg-conteo-light/60 text-conteo-dark",
              )}
            >
              <Icon className={cn("size-4", mode === id ? "text-conteo-accent" : "text-conteo-secondary")} />
              <span className="flex-1">
                <span className="block font-sans text-xs font-semibold">{title}</span>
                <span className={cn("block font-sans text-[10px]", mode === id ? "text-white/70" : "text-conteo-text-muted")}>
                  {subtitle}
                </span>
              </span>
              {mode === id && <Check className="size-3.5 text-conteo-accent" />}
            </button>
          ))}
          <div className="flex items-center gap-2.5 rounded-xl bg-conteo-light/40 p-2 text-conteo-dark/60">
            <Sparkles className="size-4 text-conteo-secondary/60" />
            <span className="flex-1">
              <span className="block font-sans text-xs font-semibold">Roman visuel</span>
              <span className="block font-sans text-[10px] text-conteo-text-muted">Scènes animées</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-conteo-accent px-2 py-0.5 font-sans text-[9px] font-bold text-conteo-dark">
              <Crown className="size-2.5" />
              PREMIUM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneratingScreen({ heroes: selected }: Readonly<{ heroes: Hero[] }>) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-conteo-dark px-8 text-center">
      <div className="relative flex size-32 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-conteo-secondary/30 blur-2xl motion-safe:animate-pulse" />
        <span className="absolute inset-3 rounded-full border border-dashed border-conteo-accent/40 motion-safe:animate-spin [animation-duration:6s]" />
        <div className="relative flex -space-x-4">
          {selected.map((hero) => (
            <span key={hero.id} className="relative size-16">
              <Image src={hero.image} alt="" fill sizes="64px" className="object-contain drop-shadow-xl" />
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="font-heading text-xl font-extrabold text-white">La magie opère…</p>
        <p className="mt-2 font-sans text-sm text-white/60">Contéo écrit l&apos;histoire et prépare la voix du conteur.</p>
      </div>
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full w-full origin-left animate-[demo-progress_1.8s_ease-in-out_forwards] rounded-full bg-conteo-accent" />
      </div>
    </div>
  );
}

/** Aperçu audio muet : la barre avance par paliers, sur une dizaine de secondes. */
const PREVIEW_STEPS = 40;
const PREVIEW_STEP_MS = 250;

function StoryScreen({
  heroes: selected,
  object,
  place,
  mode,
  onModeChange,
  onRestart,
}: Readonly<{
  heroes: Hero[];
  object: StoryObject;
  place: Place;
  mode: StoryMode;
  onModeChange: (mode: StoryMode) => void;
  onRestart: () => void;
}>) {
  const story = useMemo(() => buildStory(selected, object, place), [selected, object, place]);
  const [playing, setPlaying] = useState(mode === "audio");
  const [step, setStep] = useState(0);
  const finished = step >= PREVIEW_STEPS;

  useEffect(() => {
    if (!playing || finished) return;
    const timer = setTimeout(() => setStep((value) => value + 1), PREVIEW_STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, finished, step]);

  const replay = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-36 shrink-0 overflow-hidden">
        <Image src={place.image} alt={place.name} fill sizes="350px" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#fafaff] via-transparent to-transparent" />
        <div className="absolute bottom-1 left-4 flex -space-x-3">
          {selected.map((hero) => (
            <span key={hero.id} className="relative size-14">
              <Image src={hero.image} alt={hero.name} fill sizes="56px" className="object-contain drop-shadow-lg" />
            </span>
          ))}
          <span className="relative size-10 self-end">
            <Image src={object.image} alt={object.name} fill sizes="40px" className="object-contain drop-shadow-lg" />
          </span>
        </div>
        <div className="absolute right-3 top-3 flex rounded-full bg-white/85 p-0.5 backdrop-blur">
          {(["livre", "audio"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                onModeChange(value);
                setPlaying(value === "audio");
              }}
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 font-sans text-[10px] font-semibold transition-colors",
                mode === value ? "bg-conteo-secondary text-white" : "text-conteo-dark/60",
              )}
            >
              {value === "livre" ? <BookOpen className="size-3" /> : <Headphones className="size-3" />}
              {value === "livre" ? "Texte" : "Audio"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4">
        <p className="font-heading text-lg font-extrabold leading-tight text-conteo-dark">{story.title}</p>
        <p className="mt-0.5 font-sans text-[11px] text-conteo-text-muted">Page 1 · 3-5 ans</p>

        <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-conteo-dark/85">
          {story.text}
        </p>

        <div className="mt-auto pb-3">
          {mode === "audio" && (
            <div className="mb-2.5 rounded-[1rem] bg-conteo-light/70 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <VolumeX className="size-4 shrink-0 text-conteo-secondary" aria-hidden="true" />
                <p className="flex-1 font-sans text-[11px] leading-snug text-conteo-dark/80">
                  <strong className="font-semibold text-conteo-dark">Aperçu sans son.</strong> Dans
                  l&apos;app, une voix douce lit l&apos;histoire.
                </p>
                {finished && (
                  <button
                    type="button"
                    onClick={replay}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 font-sans text-[10px] font-semibold text-conteo-secondary shadow-sm"
                  >
                    <RotateCcw className="size-3" aria-hidden="true" />
                    Revoir
                  </button>
                )}
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white">
                <span
                  className="block h-full rounded-full bg-conteo-secondary transition-[width] duration-300"
                  style={{ width: `${(step / PREVIEW_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div className="rounded-[1.25rem] bg-conteo-dark p-3 text-center">
            <p className="mb-2 font-sans text-xs text-white/75">
              Dans l&apos;app, l&apos;histoire complète est racontée d&apos;une voix douce.
            </p>
            <DownloadCTA placement="demo" align="center" size="sm" />
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="mx-auto mt-2 flex items-center gap-1.5 font-sans text-[11px] text-conteo-secondary hover:underline"
          >
            <RotateCcw className="size-3" />
            Créer une autre histoire
          </button>
        </div>
      </div>
    </div>
  );
}
