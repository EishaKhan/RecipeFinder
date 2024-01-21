import { useGlobalContext } from "../contextAPI/context";

const Favorites = () => {

  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext();

  return <section className="favorites">
    <div className="favorites-content">
      <h5>Favorites</h5>
      <div className="favorites-container">
        {favorites.map(item => {
          const { label, image } = item;
          return <div key={label} className='favorite-item'>
            <img src={image} className='favorites-img img' alt="img" onClick={() => selectMeal(label, true)} />
            <button className="remove-btn" onClick={() => removeFromFavorites(label)}>
              remove
            </button>
          </div>
        })}
      </div>
    </div>
  </section>
}
export default Favorites;