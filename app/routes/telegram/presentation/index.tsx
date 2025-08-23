import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "~/shared/components/ui-kit/scroll-area";
import i18n, { AppTitle } from "~/shared/i18n";
import { Button } from "~/shared/components/ui-kit/button";

const PresentationResourceRu: {
  heading: string;
  buttonText: string;
  subHeading: string;
  mascotImgName: string;
}[] = [
  {
    heading: `Привет! Это ${AppTitle}!`,
    subHeading: "Сервис для коннекта рекламодателей и каналов",
    buttonText: "Подробнее",
    mascotImgName: "mascot-hi.gif",
  },
  {
    heading: "Почему мы?",
    subHeading: "У нас - только верифицированные каналы и их владельцы и мы гарантируем полную безопасность и прозрачность всех сделок!",
    buttonText: "Как это работает?",
    mascotImgName: "mascot-surprise.gif",
  },
  {
    heading: "Наш бот следит за постами в телеграм каналах и верифицирует их создателей",
    subHeading: "А сделки проводит сам Павел Дуров!",
    buttonText: "Далее",
    mascotImgName: "mascot-felt-shy.gif",
  },
  {
    heading: "Теперь больше не придется самому искать каналы или рекламодателей",
    subHeading: "Вам остается просто нашать одну кнопку!",
    buttonText: "Поехали!",
    mascotImgName: "mascot-rich.gif",
  },
  {
    heading: "Проект на стадии разработки, если ты заинтересован в том, чтобы помочь нам, то дай знать!",
    subHeading: "Мы будем очень благодарны за любую помощь!",
    buttonText: "Связаться с нами",
    mascotImgName: "mascot-crying.gif",
  }
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
    subHeading: "We have only verified channels and their owners, and we guarantee complete safety and transparency of all transactions!",
    buttonText: "How it works?",
    mascotImgName: "mascot-surprise.gif",
  },
  {
    heading: "Our bot monitors posts in Telegram channels and verifies their creators",
    subHeading: "And Pavel Durov himself conducts the deals!",
    buttonText: "Next",
    mascotImgName: "mascot-felt-shy.gif",
  },
  {
    heading: "Now you won't have to search for channels or advertisers yourself",
    subHeading: "You just need to press one button!",
    buttonText: "Let's go!",
    mascotImgName: "mascot-rich.gif",
  },
  {
    heading: "The project is in development stage, if you're interested in helping us, let us know!",
    subHeading: "We will be very grateful for any help!",
    buttonText: "Contact us",
    mascotImgName: "mascot-crying.gif",
  }
];

i18n.addResources("ru", "presentation", PresentationResourceRu);
i18n.addResources("en", "presentation", PresentationResourceEn);

export const Presentation = () => {
  const { t, i18n } = useTranslation("presentation");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = i18n.language === "en" ? PresentationResourceEn : PresentationResourceRu;

  useEffect(() => {
    const handleScroll = () => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        const scrollLeft = viewport.scrollLeft;
        const slideWidth = window.innerWidth;
        const newSlide = Math.round(scrollLeft / slideWidth);
        setCurrentSlide(newSlide);
      }
    };

    const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll);
      return () => viewport.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      const slideWidth = window.innerWidth;
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      viewport?.scrollTo({
        left: slideWidth * nextSlide,
        behavior: "smooth"
      });
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      const slideWidth = window.innerWidth;
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      viewport?.scrollTo({
        left: slideWidth * prevSlide,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <ScrollArea 
        ref={scrollAreaRef}
        className="h-full w-full"
      >
        <div className="flex w-max h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="min-h-screen w-screen flex flex-col items-center justify-center p-6 md:p-8 text-center"
              style={{ minWidth: "100vw" }}
            >
              <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto">
                <div className="flex justify-center">
                  <img 
                    src={`/mascot/${slide.mascotImgName}`} 
                    alt="Mascot" 
                    className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl leading-6 max-w-[76%] font-bold text-foreground">
                  {slide.heading}
                </h1>
                <p className="text-base md:text-lg lg:text-xl leading-4 text-muted-foreground max-w-[60%]">
                  {slide.subHeading}
                </p>

                </div>
                <div className="pt-4">
                  <Button
                    onClick={handleNext}
                    className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors shadow-primary shadow-lg "
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              const slideWidth = window.innerWidth;
              const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
              viewport?.scrollTo({
                left: slideWidth * index,
                behavior: "smooth"
              });
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      
      {currentSlide > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors"
        >
          ←
        </button>
      )}
      
      {currentSlide < slides.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors"
        >
          →
        </button>
      )}
    </div>
  );
};
