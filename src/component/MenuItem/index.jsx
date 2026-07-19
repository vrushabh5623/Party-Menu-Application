import { Component } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaCheck } from "react-icons/fa";

import menuData from "../../data/menuData";
import './index.css'

class MenuItem extends(Component){
  state = {
    savedRecipe:[]
  }

  onClickSavedrecipe = () => {
  const { match } = this.props;
  const { id } = match.params;

  const savedRecipe =
    JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (savedRecipe.includes(Number(id))) {
    const updatedList = savedRecipe.filter(
      item => item !== Number(id)
    );

    localStorage.setItem(
      "savedRecipes",
      JSON.stringify(updatedList)
    );
  } else {
    savedRecipe.push(Number(id));

    localStorage.setItem(
      "savedRecipes",
      JSON.stringify(savedRecipe)
    );
  }

  this.forceUpdate();
};

  render(){
    const { match } = this.props;
    const { id } = match.params;

    const menuItem = menuData.find(
      eachItem => eachItem.id === Number(id)
    );

    const savedRecipe =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];

    const isSaved = savedRecipe.includes(Number(id));
    console.log(savedRecipe)
    return(
      <div className="save-bg-container">
          <div className="save-btn-container">
            <div>
              <Link to='/' className='link'>
                <button className="save-item-btn1"><FaArrowLeftLong/>Back to Menu</button>
              </Link>
            </div>
            <div className="check-btn-container">
              <Link to="/saved-recipes">
              <button className="save-item-btn">Saved Recipes</button>
              </Link>
              <button 
              className={isSaved?"save-item-btn-true":"save-item-btn-false"}
              onClick={this.onClickSavedrecipe}
              >
                {
                  isSaved?<><FaCheck/>Saved</>:"Save Recipe"
                }
              </button>
            </div>
          </div>

          <div className="image-btn-container">
            <img src={menuItem.image} className="save-page-image" alt="save-image"/>
            <div>
              <div>
                <span className="save-main">Main</span>
                <span className="save-main-veg">Veg</span>
              </div>
              <h1 className="save-head">{menuItem.name}</h1>
              <p className="save-head-para">{menuItem.servings}</p>
              <p className="save-head-para">{menuItem.fullDescription}</p>
            </div>
          </div>

          <div className="ingred-container">
            <h1 className="ingred-head">Ingredients</h1>
            <div className="urad-div">
              <p className="urad-para">{menuItem.ingredients[0].name}</p>
              <p className="urad-quantity">{menuItem.ingredients[0].quantity}</p>
            </div>

            <div className="urad-div">
              <p className="urad-para">{menuItem.ingredients[1].name}</p>
              <p className="urad-quantity">{menuItem.ingredients[1].quantity}</p>
            </div>

            <div className="urad-div">
              <p className="urad-para">{menuItem.ingredients[2].name}</p>
              <p className="urad-quantity">{menuItem.ingredients[2].quantity}</p>
            </div>

            <div className="urad-div">
              <p className="urad-para">{menuItem.ingredients[3].name}</p>
              <p className="urad-quantity">{menuItem.ingredients[3].quantity}</p>
            </div>

            <div className="urad-div">
              <p className="urad-para">{menuItem.ingredients[4].name}</p>
              <p className="urad-quantity">{menuItem.ingredients[4].quantity}</p>
            </div>
          </div>
      </div>
    )
  }
}

export default MenuItem;