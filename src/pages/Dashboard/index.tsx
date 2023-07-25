import "./dahsboard.style.css";
import { useAuth } from "../../context/UserContext";
import { useState } from "react";
import { useMovement } from "../../context/MovementContext";
import { useProduct } from "../../context/ProductContext";

interface movementObject {
  type: string;
  date: string;
  product: string;
  price: string;
  seller: string;
}

interface userObject {
  name: string;
}

interface productObject {
  product: string;
  producer: string;
}

export const Dashboard = () => {
  const { saveUser, signOut } = useAuth();
  const { saveProduct } = useProduct();
  const { saveMovement } = useMovement();
  const [file, setFile] = useState("");

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

  const arrayReducer = (parametro: string[][]) => {
    let array = [parametro[0]];

    for (let i = 1; i < parametro.length; i++) {
      const a = array.toString();
      const element = parametro[i];
      const b = element.toString();
      !a.includes(b) && array.push(element);
    }

    return array;
  };

  const txtArray =
    file &&
    file
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

  const movementsArray: "" | movementObject[] =
    txtArray &&
    txtArray.map((item: string[]) => ({
      type: item[0],
      date: item[1],
      product: item[2],
      price: item[3],
      seller: item[4],
    }));

  const movementsKeeper = () => {
    movementsArray &&
      Promise.all(movementsArray.map((item) => saveMovement(item)));
  };

  const users = txtArray && txtArray.map((item) => [item[4]]);

  const reducedUsers = users && arrayReducer(users);

  const usersArray: "" | userObject[] =
    reducedUsers &&
    reducedUsers.map((item) => ({
      name: item[0],
    }));

  const usersKeeper = () => {
    usersArray &&
      Promise.all(usersArray.map((item) => saveUser({ userName: item.name })));
  };

  const products =
    txtArray &&
    txtArray
      .map((item) => [item[0], item[2], item[4]])
      .filter((element) => element[0] === "1");

  const reducedProducts = products && arrayReducer(products);

  const productsArray: "" | productObject[] =
    reducedProducts &&
    reducedProducts.map((item) => ({
      product: item[1],
      producer: item[2],
    }));

  const productsKeeper = () => {
    productsArray &&
      Promise.all(productsArray.map((item) => saveProduct(item)));
  };

  const handleData = () => {
    usersKeeper();
    setTimeout(productsKeeper, 500);
    setTimeout(movementsKeeper, 1000);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-sheath">
        <div className="input-format">
          <h4>ingresa un archivo</h4>
        </div>
        <input type="file" name="file" onChange={readFile} />
        <button onClick={() => handleData()}>guardar movements</button>
      </div>
      <button onClick={() => signOut()}>salir</button>
    </div>
  );
};
