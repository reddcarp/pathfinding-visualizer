import Grid from "./components/grid";
import usePathfinding from "./hooks/usePathfinding";
import "./styles/App.css";

function App() {
  const { handleNodeChange, nodes } = usePathfinding(2, 5);

  return (
    <div className="App">
      <Grid handleNodeChange={handleNodeChange} nodes={nodes} />
    </div>
  );
}

export default App;
