import "./dahsboard.style.css";
import { useAuth } from "../../context/UserContext";
import { useState } from "react";

interface MyObject {
  type: string;
  date: string;
  product: string;
  price: string;
  seller: string;
}

export const Dashboard = () => {
  const { signOut } = useAuth();

  const [file, setFile] = useState("");

  const txtArray = file
    .replace(/["]+/g, "")
    .split("\\n")
    .filter((item) => item.length !== 0)
    .map((item) => [
      item.slice(0, 1),
      item.slice(1, 26),
      item.slice(26, 56).trim(),
      item.slice(56, 66),
      item.slice(66),
    ]);

  const objectArray: MyObject[] = txtArray.map((item: string[]) => ({
    type: item[0],
    date: item[1],
    product: item[2],
    price: item[3],
    seller: item[4],
  }));
  console.log(objectArray);

  const readFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setFile(JSON.stringify(fileReader.result));
    };
    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sheath">
        <div className="input-format">
          <h4>ingresa un archivo</h4>
        </div>
        <input type="file" name="file" onChange={readFile} />
      </div>
      <button onClick={() => signOut()}>salir</button>
    </div>
  );
};
