let district = document.querySelector('#district')
let result = document.querySelector('#result')
let verifier = document.querySelector('#verifier')

url = 'communes/communes.json' //l'url vers la communes en json


//une focntion qui retourne le premier lettre en majuscule et les autres en muniscule 
function return_inputvalue(){
 
  district.addEventListener('input', function() {
    var inputValue =district.value.toLowerCase(); 
    var words = inputValue.split(' '); 
    for (var i = 0; i < words.length; i++) {
        // Met la première lettre de chaque mot en majuscule
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    // Reconstitue la chaîne avec les modifications
   district.value = words.join(' ');
  });

}


return_inputvalue()

//on ecoute le boutons verifier
verifier.addEventListener(('click') , ()=>{
 
  remove_liste() // avant de se lancer on appelle le fonction qui remove tous le listes

  try {
  fetch(url)
    .then(response => response.json())
   
    .then(data =>{
      for(let i = 0 ; data.length > i ; i++){//on parcourir tout les donnes dans la fichier
         
        if(data[i].name === district.value){
            data[i].fokontany.forEach((element , indice) => {
                let liste = document.createElement('li')//creer un elemet i pour ajouter tous les fokontany
                liste.textContent = element.name 
                liste.classList.add('listes')
                 result.appendChild(liste)
                 district.value = '' //vider la formulaire
                  });
         }else if(!data[i].name.includes(district.value)){//si le district a rechercher est ne pas dans la tableau
            result.textContent = 'Hamarino ny District nampidirinao azafady'
         }
        

      }//fin for

    })//fin recuperation data
  
  }catch(error){
      alert('une erreur se produite')
   }

})


//une fonction pour supprimmer les listes 
function remove_liste(){
  result.textContent = ''
}

    