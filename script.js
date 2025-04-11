let APIKEY = "e18b15d2";
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchBtn");  //to get the search button element


//"Fat arrow" functions, also known as arrow functions, are a concise way to define functions in JavaScript introduced in ES6, using the => operator, allowing for shorter syntax and lexical scoping of this. 
const getData = async (movie) => {
    try{
    let fetchData = await fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&t=${movie}`);

    //fetching data from the API using the search input value
    let jsonData = await fetchData.json();
    console.log(jsonData);


    document.querySelector(".card").innerHTML = ""; //clearing the previous search results

    searchInput.value = ""; //clearing the search input field



    let div = document.createElement("div"); //creating a new div element to display the movie data
   div.classList.add("moviecard")       //adding a class to the div element for styling..
div.innerHTML=`
         <img src=${jsonData.Poster} alt="">
         <div class="cardText">     <!-- adding a class to the div element for styling.. -->
             <h1>${jsonData.Title}</h1>
              <p class ="rating" >Ratings :<span>${jsonData.Ratings[0].Value}</p>   <!--/getting the rating value from the API response -->
              <a href="">${jsonData.Genre}</a><br>  
               <p>Released Date :<span>${jsonData.Released}</span></p>
               <p>Writer :<span>${jsonData.Writer}</span></p>
               <p>Description :<span>${jsonData.Plot}</span></p>
               <p>Total Time :<span>${jsonData.Runtime}</span></p>
               <p>Released Year : <span>${jsonData.Year}</span></p> 

   </div>
`
document.querySelector(".card").appendChild(div) ; //appending the new div element to the card class in the HTML document
   
    }
    catch (error) {
        console.log(error); //logging any errors that occur during the fetch request

        alert("Please enter a valid movie name");


        // document.querySelector(".card").innerHTML = "<h1> Enter valid movie name "; //displaying an error message if the fetch request fails
    }

}
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

