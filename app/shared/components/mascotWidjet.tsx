import { MascotDisplay, type MascotMood } from "./mascotDisplay";
import { HeadingText, HeadWIthParagraph } from "./typography";
import { ParagraphText } from "./typography";
export const MascotWidjet = ({ 
  mood, 
  title, 
  subtitle, 
  className = "",
  props
}: {
  mood: MascotMood,
  title: string,
  subtitle: string,
  className?: string,
  props?: React.HTMLAttributes<HTMLDivElement>
}) => {

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`} {...props}>
      <MascotDisplay mood={mood} />
        <div className="max-w-[75%] text-center flex flex-col items-center justify-center gap-2">
            <HeadWIthParagraph title={title} subtitle={subtitle} />
        </div>
    </div>
  );
};