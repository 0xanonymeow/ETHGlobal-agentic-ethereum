import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const { login, authenticated, user, logout } = usePrivy();
  const [score, setScore] = useState<number>(0);
  const [state, setState] = useState<
    "idle" | "prepare" | "fighting" | "complete"
  >("idle");
  const [battleSequences, setBattleSequences] = useState<
    Array<{
      turn: number;
      action: "attack" | "defend";
      damage?: number;
      player: "user" | "opponent";
    }>
  >([]);

  const fetchNFTs = () => {};
  const onSelectNFT = () => {
    setState("prepare");
  };
  const onFight = () => {
    setState("fighting");
    setBattleSequences([]);
  };
  const onFightEnd = () => {
    setState("complete");
    setScore(0);
  };
  const onComplete = () => {
    setState("idle");
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
        backgroundColor: "#333333",
        borderRadius: 8,
        gap: 24,
      }}
    >
      <button
        onClick={() =>
          authenticated ? logout() : login({ loginMethods: ["wallet"] })
        }
      >
        {authenticated ? "Logout" : "Login"}
      </button>
      {authenticated && (
        <>
          <>
            {user?.wallet?.address?.slice(0, 6) +
              "..." +
              user?.wallet?.address?.slice(-4)}
          </>
          {score}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <image
              style={{
                height: 256,
                width: 256,
                backgroundColor: "blue",
                borderRadius: 24,
              }}
            />
            VS
            <image
              style={{
                height: 256,
                width: 256,
                backgroundColor: "red",
                borderRadius: 24,
              }}
            />
          </div>
          {(battleSequences.length && state == "fighting") ||
            (state == "complete" && (
              <>
                {battleSequences.map((sequence, index) => (
                  <div key={index}>
                    Turn: {sequence.turn}, Action: {sequence.action}, Damage:{" "}
                    {sequence.damage}, Player: {sequence.player}
                  </div>
                ))}
              </>
            ))}
          <button
            onClick={() =>
              state == "idle"
                ? onSelectNFT()
                : state == "prepare"
                ? onFight()
                : state == "complete"
                ? onComplete()
                : () => {}
            }
          >
            {state == "idle"
              ? "Select"
              : state == "prepare"
              ? "Fight"
              : state == "complete"
              ? "Complete"
              : ""}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
