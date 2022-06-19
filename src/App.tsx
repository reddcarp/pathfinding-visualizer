import Grid from "./components/grid";
import StateSelector from "./components/stateSelector";
import usePathfinding from "./hooks/usePathfinding";
import "./styles/App.css";

function App() {
  const { handleNodeChange, nodes, handleSelectedStateChange } = usePathfinding(
    2,
    5
  );

  return (
    <div className="App">
      <StateSelector handleSelectedStateChange={handleSelectedStateChange} />
      <Grid handleNodeChange={handleNodeChange} nodes={nodes} />
    </div>
  );
}

export default App;
