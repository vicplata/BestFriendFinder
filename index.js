var owners_names_dic = {
    "1":"Fer Romo",
    "2":"Victor Plata",
    "3":"Cesar Hdz",
    "4":"Alex Falconi",
    "5":"Juan Pablo",
    "6":"Fer Garza",
    "7":"Mau Reyna",
    "8":"Ana Pau",
    "9":"Karely",
    "10":"Claudia F",
    "11":"Fran R",
    "12":"Aylin V",
    "13":"Daniel G",
    "14":"Eduardo D",
    "15":"Paulina M",
    "16":"Aranza S",
    "17":"Ayde M",
    "18":"Cinthia U",
    "19":"Miguel P",
    "20":"Eduardo G"
};

var dogs_names_dic ={
    "1":"Coco",
    "2":"Lucas",
    "3":"Max",
    "4":"Chilakil",
    "5":"Chinis",
    "6":"Otis",
    "7":"Rex",
    "8":"Rudy",
    "9":"Rufus",
    "10":"Rocco",
    "11":"Baxter",
    "12":"Firulais",
    "13":"Duke",
    "14":"Loki",
    "15":"Toby",
    "16":"Sparky",
    "17":"Ziggy",
    "18":"Ollie",
    "19":"Lilly",
    "20":"Snoopy"
}

var owners_choice = {};

var own_size = 20;

 
 
 function myFunction(){
     
    for(let i =1; i<=own_size;i++){
        document.getElementById("sd"+i).style.backgroundImage="url('./dog_images/perro"+i+".png')";
        document.getElementById("o"+i).style.backgroundImage="url('./owner_images/dueno"+i+".png')";
        owners_choice["dueno"+i+".png"] = 0;
        var x=document.getElementById('myTable').insertRow(-1);
        var y = x.insertCell(0);
        var z = x.insertCell(1);
        var w = x.insertCell(2);
        y.innerHTML=owners_names_dic[i];
        var owner_first_choice = ownersDic["dueno"+i+".png"][0];
        owner_first_choice = owner_first_choice.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ");
        z.innerHTML=dogs_names_dic[owner_first_choice];
        w.innerHTML="0";

        var xd =document.getElementById('myTableDogs').insertRow(-1);
        var yd = xd.insertCell(0);
        var zd = xd.insertCell(1);
        var wd = xd.insertCell(2);
        yd.innerHTML=dogs_names_dic[i];
        var dog_first_choice = dogsDic["perro"+i+".png"][0];
        dog_first_choice = dog_first_choice.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ");
        zd.innerHTML=owners_names_dic[dog_first_choice];
        wd.innerHTML="0";



        x=document.getElementById('myTableM').insertRow(-1);
        y = x.insertCell(0);
        z = x.insertCell(1);
        w = x.insertCell(2);
        y.innerHTML=owners_names_dic[i];
        owner_first_choice = ownersDic["dueno"+i+".png"][0];
        owner_first_choice = owner_first_choice.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ");
        z.innerHTML=dogs_names_dic[owner_first_choice];
        w.innerHTML="0";

        x=document.getElementById('myTableDogsM').insertRow(-1);
        y = x.insertCell(0);
        z = x.insertCell(1);
        w = x.insertCell(2);
        y.innerHTML=owners_names_dic[i];
        owner_first_choice = ownersDic["dueno"+i+".png"][0];
        owner_first_choice = owner_first_choice.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ");
        z.innerHTML=dogs_names_dic[owner_first_choice];
        w.innerHTML="0";
    }
}


function inValues(dict, val){
    for(var key in dict){
        if (val === dict[key])
            return true;
    }
    return false;
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function isDogFoster(dog, array){
    var i = 0;
    for(i; i < array.length;i++){
        if (array[i] === dog)
            return true;
    }
    return false;
}

function getIndexOf(array, val){
    for(let i = 0; i < array.length; i++){
        if (array[i].localeCompare(val) === 0)
        return i;
    }
    return -1;
}

function shuffle(array) {
    var ar = array.slice(0);
    for(let i = ar.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = ar[i]
        ar[i] = ar[j]
        ar[j] = temp
      }
      return ar;
  }

var owners = []
for(let i = 1;
    i<=own_size;i++){
    owners.push("dueno"+i.toString()+".png");

}

var dogs = []
for(let i = 1;i<=own_size;i++){
    dogs.push("perro"+i.toString()+".png");
}

var ownersDic = {}
    for(let i =0; i<owners.length; i++){
        var dogsList = shuffle(dogs)
        ownersDic[owners[i]]= dogsList;
    }

var dogsDic = {}
    for(let i =0; i<dogs.length; i++){
        var ownersList = shuffle(owners);
        dogsDic[dogs[i]]= ownersList
    }



function getOwners(){
    return owners;
}

function getDogs(){
    return dogs;
}

var possible_matches = {};

var foster_dogs = dogs.slice(0);

function getAnimations(){
    var animation = [];
while(foster_dogs.length != 0){
    let ownerIndx = 0;
    for(var owner in ownersDic){
        for(var i = 0; i < ownersDic[owner].length; i++){
            var dog = ownersDic[owner][i];
            if(isDogFoster(dog, foster_dogs) && !inValues(possible_matches, owner)) {
                removeA(foster_dogs, dog);
                possible_matches[dog] = owner;
                animation.push(owner+" will potentialy adopt " + dog);
                break;
            }else if (getIndexOf(dogsDic[dog],owner) < getIndexOf(dogsDic[dog],possible_matches[dog]) && !inValues(possible_matches, owner)){
                animation.push(owner + "will potentially adopt "+ dog);
                possible_matches[dog] = owner;
                break;
            }
        }
        ownerIndx ++;
    }
}
var results = [possible_matches, animation]
    return results;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function findMatches(){
    const results = getAnimations();
    var matches = results[0];
    var animation = results[1];
        let i =1 ;
        var dogs_choice = {};
        
        for(var dog in matches){
          var owner = matches[dog];
          dogs_choice[dog] = parseInt(getIndexOf(dogsDic[dog],matches[dog])+1);
          owners_choice[owner] = parseInt(getIndexOf(ownersDic[owner], dog))+1;
          var dogs_table = document.getElementById('myTableDogs');
          var owners_table = document.getElementById('myTable');
          var dogs_tableM = document.getElementById('myTableDogsM');
          var owners_tableM = document.getElementById('myTableM');

          //var pic = 'url(' + imgUrl + ')';
          await sleep(100);
          var dogId =matches[dog].replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ");
          document.getElementById("d"+dogId).style.backgroundImage = "url('./dog_images/"+dog+"')";
          document.getElementById("dn"+dogId).textContent = dogs_names_dic[dog.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ")];
          document.getElementById("l"+dogId).textContent = "Will adopt"; 
          document.getElementById("sd"+dogId+"t").style.color = "green";
          document.getElementById("sd"+dogId+"t").textContent = "ADOPTED";
          i++;
        }
        i = 1;
        for(var owner in owners_choice){
            owners_table.rows[i].cells[2].innerHTML = owners_choice[owner];
            owners_tableM.rows[i].cells[2].innerHTML = owners_choice[owner];
            i++;
        }
        i = 1;
        console.log(dogs_choice);
        for(var dog in dogs_choice){
            dogs_table.rows[dog.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ")  ].cells[2].innerHTML = dogs_choice[dog];
            dogs_tableM.rows[dog.replace(/[^\d\s]|_/g, "").replace(/\s+/g, " ")  ].cells[2].innerHTML = dogs_choice[dog];
            i++;
        }
}