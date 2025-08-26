import { useLaunchParams } from "@telegram-apps/sdk-react";
import { TrendingUpIcon, UsersRound, MessageSquare } from "lucide-react";
import { Navigation } from "~/shared/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui-kit/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/shared/components/ui-kit/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import i18n from "~/shared/i18n";
import { useChannels } from "~/features/channels";
// что можно отобразить в профиле
// кол-во заказов
// состояние реферальной программы
// кол-во каналов
// боты

// Данные для чарта доходов
const earningsData = [
  { month: "Jan", earnings: 1200 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 2400 },
  { month: "Apr", earnings: 1600 },
  { month: "May", earnings: 2800 },
  { month: "Jun", earnings: 3200 },
];

// Конфигурация чарта
const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} as const;

i18n.addResourceBundle("ru", "profile", {
  referralProgram: "Реферальная программа",
  channels: "Каналы",
  clients: "Клиенты",
  earnings: "Заработок",
});

i18n.addResourceBundle("en", "profile", {
  referralProgram: "Referral Program",
  channels: "Channels",
  clients: "Clients",
  earnings: "Earnings",
});

export default function Profile() {

  
  const data = useLaunchParams();
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-start pt-4 pb-20">
        <ProfileData />

        {/* Карточки статистики */}
        <div className="w-full max-w-sm px-4 space-y-3 mt-4">
          <StatsCards />

          {/* Чарт доходов */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-normal text-muted-foreground flex flex-row items-center justify-between gap-2">
                Заработок за 6 месяцев
                <TrendingUpIcon className="w-4 h-4 text-primary" />
              </CardDescription>
              <CardTitle className="text-lg font-medium">$13,000</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ChartContainer config={chartConfig} className="h-32 w-full">
                <BarChart data={earningsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    interval={0}
                  />
                  <YAxis hide />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`$${value}`, "Заработок"]}
                  />
                  <Bar
                    dataKey="earnings"
                    fill="hsl(var(--primary))"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export const StatsCards = () => {
  const { getChannelsQuery } = useChannels();

  const { isPending, data: channels } = getChannelsQuery;
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Карточка клиентов */}
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-normal text-muted-foreground flex flex-row items-center justify-between gap-1">
            Клиентов
            <UsersRound className="w-3 h-3 text-primary" />
          </CardDescription>
          <CardTitle className="text-xl font-semibold">238</CardTitle>
        </CardHeader>
      </Card>

      {/* Карточка каналов */}
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-normal text-muted-foreground flex flex-row items-center justify-between gap-1">
            Каналы
            <MessageSquare className="w-3 h-3 text-primary" />
          </CardDescription>
          <CardTitle className="text-xl font-semibold">{channels?.length}</CardTitle>
        </CardHeader>
      </Card>

    </div>
  );
};

export const ProfileData = () => {
  const data = useLaunchParams();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 pt-6">
      <div className="w-full flex flex-row justify-center items-center">
        <img
          src={data.tgWebAppData?.user?.photo_url}
          alt="user"
          className="w-20 h-20 rounded-full border-2 border-primary/20 shadow-sm"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-1 px-4">
        <span className="text-xl font-semibold text-center leading-tight">
          {data.tgWebAppData?.user?.first_name + " "}
          {data.tgWebAppData?.user?.last_name}
        </span>
        <span className="text-sm font-normal text-muted-foreground">
          {data.tgWebAppData?.user?.username || "@Anonymous"}
        </span>
      </div>
    </div>
  );
};
