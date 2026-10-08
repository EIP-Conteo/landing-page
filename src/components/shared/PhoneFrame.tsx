import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Capture réelle de l'app dans un cadre de téléphone. */
export function PhoneFrame({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 300px, 70vw",
}: Readonly<PhoneFrameProps>) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-[#16162a] p-[7px] shadow-[0_40px_80px_-30px_rgba(42,42,66,0.55)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[2.15rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={700}
          height={1516}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
