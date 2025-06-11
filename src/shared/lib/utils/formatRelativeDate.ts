interface TimeUnit {
  limit: number;
  inMs: number;
  format: (value: number) => string;
}

export const formatRelativeDate = (dateString: string): string => {
  const inputDate = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - inputDate.getTime();

  if (diffInMs < 0) return "미래의 날짜";

  const units: TimeUnit[] = [
    {
      limit: 60 * 1000,
      inMs: 1000,
      format: v => `${Math.floor(v)}초 전`,
    },
    {
      limit: 60 * 60 * 1000,
      inMs: 60 * 1000,
      format: v => `${Math.floor(v)}분 전`,
    },
    {
      limit: 24 * 60 * 60 * 1000,
      inMs: 60 * 60 * 1000,
      format: v => `${Math.floor(v)}시간 전`,
    },
    {
      limit: 7 * 24 * 60 * 60 * 1000,
      inMs: 24 * 60 * 60 * 1000,
      format: v => `${Math.floor(v)}일 전`,
    },
    {
      limit: 30 * 24 * 60 * 60 * 1000,
      inMs: 7 * 24 * 60 * 60 * 1000,
      format: v => `${Math.floor(v)}주 전`,
    },
    {
      limit: 365 * 24 * 60 * 60 * 1000,
      inMs: 30 * 24 * 60 * 60 * 1000,
      format: v => `${Math.floor(v)}달 전`,
    },
  ];

  const match = units.find(unit => diffInMs < unit.limit);
  if (match) return match.format(diffInMs / match.inMs);

  const years = Math.floor(diffInMs / (365 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (diffInMs % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000),
  );

  return `${years}년${months > 0 ? ` ${months}개월` : ""} 전`;
};
