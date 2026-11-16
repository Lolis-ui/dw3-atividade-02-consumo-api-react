import constants from "@/lib/constants";
import typeIcons from "@/data/typeIcons.json";
import Image from "next/image";

export default function TypeBadge({ type }) {
  const corDoTipo = constants.TYPE_COLORS[type] || "#777";
  const icone = typeIcons[type];

  return (
    <span
      style={{
        backgroundColor: "#ffffff",
        color: corDoTipo,
        border: `2px solid ${corDoTipo}`,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 14px",
        borderRadius: "999px",
        fontSize: "0.9rem",
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {icone && (
        <Image
          src={icone}
          alt={type}
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
      )}
      {type}
    </span>
  );
}
