import { cn } from "../lib/utils";

export type MascotMood = "hi" | "surprise" | "felt-shy" | "rich" | "crying" | "prays";

export const MascotDisplay = ({ 
  mood, 
  className,
  props
}: {
  mood: MascotMood,
  className?: string,
  props?: React.HTMLAttributes<HTMLImageElement>
}) => {
  const moodToSrcMap = {
    "hi": `mascot/mascot-hi.gif`,
    "surprise": `mascot/mascot-surprise.gif`,
    "felt-shy": `mascot/mascot-felt-shy.gif`,
    "rich": `mascot/mascot-rich.gif`,
    "crying": `mascot/mascot-crying.gif`,
    "prays": `mascot/mascot-prays.gif`
  }

  return (
      <img
        src={`${import.meta.env.BASE_URL}${moodToSrcMap[mood]}`}
        alt={`Mascot ${mood}`}
        className={cn(`w-42 h-42 md:w-40 md:h-40 object-contain`, className)}
        {...props}
      />
  );
};