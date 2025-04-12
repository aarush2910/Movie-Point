let APIKEY = "e18b15d2";
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchBtn");  //to get the search button element
let favourites = document.getElementById("favourites"); //to get the favourites button element
let jsonData;

//"Fat arrow" functions, also known as arrow functions, are a concise way to define functions in JavaScript introduced in ES6, using the => operator, allowing for shorter syntax and lexical scoping of this. 
const getData = async (movie) => {
    try {
      let fetchData = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${movie}`);
      jsonData = await fetchData.json();
      console.log(jsonData);
  
      document.querySelector(".card").innerHTML = "";
      searchInput.value = "";
  
      if (jsonData.Response === "True") {
        jsonData.Search.forEach(async (movieItem) => {
          // fetch full details using imdbID
          let details = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${movieItem.imdbID}`);
          let fullData = await details.json();
          createCard(fullData);
        });
      } else {
        document.querySelector(".card").innerHTML = "<h2>No movies found.</h2>";
      }
  
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };
  
//adding event listener to the search button to call the getData function when clicked

searchButton.addEventListener("click", function () {
    let movieName = searchInput?.value; 
    
    //getting the value of the search input field

    if (movieName != "") {
        //checking if the input field is not empty
        getData(movieName);
        
        //calling the getData function with the movie name as an argument
    }
    else {
        document.querySelector
    }
    if (movieName === "") {
        //checking if the input field is empty
       
        alert("Please enter a movie name");
        
        //alerting the user to enter a movie name
    }
    })
function addtofav()
{
    let movieArr = JSON.parse(localStorage.getItem("movie")) || [];
    
    //getting the movie data from local storage or initializing it to an empty array if it doesn't exist
    isPresent = movieArr.some((movie) => movie.imdbID === jsonData.imdbID); //checking if the movie is already in the favourites list
    if (isPresent) {
        alert("Movie already in favourites"); //alerting the user that the movie is already in favourites
        return;
    }


    movieArr.push(jsonData); //adding the new movie data to the array
    localStorage.setItem("movie", JSON.stringify(movieArr)); //storing the updated movie data in local storage
 //   localStorage.setItem("movie", JSON.stringify(jsonData)); //storing the movie data in local storage
    alert("Movie added to favourites"); //alerting the user that the movie has been added to favourites
}

function removefromfav()
{
    let movieArr = JSON.parse(localStorage.getItem("movie")) || []; //getting the movie data from local storage or initializing it to an empty array if it doesn't exist
    movieArr = movieArr.filter((movie) => movie.imdbID !== jsonData.imdbID); //filtering out the movie to be removed from the array
    //movieArr = movieArr.filter((movie) => movie.imdbID !== jsonData.imdbID); //filtering out the movie to be removed from the array
    localStorage.setItem("movie", JSON.stringify(movieArr)); //storing the updated movie data in local storage
 //   localStorage.setItem("movie", JSON.stringify(jsonData)); //storing the movie data in local storage
    alert("Movie removed from favourites"); //alerting the user that the movie has been removed from favourites
}


document.addEventListener("keypress",(e)=>{
    if (e.key === "Enter") {
    searchButton.click(); //triggering the click event of the search button when the Enter key is pressed
    }
}
);

function createCard(jsonData ,infav = false) {

    let div = document.createElement("div"); //creating a new div element to display the movie data
    div.classList.add("moviecard")       //adding a class to the div element for styling..
 div.innerHTML=`
          <img src=${jsonData.Poster} alt="">
          <div class="cardText">     <!-- adding a class to the div element for styling.. -->
              <h1>${jsonData.Title}</h1>
               <p class ="rating" >Ratings :<span>${jsonData.Ratings && jsonData.Ratings[0] ? jsonData.Ratings[0].Value : "N/A"}</p>   <!--/getting the rating value from the API response -->
               <a href="">${jsonData.Genre}</a><br>  
                <p>Released Date :<span>${jsonData.Released}</span></p>
                <p>Writer :<span>${jsonData.Writer}</span></p>
                <p>Description :<span>${jsonData.Plot}</span></p>
                <p>Total Time :<span>${jsonData.Runtime}</span></p>
                <p>Released Year : <span>${jsonData.Year}</span></p> 

                ${infav ? `<button  onClick="removefromfav()" id ="favBtn"> Remove from favourite </button>` : `<button  onClick="addtofav()" id ="favBtn"> Add to favourite </button>`}
               
               
                <!--checking if the movie is in favourites and displaying the appropriate button -->
                
                
        
            
 
    </div>
 `
 document.querySelector(".card").appendChild(div) ; //appending the new div element to the card class in the HTML document
}

favourites.addEventListener("click", function () 
{
 
    const favmovies = JSON.parse(localStorage.getItem("movie")) || []; //getting the movie data from local storage or initializing it to an empty array if it doesn't exist
    console.log(favmovies); //logging the movie data to the console
    document.querySelector(".card").innerHTML = ""; //clearing the previous search results  
    favmovies.forEach((movie) => {
        createCard(movie , true); //calling the createCard function to display the movie data
    });
    //creating a new div element to display the movie data



})