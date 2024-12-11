import React, { useState } from "react";
import "./App.css";

const App = () => {
  // Tüm cüzlerin sayfalarını içeren liste
  const cuzler = [
    { cuz: 1, sayfalar: Array.from({ length: 20 }, (_, i) => i + 1) },
    { cuz: 2, sayfalar: Array.from({ length: 20 }, (_, i) => i + 21) },
    { cuz: 3, sayfalar: Array.from({ length: 20 }, (_, i) => i + 41) },
    { cuz: 4, sayfalar: Array.from({ length: 20 }, (_, i) => i + 61) },
    { cuz: 5, sayfalar: Array.from({ length: 20 }, (_, i) => i + 81) },
    { cuz: 6, sayfalar: Array.from({ length: 20 }, (_, i) => i + 101) },
    { cuz: 7, sayfalar: Array.from({ length: 20 }, (_, i) => i + 121) },
    { cuz: 8, sayfalar: Array.from({ length: 20 }, (_, i) => i + 141) },
    { cuz: 9, sayfalar: Array.from({ length: 20 }, (_, i) => i + 161) },
    { cuz: 10, sayfalar: Array.from({ length: 20 }, (_, i) => i + 181) },
    { cuz: 11, sayfalar: Array.from({ length: 20 }, (_, i) => i + 201) },
    { cuz: 12, sayfalar: Array.from({ length: 20 }, (_, i) => i + 221) },
    { cuz: 13, sayfalar: Array.from({ length: 20 }, (_, i) => i + 241) },
    { cuz: 14, sayfalar: Array.from({ length: 20 }, (_, i) => i + 261) },
    { cuz: 15, sayfalar: Array.from({ length: 20 }, (_, i) => i + 281) },
    { cuz: 16, sayfalar: Array.from({ length: 20 }, (_, i) => i + 301) },
    { cuz: 17, sayfalar: Array.from({ length: 20 }, (_, i) => i + 321) },
    { cuz: 18, sayfalar: Array.from({ length: 20 }, (_, i) => i + 341) },
    { cuz: 19, sayfalar: Array.from({ length: 20 }, (_, i) => i + 361) },
    { cuz: 20, sayfalar: Array.from({ length: 20 }, (_, i) => i + 381) },
    { cuz: 21, sayfalar: Array.from({ length: 20 }, (_, i) => i + 401) },
    { cuz: 22, sayfalar: Array.from({ length: 20 }, (_, i) => i + 421) },
    { cuz: 23, sayfalar: Array.from({ length: 20 }, (_, i) => i + 441) },
    { cuz: 24, sayfalar: Array.from({ length: 20 }, (_, i) => i + 461) },
    { cuz: 25, sayfalar: Array.from({ length: 20 }, (_, i) => i + 481) },
    { cuz: 26, sayfalar: Array.from({ length: 20 }, (_, i) => i + 501) },
    { cuz: 27, sayfalar: Array.from({ length: 20 }, (_, i) => i + 521) },
    { cuz: 28, sayfalar: Array.from({ length: 20 }, (_, i) => i + 541) },
    { cuz: 29, sayfalar: Array.from({ length: 20 }, (_, i) => i + 561) },
    { cuz: 30, sayfalar: Array.from({ length: 20 }, (_, i) => i + 581) },
  ];

  const [names, setNames] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [selectedCuz, setSelectedCuz] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Kişi ekleme
  const addName = () => {
    if (nameInput.trim()) {
      if (editIndex !== null) {
        const updatedNames = [...names];
        updatedNames[editIndex] = nameInput.trim();
        setNames(updatedNames);
        setEditIndex(null);
      } else {
        setNames([...names, nameInput.trim()]);
      }
      setNameInput("");
    }
  };

  // Kişi silme
  const deleteName = (index) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
  };

  // Kişi düzenleme
  const editName = (index) => {
    setNameInput(names[index]);
    setEditIndex(index);
  };

  // Cüz seçme
  const toggleCuzSelection = (cuz) => {
    setSelectedCuz((prev) =>
      prev.includes(cuz)
        ? prev.filter((item) => item !== cuz)
        : [...prev, cuz]
    );
  };

  // Sayfa dağıtımı
  const distributePages = () => {
    if (names.length === 0 || selectedCuz.length === 0) {
      alert("Lütfen önce kişiler ve cüz bilgilerini girin!");
      return;
    }

    const allPages = selectedCuz
      .map((cuzNumber) => {
        const cuz = cuzler.find((item) => item.cuz === cuzNumber);
        return cuz ? cuz.sayfalar : [];
      })
      .flat();

    const pagesPerPerson = Math.floor(allPages.length / names.length);
    const remainingPages = allPages.length % names.length;
    let tempAssignment = [];
    let pageIndex = 0;

    names.forEach((name, index) => {
      const extraPage = index < remainingPages ? 1 : 0;
      const assignedPages = allPages.slice(
        pageIndex,
        pageIndex + pagesPerPerson + extraPage
      );
      tempAssignment.push({ name, pages: assignedPages });
      pageIndex += pagesPerPerson + extraPage;
    });

    setAssignment(tempAssignment);
  };

  return (
    <div className="container">
      <h1>Please choose...</h1>

      <div className="cuz-buttons">
        
        {cuzler.map((cuz) => (
          <button
            key={cuz.cuz}
            onClick={() => toggleCuzSelection(cuz.cuz)}
            style={{
              backgroundColor: selectedCuz.includes(cuz.cuz) ? "#4CAF50" : "#ccc",
            }}
          >
            {cuz.cuz}. Juz
          </button>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter the name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button onClick={addName}>
          {editIndex !== null ? "Edit" : "Add"}
        </button>
      </div>

      <h2>People</h2>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name}{" "}
            <button onClick={() => editName(index)}>Edit</button>
            <button onClick={() => deleteName(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <button
        onClick={distributePages}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Share pages
      </button>

      <h2>Sharing Results</h2>
      <ul>
        {assignment.map((item, index) => (
          <li key={index}>
            {item.name} - Pages: {item.pages.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;