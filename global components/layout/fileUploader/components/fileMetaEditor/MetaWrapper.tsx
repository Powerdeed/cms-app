export default function MetaWrapper({
  meta,
  val,
  children,
}: {
  meta: string;
  val: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="w-33">{meta}:</div>

      <div className="flex-1 min-h-10 input-style items-center flex gap-2.5">
        <div className="flex-1">{val}</div>
        {children}
      </div>
    </div>
  );
}
