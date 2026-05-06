export default function EditorField({
  label,
  required,
  control,
}: {
  label: string;
  required?: boolean;
  control: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-33 pt-2">
        {label}
        {required && <span className="text-(--primary-red)">*</span>}:
      </div>

      <div className="flex-1">{control}</div>
    </div>
  );
}
