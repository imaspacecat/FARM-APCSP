// Import Data
var plants = getColumn("US Agricultural Crops", "Crop");
var plant2000 = getColumn("US Agricultural Crops", "2000 Yield");

// Set up data
var finalDataBig = [];
var biggestYield = {"name": '', "c_yield" : 0};

// Set up plants
var chosenCrop = "";
var crops = [
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
  {
    "planted": false,
    "type": null,
    "stage": null
  },
];

// Sort data
function getBiggestYield(year){
  var plantYield = getColumn("US Agricultural Crops", year + " Yield");

  for(var x in plants){
  appendItem(finalDataBig, {
    "name": plants[x],
    "yield": plantYield[x]
  });
  
  
  
  if(plant2000[x] > biggestYield.c_yield){
    biggestYield.c_yield = plantYield[x];
    biggestYield.name = plants[x];
  }
}
return biggestYield;
}

// Set Splash Text
var year = randomNumber(2000, 2018);
setTimeout(function (){ setText("splooshText", "Did you know? In " + year + ", the crop with the highest yield was " + getBiggestYield(randomNumber(2000, 2018)).name + " with " + getBiggestYield(year).c_yield + " " + getBiggestYield(year).name + "s harvested!"); }, 100);

//switch screens
onEvent("playButton", "click", function(){
  setScreen("farmScreen");
});

//put border on selected seed packet
onEvent("purplePotatoSeeds", "click", function(){
  pickSeeds("purple");
});

onEvent("redPotatoSeeds", "click", function(){
  pickSeeds("red");
});

onEvent("yellowPotatoSeeds", "click", function(){
  pickSeeds("yellow");
});

//plant seeds
onEvent("tile1", "click", function(){
  checkAndSet(1, chosenCrop);
});
onEvent("tile2", "click", function(){
  checkAndSet(2, chosenCrop);
});
onEvent("tile3", "click", function(){
  checkAndSet(3, chosenCrop);
});
onEvent("tile4", "click", function(){
  checkAndSet(4, chosenCrop);
});
onEvent("tile5", "click", function(){
  checkAndSet(5, chosenCrop);
});
onEvent("tile6", "click", function(){
  checkAndSet(6, chosenCrop);
});
onEvent("tile7", "click", function(){
  checkAndSet(7, chosenCrop);
});
onEvent("tile8", "click", function(){
  checkAndSet(8, chosenCrop);
});
onEvent("tile9", "click", function(){
  checkAndSet(9, chosenCrop);
});

//function to pick seeds
function pickSeeds(color){
  if(getProperty(color + "PotatoSeeds", "border-width") != 3){
    setProperty("purplePotatoSeeds", "border-width", 0);
    setProperty("redPotatoSeeds", "border-width", 0);
    setProperty("yellowPotatoSeeds", "border-width", 0);
    
    setProperty(color + "PotatoSeeds", "border-width", 3);
    
    chosenCrop = color;
  }else{
    setProperty(color + "PotatoSeeds", "border-width", 0);
    chosenCrop = "";
  }
}

// function to plant seeds
function checkAndSet(tile, seed) {
  if(crops[tile-1].planted != true && chosenCrop != ""){
    setProperty(seed + "PotatoSeeds", "border-width", 0);
    setProperty("tile" + tile, "image", "dirt_tile_1_" + randomNumber(1, 3) + ".png");
    chosenCrop = "";
    crops[tile-1] = {
      "planted": true,
      "type": seed,
      "stage": 0
    };
  }
}
