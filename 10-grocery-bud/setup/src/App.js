import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      // wyświetl alert
      showAlert(true, "danger", "Proszę wprowadź wartość");
    } else if (name && isEditing) {
      setList(
        // Iteracja po liście elementów, w przypadku natrafienia na liście elementó którego
        // Id === id do edycji następuje utworzenie nowego elementu i zmiana jego tytułu
        // Jeżeli nic nie będzie pasowalo zostanie zwrócony ten sam element
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Element został zmieniony");
    } else {
      showAlert(true, "success", "Element został dodany do listy");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  /**
   * Ustawia domyślny alert
   * @param {*} show Czy alert ma być wyświetlony
   * @param {*} type Typ alertu
   * @param {*} msg Wiadomość alertu
   */
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Wyczyszczenie listy");
    setList([]);
  };

  /**
   * Usuwa z listy element z zadanym id
   * @param {*} id id elementu do usunięcia
   */
  const removeItem = (id) => {
    showAlert(true, "danger", "element usunięty");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    // localStorage umożliwia przechowanie ustringowinej listy w pamięci przeglądarki
    // Po refreshu strony lista nie zostanie wymazana z pamięci
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Sklepik</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="np jajka"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <button className="submit-btn" type="submit">
            {isEditing ? "edytuj" : "dodaj"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Wyczyść listę
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
