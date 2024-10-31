import { useState } from "react";

import { getDatabase, ref, set, child, get } from "firebase/database";
import "./firebaseConfig"

function App() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [usuarios, setUsuarios] = useState([])

  function writeUserData() {
    const db = getDatabase();

    let userId = Math.floor(Math.random()* 99999)

    set(ref(db, 'users/' + userId), {
      username,
      age,
    }).then(() => {
      console.log('Cadastrado')
    })
    .catch((error) => {
      console.log(error)
    });


  }

  // const dbRef = ref(getDatabase());
  
  // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  
  return (
    <>
      <h1>Projeto criado com react</h1>

      <input type="text" name="user" id="idUser" onChange={(e)=> setUsername(e.target.value)}/>
      <input type="text" name="age" id="idAge" onChange={(e)=> setAge(e.target.value)}/>
      <button onClick={writeUserData}>Gravar no banco</button>

    </>
  )
}

export default App;
