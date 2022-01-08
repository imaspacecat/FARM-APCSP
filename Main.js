// Import Data
var plants = getColumn("US Agricultural Crops", "Crop");
var plant2000 = getColumn("US Agricultural Crops", "2000 Yield");

// Set up data
var finalDataBig = [];
var biggestYield = {"name": '', "c_yield" : 0};

// Set up plants
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
  setProperty("purplePotatoSeeds", "border-width", 3);
  setProperty("redPotatoSeeds", "border-width", 0);
  setProperty("yellowPotatoSeeds", "border-width", 0);
  
});

onEvent("redPotatoSeeds", "click", function(){
  setProperty("purplePotatoSeeds", "border-width", 0);
  setProperty("redPotatoSeeds", "border-width", 3);
  setProperty("yellowPotatoSeeds", "border-width", 0);
  
});

onEvent("yellowPotatoSeeds", "click", function(){
  setProperty("purplePotatoSeeds", "border-width", 0);
  setProperty("redPotatoSeeds", "border-width", 0);
  setProperty("yellowPotatoSeeds", "border-width", 3);
  
});

//plant seeds

onEvent("tile1", "click", function(){
  if(getProperty("purplePotatoSeeds", "border-width") == 3){
    setProperty("purplePotatoSeeds", "border-width", 0);
    setProperty("tile1", "image", "dirt_tile_1_1.png");
    crops[0] = {
      "planted": true,
      "type": "purple",
      "stage": 0
    };
  }
});

// function to pick seeds
function checkAndSet(tile, seed) {
  
}
