import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data);

export default function Home() {
  const [name, setName] = useState("");
  // const [data, setData] = useState([]);
  const { data, error } = useSWR("/api/users", fetcher);

  const addUser = () => {
    const sendNewUser = async () => {
      const res = await fetcher("/api/users", {
        method: "POST",
        body: JSON.stringify({ name: name, id: Math.random() * 1000 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate("/api/users");
    };
    sendNewUser();
    setName("");
  };

  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // });

  return (
    <div className={styles.container}>
      {data && data.users.map((user) => <li key={user.id}>{user.name}</li>)}
      <hr />
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={addUser}>Add user</button>
    </div>
  );
}

// export const getStaticProps = async (context) => {
//   const res = await fetch("http://localhost:3000/api/users");
//   const data = await res.json();
//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//     revalidate: 3,
//   };
// };
