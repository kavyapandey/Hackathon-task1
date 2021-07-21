async function getAnime(animeName){
    const data = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${animeName}`,{
            method : "GET"
        }
    );
    try{  
    const Anime = await data.json();
    loadAnime(Anime.results);
  }
  catch(error){
    document.querySelector("#error-msg").innerText="Uh Oh !! The Anime you are looking for does not exist. Please try again with different name. Eg: Naruto";
  }
  }
  
  function loadAnime(AnimeDetails){
    const animeList = document.createElement("div");
    animeList.className = "anime-list";
  Object.keys(AnimeDetails).forEach(function(anime){
    const animeContainer = document.createElement("div");
    animeContainer.className = "anime-container";
  
    animeContainer.innerHTML = `
    <div>
    <div class="image"><img class="anime-image"  src=${AnimeDetails[anime].image_url}> </img></div>
   
      <h4 class="anime-date">START DATE : <span> ${new Date(AnimeDetails[anime].start_date).toDateString()}</span></h4>
      <h4 class="anime-date">END DATE :<span>${new Date(AnimeDetails[anime].end_date).toDateString()}</span></h4>
      <h4 class="anime-type">TYPE :<span>${AnimeDetails[anime].type}</span></h4>
      <h4 class="anime-rating">IMDB RATING :<span>${AnimeDetails[anime].score}</span></h4>
    </div>
    `;
  
    animeList.append(animeContainer);
  });
  
  document.body.append(animeList);
  }
  
  function refreshAnime(){
    var element = document.querySelectorAll(".anime-list");
    document.getElementById("error-msg").innerHTML="";
    
    if(element.length>0)
    {
        element[0].remove();
    }
    
  }
  
  function searchAnime(){
    let name = document.querySelector(".anime-input").value;
    refreshAnime();
    getAnime(name);
  }
  