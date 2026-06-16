import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileCheck({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-(--terciary-grey) p-3">
      <div className="grid h-7 w-7 place-items-center rounded-full bg-(--primary-green)/10 text-(--primary-green)">
        <FontAwesomeIcon icon={["fas", "check"]} />
      </div>
      <div className="text-style__body">{label}</div>
    </div>
  );
}

