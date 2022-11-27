import { createUseStyles } from "react-jss";

export default createUseStyles({
  container: {
    padding: "2vh",
    display: "grid",
    gap: "2vh",
    width: "100%",
    height: "100%",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    alignItems: "start",
    position: "fixed",
  }
});
