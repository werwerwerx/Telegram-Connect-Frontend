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
import type { MascotMood } from "~/shared/components/mascotDisplay";
import { miniApp, postEvent, supports } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";

type PresentationItem = {
  heading: string;
  buttonText: string;
  subHeading: string;
  mascotMood: MascotMood;
};

const PresentationResourceRu: PresentationItem[] = [
  {
    heading: `Добро пожаловать в ${AppTitle}!`,
    subHeading:
      "Сервис, который связывает рекламодателей и владельцев Telegram-каналов.",
    buttonText: "Узнать больше",
    mascotMood: "hi",
  },
  {
    heading: "Только проверенные каналы",
    subHeading:
      "Мы вручную верифицируем каждого автора, чтобы вы были уверены в качестве аудитории и безопасности сделок.",
    buttonText: "Как это работает?",
    mascotMood: "surprise",
  },
  {
    heading: "Никаких сделок!",
    subHeading:
      "Наша система автоматически проверит наличие соблюдения условий обеих сторон.",
    buttonText: "Далее",
    mascotMood: "felt-shy",
  },
  {
    heading: "Поиск рекламы в один клик",
    subHeading:
      "Забудьте о ручном поиске. Наша платформа найдет для вас идеального партнера — просто нажмите кнопку.",
    buttonText: "Начать!",
    mascotMood: "happy",
  },
];
const FinalPresentationResourceRu: PresentationItem = {
  heading: "Мы только начинаем наш путь!",
  subHeading: "И те кто присоединяется к нам сейчас, получают самые выгодные условия!",
  buttonText: "Получить!",
  mascotMood: "lovable",
};

const PresentationResourceEn: PresentationItem[] = [
  {
    heading: `Welcome to ${AppTitle}!`,
    subHeading:
      "A service that connects advertisers and Telegram channel owners.",
    buttonText: "Learn More",
    mascotMood: "hi",
  },
  {
    heading: "Only verified channels",
    subHeading:
      "We manually verify each author to ensure you get quality audience and transaction security.",
    buttonText: "How it works?",
    mascotMood: "surprise",
  },
  {
    heading: "No deals needed!",
    subHeading:
      "Our system automatically checks that both parties comply with the terms.",
    buttonText: "Next",
    mascotMood: "felt-shy",
  },
  {
    heading: "One-click ad search",
    subHeading:
      "Forget manual searching. Our platform will find the perfect partner for you — just press the button.",
    buttonText: "Get Started!",
    mascotMood: "happy",
  },
];

const FinalPresentationResourceEn: PresentationItem = {
  heading: "We're just starting our journey!",
  subHeading: "Those who join us now get the most favorable conditions!",
  buttonText: "Get it!",
  mascotMood: "lovable",
};

i18n.addResources("ru", "presentation", PresentationResourceRu);
i18n.addResources("en", "presentation", PresentationResourceEn);

// Добавляем финальные ресурсы в основной namespace с префиксом "final"
i18n.addResources("ru", "presentation", {
  "final.heading": FinalPresentationResourceRu.heading,
  "final.subHeading": FinalPresentationResourceRu.subHeading,
  "final.buttonText": FinalPresentationResourceRu.buttonText,
});
i18n.addResources("en", "presentation", {
  "final.heading": FinalPresentationResourceEn.heading,
  "final.subHeading": FinalPresentationResourceEn.subHeading,
  "final.buttonText": FinalPresentationResourceEn.buttonText,
});

const SlideContent = ({
  slide,
  api,
}: {
  slide: any;
  api: CarouselApi | undefined;
}) => {
  const handleNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-6 md:p-8 text-center">
      <MascotWidjet
        mood={slide.mascotMood}
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
  const navigate = useNavigate();
  const slidesContent =
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
          {slidesContent.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <SlideContent slide={slide} api={api} />
            </CarouselItem>
          ))}

          {/* final slide */}
          <CarouselItem className="basis-full">
            <div className="min-h-screen w-screen flex flex-col items-center justify-center p-6 md:p-8 text-center">
              <MascotWidjet
                mood={FinalPresentationResourceRu.mascotMood}
                title={t("final.heading") as string}
                subtitle={t("final.subHeading") as string}
              />
              <Button
                onClick={() => {
                  console.log("send event to bot");
                  navigate("/tma/profile", {
                    replace: true
                  })
                }}
                className="bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-primary/90 transition-colors shadow-primary shadow-lg mt-4"
              >
                {/* TODO: add action to bind bot and chanel, add referal link creation */}
                {t("final.buttonText")}
              </Button>


            </div>
          </CarouselItem>
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
      </Carousel>
    </div>
  );
};
