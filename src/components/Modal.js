
import React from 'react';
import { useGlobalContext } from "../contextAPI/context";
import Protein from "../images/protein.png"
import Fat from "../images/fat.png"
import Carb from "../images/carb.png"

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  if (!selectedMeal) {
    return null;
  }

  const {
    image,
    label: title,
    healthLabels: tags,
    ingredientLines: instructions,
    url: source,
    yield: servings,
    calories,
    totalNutrients: {
      PROCNT: { quantity: protein },
      FAT: { quantity: fat },
      CHOCDF: { quantity: carbs },
      CHOLE: { quantity: cholesterol },
      NA: { quantity: sodium },
      CA: { quantity: calcium },
      MG: { quantity: magnesium },
      K: { quantity: potassium },
      FE: { quantity: iron }
    }
  } = selectedMeal;

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt={title} className="modal-image" />
        <div className="modal-content">
          <h4 className="modal-title">{title}</h4>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}.</span>
            ))}
          </div>
        </div>
        <div className="modal-nutrition-footer">
          <h5>Nutritional Information:</h5>
          <p><strong>Servings:</strong> {servings}</p>
          <p><strong>Calories:</strong> {calories.toFixed(0)} kcal</p>
          <div className="nutrient-grid">

            <div className="nutrient-item">
              <strong>Cholesterol:</strong> {cholesterol.toFixed(0)} mg
            </div>
            <div className="nutrient-item">
              <strong>Sodium:</strong> {sodium.toFixed(0)} mg
            </div>
            <div className="nutrient-item">
              <strong>Calcium:</strong> {calcium.toFixed(0)} mg
            </div>
            <div className="nutrient-item">
              <strong>Magnesium:</strong> {magnesium.toFixed(0)} mg
            </div>
            <div className="nutrient-item">
              <strong>Potassium:</strong> {potassium.toFixed(0)} mg
            </div>
            <div className="nutrient-item">
              <strong>Iron:</strong> {iron.toFixed(0)} mg
            </div>
          </div>
        </div>
        <div className="instructions">
          <div className="nutrient-item">
            <img src={Protein} alt="img" style={{ height: "15px", width: "15px", marginRight: "10px" }} /><strong>Protein:</strong> {protein.toFixed(0)} g
          </div>
          <div className="nutrient-item">
            <img src={Fat} alt="img" style={{ height: "15px", width: "15px", marginRight: "10px" }} /><strong>Fat:</strong> {fat.toFixed(0)} g
          </div>
          <div className="nutrient-item">
            <img src={Carb} alt="img" style={{ height: "15px", width: "15px", marginRight: "10px" }} /><strong>Carbs:</strong> {carbs.toFixed(0)} g
          </div>
          <h4 style={{ marginTop: "30px" }}>Instructions:</h4>
          {instructions.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </div>
        <a href={source} target="_blank" rel="noopener noreferrer">Original Source</a>
        <button onClick={closeModal} className="btn btn-hipster close-btn">Close</button>
      </div>
    </aside>
  );
};

export default Modal;