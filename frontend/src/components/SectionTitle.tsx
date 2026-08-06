interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex flex-col text-4xl font-semibold my-4">
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
