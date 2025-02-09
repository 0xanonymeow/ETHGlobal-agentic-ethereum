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
  const [result, setResult] = useState<string>("");

  const fetchNFTs = () => {};
  const onStart = () => {
    setState("prepare");
  };
  const onFight = async () => {
    setState("fighting");
    setBattleSequences([]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Simulate a battle of random NFT fight",
        }),
      });

      const data = await response.json();
      if (data && data.response) {
        console.log(data.response);
        setResult(data.response);
        // You can still handle sequences if needed
        if (data.sequences) {
          setBattleSequences(data.sequences);
        }
      }
    } catch (error) {
      console.error("Error fetching battle simulation:", error);
      setState("complete");
    }
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
          {/* <div
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
          </div> */}
          {/* {(battleSequences.length && state == "fighting") ||
            (state == "complete" && (
              <>
                {battleSequences.map((sequence, index) => (
                  <div key={index}>
                    Turn: {sequence.turn}, Action: {sequence.action}, Damage:{" "}
                    {sequence.damage}, Player: {sequence.player}
                  </div>
                ))}
              </>
            ))} */}
          {state == "fighting" ||
            (state == "complete" && (
              <div style={{ whiteSpace: "pre-wrap", maxWidth: "800px" }}>
                {result}
              </div>
            ))}
          <button
            onClick={() =>
              state == "idle"
                ? onStart()
                : state == "prepare"
                ? onFight()
                : state == "complete"
                ? onComplete()
                : () => {}
            }
          >
            {state == "idle"
              ? "Start"
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
