import Image from "next/image";

export function VerdictEmblem() {
  return (
    <div aria-hidden="true" className="verdict-emblem">
      <div className="verdict-emblem__label">
        <span>Anti-Fraud Stance</span>
        <p>No compromise with fraud</p>
      </div>
      <div className="verdict-emblem__media" role="img" aria-label="Hammer logo">
        <Image
          src="/hammer-logo.png"
          alt=""
          width={1024}
          height={1024}
          className="verdict-emblem__image"
          priority
        />
      </div>
      <div className="verdict-emblem__ring verdict-emblem__ring--one" />
      <div className="verdict-emblem__ring verdict-emblem__ring--two" />
    </div>
  );
}
