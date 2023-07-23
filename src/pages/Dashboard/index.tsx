import { useAuth } from "../../context/UserContext";

export const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>salir</button>
    </div>
  );
};
