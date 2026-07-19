import { Component } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import Cookies from 'js-cookie';
import menuData from "../../data/menuData";
import './index.css'

class Menu extends(Component){
  state = {
    menuList: menuData,
    activeCategory:"All",
    food:"All",
    searchInput:""
  }

  onClickLogout = () =>{
    Cookies.remove("token")
    localStorage.removeItem('eamil');
    localStorage.removeItem('password');
    localStorage.removeItem('savedRecipes');

    const {history} = this.props
    history.replace("/login")
  }

  onChangeSearchInput = (event) =>{
    this.setState({searchInput:event.target.value})
  }

  onChangeCategory = category =>{
    this.setState({activeCategory:category})
  }

  onChangeVeg = foodtype =>{
    this.setState({food:foodtype})
  }

  render(){
    const {menuList, activeCategory,food,searchInput} = this.state
    // console.log(menuList)
    const categoryList = activeCategory === "All" ?
     menuList:(
      menuList.filter(eachItem=> eachItem.category===activeCategory)
    )

    const filterList = food === "All"? categoryList : categoryList.filter(
      eachItem=>food === "Veg" ? eachItem.isVeg:!eachItem.isVeg
    )

    const searchList = filterList.filter(eachItem =>eachItem.name.toLowerCase().includes(searchInput.toLowerCase()));

    const savedRecipe =
    JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const username = localStorage.getItem("username");

    const savedCount = savedRecipe.length;
    return(
      <div className="menu-bg-container">
        <div className="party-logout">
          <h1 className="party-head">Party Menu</h1>
          <div>
            <Link to='/saved-recipes'>
            <button className="saved-btn">Saved Recipes <sup className="super-tag">{savedCount}</sup></button>
            </Link>
            <button className="saved-btn" 
            onClick={this.onClickLogout}
            >Logout</button>
          </div>
        </div>
        <p className="welcome-para">Welcome, {username}</p>


        {/* Filters Section */}

        <div className="filter-div">
          <p className="category-para">CATEGORY</p>
          <div>
            <button
            className={(activeCategory==="All")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeCategory("All")}
            >All</button>
            <button
            className={(activeCategory==="starter")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeCategory("starter")}
            >Starter</button>
            <button
            className={(activeCategory==="sides")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeCategory("sides")}
            >Sides</button>
            <button
            className={(activeCategory==="desert")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeCategory("desert")}
            >Desert</button>
          </div>

          <p className="diet-para">DIET</p>
          <div>
            <button
            className={(food==="All")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeVeg("All")}
            >All</button>
            <button
            className={(food==="Veg")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeVeg("Veg")}
            ><FaLeaf className="leaf-color" />Veg</button>
            <button
            className={(food==="Non-Veg")?"filter-btn":"all-color"}
            onClick={()=>this.onChangeVeg("Non-Veg")}
            ><IoRadioButtonOnSharp className="radio-color" />Non-Veg</button>
          </div>
          <div>
            <div className="search-container">
              <input
                className='search-input'
                type="search"
                className="search-input"
                placeholder="Search by name (e.g.chicken)"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />

              <button className="search-btn">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <p className="count-para">{searchList.length} Items found</p>
        {
          (filterList.length>0)?(
            <div className="flex-card-div">
        {
          searchList.map(eachItem=>{
            return(
              <Link to={`/menu/${eachItem.id}`} key={eachItem.id} className='link'>
                <div className="card-div" >
                  <div>
                    <div className="item-image"
                    style={{backgroundImage:`url(${eachItem.image})`
                    }}
                    >{
                      eachItem.isVeg ? (
                        <p className="non-para"><span style={{backgroundColor:"green"}} className="non-veg-tag">VEG</span></p>
                      ):
                      (
                        <p className="non-para"><span style={{backgroundColor:"red"}} className="non-veg-tag">NON-VEG</span></p>
                      )
                    }
                    </div>
                    <div className="main-head-div">
                      <p className="main-head">{eachItem.category}</p>
                      <h1 className="main-para-head">{eachItem.name}</h1>
                      <p className="main-para">{eachItem.description}</p>
                      <p className="no-para">{eachItem.servings}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }
        </div>
          ):(
            <div>
              <p className="not-found-color">No dishes found. Try different filters.</p>
            </div>
          )
        }
        
      </div>
    )
  }
}

export default Menu;