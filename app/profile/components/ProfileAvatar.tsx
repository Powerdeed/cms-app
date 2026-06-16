export default function ProfileAvatar({
  initials,
  image,
  size = "compact",
}: {
  initials: string;
  image: string;
  size?: "compact" | "large";
}) {
  const avatarSize = size === "large" ? "h-36 w-36" : "h-24 w-24";
  const textSize = size === "large" ? "text-[42px]" : "text-[28px]";

  return (
    <div
      className={`relative grid ${avatarSize} shrink-0 place-items-center overflow-hidden rounded-full bg-(--primary-blue) text-white shadow-[0_18px_40px_-24px_rgba(10,31,68,0.9)]`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Profile preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-3 rounded-full border border-(--primary-yellow)/60"></div>
          <div className="absolute inset-6 rounded-full border border-white/15"></div>
          <div className={`${textSize} font-bold leading-none`}>
            {initials}
          </div>
        </>
      )}
      <div className="absolute bottom-2 right-4 h-4 w-4 rounded-full border-2 border-white bg-(--primary-green)"></div>
    </div>
  );
}

