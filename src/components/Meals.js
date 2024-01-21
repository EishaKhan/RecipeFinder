
import { useGlobalContext } from "../contextAPI/context";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorites, favorites } = useGlobalContext();

  if (loading) {
    return <section className="section">
      <h4>Loading...</h4>
    </section>
  }
  if (meals.length < 1) {
    return <section className="section">
      <h4>No meals matched your search term. Please try again.</h4>
    </section>
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { label, image } = singleMeal
        return <article className="single-meal" key={label}>
          <img src={image} alt={label} className='img' onClick={() => { selectMeal(label) }} />
          <footer>
            <h5>{label}</h5>
            <button className="like-btn" onClick={() => addToFavorites(label)}>{favorites.find(meal => meal.label === label) ? <FaHeart /> : <FaRegHeart />}</button>
          </footer>
        </article>;
      })}
    </section>
  );
}
export default Meals;