export default function EditorField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="vertical-layout__inner">
      <span className="text-style__small-text text-(--primary-grey)">
        {label}
      </span>
      <input
        className="input-style text-style__body"
        defaultValue={defaultValue}
      />
    </label>
  );
}

