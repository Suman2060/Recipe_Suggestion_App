import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeal = async () => {
    if (!query) return;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();
    setMeals(data.meals || []);
    setSelectedMeal(null);
  };

  const randomMeal = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    setMeals([data.meals[0]]);
    setSelectedMeal(null);
  };

  const fetchMealDetails = async (id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    setSelectedMeal(data.meals[0]);
  };

  return (
    <div className="container">
      <h1>🍲 Recipe Suggestion App</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Search meal by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMeal}>Search</button>
        <button onClick={randomMeal}>🎲 Random</button>
      </div>

      <div className="recipes">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strArea} | {meal.strCategory}</p>
            <button onClick={() => fetchMealDetails(meal.idMeal)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="details">
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
          <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
          <p><strong>Area:</strong> {selectedMeal.strArea}</p>
          <p><strong>Instructions:</strong></p>
          <p>{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default App;

