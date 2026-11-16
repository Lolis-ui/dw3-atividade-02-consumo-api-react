import constants from "@/lib/constants";

export default function RegionSelector({ regiaoAtual, onMudarRegiao }) {
  const regioes = Object.keys(constants.REGION_DISPLAY_NAMES);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.8rem",
        marginBottom: "2.5rem",
        justifyContent: "center",
      }}
    >
      {regioes.map((regiao) => {
        const ativa = regiaoAtual === regiao;
        return (
          <button
            key={regiao}
            onClick={() => onMudarRegiao(regiao)}
            style={{
              backgroundColor: ativa ? "#ee1515" : "#ffffff",
              border: "2px solid #222224",
              padding: "0.6rem 1.5rem",
              borderRadius: "999px",
              fontWeight: "900",
              fontSize: "1rem",
              color: ativa ? "#ffffff" : "#222224",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: ativa ? "0 4px 0 #222224" : "0 2px 0 #ccc",
              transform: ativa ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {constants.REGION_DISPLAY_NAMES[regiao]}
          </button>
        );
      })}
    </div>
  );
}
