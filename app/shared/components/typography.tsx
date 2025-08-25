export const HeadingText = ({children}: {children: React.ReactNode}) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export const ParagraphText = ({children}: {children: React.ReactNode}) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export const HeadWIthParagraph = ({title, subtitle}: {title: string, subtitle: string}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <HeadingText>{title}</HeadingText>
      <ParagraphText>{subtitle}</ParagraphText>
    </div>
  );
};