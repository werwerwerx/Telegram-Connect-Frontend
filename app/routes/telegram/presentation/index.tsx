import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import i18n, { AppTitle } from "~/shared/i18n";
import { Button } from "~/shared/components/ui-kit/button";
import { MascotWidjet } from "~/shared/components/mascotWidjet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/shared/components/ui-kit/carousel";

const PresentationResourceRu: {
  heading: string;
  buttonText: string;
  subHeading: string;
  mascotImgName: string;
}[] = [
  {
    heading: `Добро пожаловать в ${AppTitle}!`,
    subHeading:
      "Сервис, который связывает рекламодателей и владельцев Telegram-каналов.",
    buttonText: "Узнать больше",
    mascotImgName: "mascot-hi.gif",
  },
  {
    heading: "Только проверенные каналы",
    subHeading:
      "Мы вручную верифицируем каждого автора, чтобы вы были уверены в качестве аудитории и безопасности сделок.",
    buttonText: "Как это работает?",
    mascotImgName: "mascot-surprise.gif",
  },
  {
    heading: "Никаких сделок!",
    subHeading:
      "Наша система автоматически проверит наличие соблюдения условий обеих сторон.",
    buttonText: "Далее",
    mascotImgName: "mascot-felt-shy.gif",
  },
  {
    heading: "Поиск рекламы в один клик",
    subHeading:
      "Забудьте о ручном поиске. Наша платформа найдет для вас идеального партнера — просто нажмите кнопку.",
    buttonText: "Начать!",
    mascotImgName: "mascot-rich.gif",
  },
  {
    heading:
      "Проект на стадии разработки, если ты заинтересован в том, чтобы помочь нам, то дай знать!",
    subHeading: "Мы будем очень благодарны за любую помощь!",
    buttonText: "Связаться с нами",
    mascotImgName: "mascot-crying.gif",
  },
];

const PresentationResourceEn: {
  heading: string;
  buttonText: string;
  subHeading: string;
  mascotImgName: string;
}[] = [
  {
    heading: `Hello! This is ${AppTitle}!`,
    subHeading: "Service for connecting advertisers and channels",
    buttonText: "Learn More",
    mascotImgName: "mascot-hi.gif",
  },
  {
    heading: "Why us?",
    subHeading:
      "We have only verified channels and their owners, and we guarantee complete safety and transparency of all transactions!",
    buttonText: "How it works?",
    mascotImgName: "mascot-surprise.gif",
  },
  {
    heading:
      "Our bot monitors posts in Telegram channels and verifies their creators",
    subHeading: "And Pavel Durov himself conducts the deals!",
    buttonText: "Next",
    mascotImgName: "mascot-felt-shy.gif",
  },
  {
    heading:
      "Now you won't have to search for channels or advertisers yourself",
    subHeading: "You just need to press one button!",
    buttonText: "Let's go!",
    mascotImgName: "mascot-rich.gif",
  },
  {
    heading:
      "The project is in development stage, if you're interested in helping us, let us know!",
    subHeading: "We will be very grateful for any help!",
    buttonText: "Contact us",
    mascotImgName: "mascot-crying.gif",
  },
];

i18n.addResources("ru", "presentation", PresentationResourceRu);
i18n.addResources("en", "presentation", PresentationResourceEn);

const SlideContent = ({ slide, api }: { slide: any; api: CarouselApi | undefined }) => {
  const handleNext = () => {
    api?.scrollNext();
  };
  
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-6 md:p-8 text-center">
      <MascotWidjet
        mood={
          slide.mascotImgName
            .replace("mascot-", "")
            .replace(".gif", "") as any
        }
        title={slide.heading}
        subtitle={slide.subHeading}
      />
      <Button
        onClick={handleNext}
        className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors shadow-primary shadow-lg mt-4"
      >
        {slide.buttonText}
      </Button>
    </div>
  );
};

export const Presentation = () => {
  const { t, i18n } = useTranslation("presentation");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const slides =
    i18n.language === "en" ? PresentationResourceEn : PresentationResourceRu;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="min-h-screen w-screen overflow-hidden relative">
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <SlideContent slide={slide} api={api} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current - 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};
