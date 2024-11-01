import { useEffect, useState } from "react";

import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import "./firebaseConfig"

function App() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [usuarios, setUsuarios] = useState([])
  function writeUserData() {
    const db = getDatabase();

    let userId = Math.floor(Math.random()* 99999)

    set(ref(db, 'users/' + userId), {
      userId,
      username,
      age,
    }).then(() => {
      console.log('Cadastrado')
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
          let arrayUsers = Object.entries(snapshot.val()).map(([id, userData]) => ({
            ...userData,
            userId: id
          }));
          setUsuarios(arrayUsers);
        } else {
          setUsuarios([]);
        }
      }).catch((error) => {
        console.error("Erro ao atualizar lista de usuários:", error);
      });
    })
    .catch((error) => {
      console.log("Erro ao cadastrar usuário:", error);
    });


  }

 
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        
        let arrayUsers = Object.entries(snapshot.val()).map(([id, userData]) => ({
          ...userData,         
          userId: id          
        }));
  
        console.log(arrayUsers);  
        setUsuarios(arrayUsers); 
      } else {
        console.log("Sem dados");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  function removerUsuario(id){
    const db = getDatabase();
    remove(ref(db, "users/" + id))
    .then(() =>{
      console.log("Removido...");
      setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.userId !== id));
    })
    .catch((error)=>{
      alert("Algo deu errado...");
      console.log("Algo deu errado..." + error);
    });
  }

  return (
    <>
      <div>
        <h1>Projeto criado com React</h1>
  
        <input type="text" name="user" id="idUser" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" name="age" id="idAge" onChange={(e) => setAge(e.target.value)} />
        <button onClick={writeUserData}>Gravar no banco</button>
      </div>
      <div>
        <h1>Usuários</h1>
        {usuarios.map((usuario) => (
          <ul key={usuario.userId}>
            <li>{usuario.username}</li>
            <li>{usuario.age}</li>
            <li><button onClick={() => removerUsuario(usuario.userId)}>Excluir</button></li>
          </ul>
        ))}
      </div>
    </>
  );
  
}

export default App;
