export default function SignalCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[10px] border border-(--terciary-grey) bg-(--background) p-3">
      <div className="text-style__small-text text-(--primary-grey)">
        {label}
      </div>
      <div className="text-style__body--bold text-(--primary-blue)">
        {value}
      </div>
    </div>
  );
}

