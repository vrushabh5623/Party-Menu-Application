import { Component } from "react";
import { Link } from "react-router-dom";
import menuData from "../../data/menuData";
import "./index.css";

class SavedRecipes extends Component {

  removeBtn = id => {
    const savedRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];

    const updatedList = savedRecipes.filter(
      eachId => eachId !== id
    );

    localStorage.setItem(
      "savedRecipes",
      JSON.stringify(updatedList)
    );

    this.forceUpdate();
  };
  render() {
    const savedRecipe =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];

    const savedItems = menuData.filter(eachItem =>
      savedRecipe.includes(eachItem.id)
    );


    return (
      <div className="menu-bg-container">
        <div className="party-logout">
          <h1 className="party-head">Saved Recipes</h1>

          <Link to="/">
            <button className="saved-btn">Back to Menu</button>
          </Link>
        </div>

        <p className="count-para">
          {savedItems.length} Recipes Saved
        </p>

        (
            <div className="flex-card-div">
          {savedItems.length === 0 ? (
            <div className="save-not-found">
              <p className="no-recip-met">No saved recipes yet.</p>
              <p className="browse-recipe">Browse the menu</p>
            </div>
          ) : (
            savedItems.map(eachItem => (
                <div key={eachItem.id}>
                <div className="card-div">
                  <div
                    className="item-image"
                    style={{
                      backgroundImage: `url(${eachItem.image})`,
                    }}
                  >
                    {eachItem.isVeg ? (
                      <p className="non-para">
                        <span
                          className="non-veg-tag"
                          style={{ backgroundColor: "green" }}
                        >
                          VEG
                        </span>
                      </p>
                    ) : (
                      <p className="non-para">
                        <span
                          className="non-veg-tag"
                          style={{ backgroundColor: "red" }}
                        >
                          NON-VEG
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="main-head-div">
                    <p className="main-head">
                      {eachItem.category.toUpperCase()}
                    </p>

                    <h1 className="main-para-head">
                      {eachItem.name}
                    </h1>

                    <p className="main-para">
                      {eachItem.description}
                    </p>
                    <p className="no-para">
                      {eachItem.servings}
                    </p>
                    <button className="remove-btn" onClick={() => this.removeBtn(eachItem.id)}>Remove</button>
                  </div>
                </div>
                </div>
            ))
          )}
        </div>
          )

        
      </div>
    );
  }
}

export default SavedRecipes;