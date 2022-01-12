setScreen("homePage");
// Plant class
// "class" keyword doesn't exist in code.org as the JS version is ES5
function Plant () {
  this.planted = false;
  this.type = null;
  this.stage = null;
  this.variation = null;
}

// Import Data
var plants = getColumn("US Agricultural Crops", "Crop");
var plant2000 = getColumn("US Agricultural Crops", "2000 Yield");

// Set up data
var finalDataBig = [];
var biggestYield = {"name": '', "c_yield" : 0};
var potatoYield = 0;

// Set up inventory
var inventory = {
  "purplePotato": 0,
  "redPotato": 0,
  "yellowPotato": 0,
  
  "purpleSeeds": 3,
  "redSeeds": 3,
  "yellowSeeds": 3
};

var chosenCrop = "";
var crops = [
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
  new Plant(),
];

//Other Farming Variables
var months = [["January", "Winter"], ["February", "Winter"], ["March", "Spring"],
["April", "Spring"], ["May", "Spring"], ["June", "Summer"], ["July", "Summer"],
["August", "Summer"], ["September", "Fall"], ["October", "Fall"],
["November", "Fall"], ["December", "Winter"]];

var gameYear = 2000;
var month = 2;
var money = 50;
var monthsInDebt = 0;

//Financial Data
var moneyEarnedInMonth = 0;
var leasePayment = -5;
var expenses = 0;

//Update the UI at the start
updateUI();

// Set Splash Text
var year = randomNumber(2000, 2018);
setTimeout(function (){ setText("splooshText", "Did you know? In " 
+ year + ", the crop with the highest yield was " + 
getBiggestYield(randomNumber(2000, 2018)).name + " with " + 
getBiggestYield(year).c_yield + " " + getBiggestYield(year).name + 
"s harvested!"); }, 20);

//switch screens
onEvent("playButton", "click", function(){
  setScreen("farmScreen");
  displayAlert("Welcome to F.A.R.M. soldier! Get planting, harvesting," + 
  " don't go into debt, and you will have a good time here. Bye now! " +
  "\n\n- General Korov", "WELCOME", "Begin", "1");
});

//close popup
onEvent("popUpButton1", "click", function(){
  closeAlert(1);
});


//put border on selected seed packet
{
onEvent("purplePotatoSeeds", "click", function(){
  pickSeeds("purple");
});

onEvent("redPotatoSeeds", "click", function(){
  pickSeeds("red");
});

onEvent("yellowPotatoSeeds", "click", function(){
  pickSeeds("yellow");
});
}

//plant and harvest seeds
{
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
}

//advance days
onEvent("advanceDay", "click", function(){
  setScreen("sleepScreen");
  displayFinancialInfo();
});

//start the month + events
onEvent("startMonth", "click", function(){
  //Set screen and time
  setScreen("farmScreen");
  month++;
    
  if(month > 11){
    month = 0;
    gameYear++;
  }
    
  //reset money earned and pay lease
  moneyEarnedInMonth = 0;
  expenses = 0;
  money += leasePayment;
  
  //Update all the crops
  for(var i = 0; i < crops.length; i++){
    if(crops[i].planted == true){
      crops[i].stage += 1;
      
      var randomEffect = randomNumber(1,3);
      
      if((months[month][1] == "Spring" || months[month][1] == "Summer")
      && randomEffect == 1){
        crops[i].stage += 1;
      }
      
      if(crops[i].stage > 5){
        crops[i].stage = 5;
      }
    }
    
    if(crops[i].planted == true && crops[i].stage < 5){
      setProperty("tile" + (i+1), "image", "dirt_tile_"
      + (crops[i].stage) + "_"
      + crops[i].variation + ".png");
    }else if(crops[i].planted == true && crops[i].stage == 5){
      setProperty("tile" + (i+1), "image", crops[i].type + "_potato_grown_"
      + crops[i].variation + ".png");
    }
  }
  
  var potatoType;
  
  if(money < 0){
    //Debt based alerts
    monthsInDebt++;
    if(monthsInDebt == 1){
      displayAlert("Soldier, your lease is " + monthsInDebt + " month overdue! " +
      "You have " + (5-monthsInDebt) + " months to pay up before we sieze our" +
      " property. You have been warned. \n\n- General Korov", "WARNING", "Okay...", "1");
    }else if (monthsInDebt == 5){
      displayAlert("Hello there soldier. We were not kidding when we " + 
      "said we were going to seize your property if you couldn't pay. " + 
      "This is the end.\n\n- General Korov", "GOODBYE", "WAIT NO-", "1");
    }
  }else{
    monthsInDebt = 0;
    //Random event alerts
    var randomEvent = randomNumber(1, 100);
    
    if(randomEvent <= 3){
      potatoType = potatoColorPicker();
      
      //check if they have more than 0 potatoes
      if(inventory[potatoType + "Potato"] > 0){
        inventory[potatoType + "Potato"] = 0;
        
        displayAlert("Heyo Boss... I have news. Apparently a group of " +
        "\"elite\" terrorists known as the Black Hand decided to " +
        "steal all our " + potatoType + " potatoes...\n\n- Your Assistant",
        "THEFT", "oof", "1");
      }
    }else if(randomEvent <= 6){
      potatoType = potatoColorPicker();
      
      //check if they have more than 0 seeds
      if(inventory[potatoType + "Seeds"] > 0){
        inventory[potatoType + "Seeds"] = 0;
        
        displayAlert("Heya Boss... I have news. Soooo a group of " +
        "\"impressive\" renegades known as the White Hand decided to " +
        "steal all our " + potatoType + " seeds...\n\n- Your Assistant",
        "THEFT", "rip", "1");
      }
    }else if(randomEvent <= 9){
      var moneySpent = randomNumber(5, Math.round(money/2));
      money -= moneySpent;
      
      displayAlert("Remember our shed of gunpowder? Well um I " +
        "kinda blew it up. Uh yeah... it's costing us " + moneySpent + 
        " coins to fix this mess. \n\n- Your Assistant",
        "OOPS!", "bruh", 1);
    }else if(randomEvent <= 20 && months[month][1] == "Spring"){
      var moneyRaise = randomNumber(2, 7);
      leasePayment -= moneyRaise;
      
      displayAlert("Hello soldier. This is a notice that your lease will " +
        "be increasing by " + moneyRaise + 
        " coins and this is effective immediately. \n\n- General Korov",
        "LEASE", "Alright", 1);
    }else if(randomEvent <= 20 && months[month][1] == "Winter"){
      var chosenTile = randomNumber(0, 9);
      var counter = 0;
      while(crops[chosenTile].planted == false){
        chosenTile = randomNumber(0, 9);
        counter++;
        
        if(counter == 100){
          break;
        }
      }
      
      crops[chosenTile] = new Plant();
      setProperty("tile" + (chosenTile+1), "image", "dirt_tile_0_" 
      + randomNumber(1, 3) + ".png");
      
      if(counter != 100){
        displayAlert("So uhm, a flash freeze happened and " + 
      "one of our crops died. Yeah... unfortunate... \n\n- Your Assistant",
        "FREEZE", "damm", "1");
      }
    }
  }
  
  //update ui
  updateUI();
});

//reset the game
onEvent("gameOverButton", "click", function(){
  resetGame();
});

//function to randomly pick a potato color
function potatoColorPicker(){
  var potatoSelector = randomNumber(1,3);
      
  if(potatoSelector == 1){
    return "yellow";
  }else if(potatoSelector == 2){
      return "red";
  }else{
      return "purple";
  }
}

//function to set various UI components
function updateUI(){
  var time = months[month][0] + ", " + gameYear;
  setProperty("dayLabel", "text", time);
  setProperty("moneyLabel", "text", money);

  setProperty("yellowSeedCount", "text", "x" + inventory.yellowSeeds);
  setProperty("redSeedCount", "text", "x" + inventory.redSeeds);
  setProperty("purpleSeedCount", "text", "x" + inventory.purpleSeeds);
}

//function to pick seeds
function pickSeeds(color){
  if(getProperty(color + "PotatoSeeds", "border-width") != 3 &&
  inventory[color + "Seeds"] > 0){
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

// function to plant or harvest seeds
function checkAndSet(tile, seed) {
  //code for planting
  if(crops[tile-1].planted != true && chosenCrop != ""){
    var form = randomNumber(1, 3);
    setProperty("tile" + tile, "image", "dirt_tile_1_" + 
    form + ".png");
    
    crops[tile-1] = {
      "planted": true,
      "type": seed,
      "stage": 1,
      "variation": form
    };
    
    inventory[seed + "Seeds"]--;
    updateUI();
    
    if(inventory[seed + "Seeds"] == 0){
      setProperty(seed + "PotatoSeeds", "border-width", 0);
      chosenCrop = "";
    }
  }
  
  //code for harvesting
  if(crops[tile-1].stage == 5){
    setProperty("tile" + tile, "image", "dirt_tile_0_" 
    + randomNumber(1, 3) + ".png");
    
    //randomize crop harvest
    var harvest = 0;
    if(months[month][1] == "Spring"){
      harvest = Math.round(potatoYield * (randomNumber(80, 90)/100) / randomNumber(20000, 40000));
    } else if(months[month][1] == "Summer"){
      harvest = Math.round(potatoYield * (randomNumber(97, 105)/100) / randomNumber(20000, 40000));
    } else if(months[month][1] == "Fall"){
      harvest = Math.round(potatoYield * (randomNumber(115, 120)/100) / randomNumber(20000, 40000));
    } else {
      harvest = Math.round(potatoYield * (randomNumber(50, 70)/100) / randomNumber(20000, 40000));
    }
    
    inventory[crops[tile-1].type + "Potato"] += harvest;
    
    //show how many potatoes were earned
    setProperty("potatoesEarned", "hidden", false);
    setProperty("potatoesEarned", "text", "+" + harvest + " " + crops[tile-1].type + " potatoes");
    setTimeout(function(){
      setProperty("potatoesEarned", "hidden", true);
    }, 1500);
    
    //reset the tile
    crops[tile-1] = new Plant();
  }
}

// Function to set data on the ended month page
function displayFinancialInfo(){
  setProperty("coinsEarned", "text", moneyEarnedInMonth);
  setProperty("expensesPaid", "text", expenses);
  setProperty("leasePaid", "text", leasePayment);
  
  var profit = moneyEarnedInMonth + leasePayment + expenses;
  if(profit > 0){
    setProperty("coinsKept", "text-color", rgb(16, 197, 11));
  }else if (profit < 0){
    setProperty("coinsKept", "text-color", rgb(197, 11, 14));
  }else{
    setProperty("coinsKept", "text-color", rgb(255, 255, 255));
  }
  setProperty("coinsKept", "text", profit);
}

//function to reset data
function resetGame(){
  setScreen("homePage");
  gameYear = 2000;
  month = 2;
  money = 0;
  monthsInDebt = 0;
  
  //Financial Data
  moneyEarnedInMonth = 0;
  expenses = 0;
  leasePayment = -5;
  chosenCrop = "";
  crops = [
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
    new Plant(),
  ];
  potatoYield = 0;
}

// Display an alert function
// alertNum represents which alert it is in the design so the function
// can be reused and is not screen specific
function displayAlert(body, title, button, alertNum){
  //Make elemnts visible again
  setProperty("popUpTitle" + alertNum, "hidden", false);
  setProperty("popUpBodyBackdrop" + alertNum, "hidden", false);
  setProperty("popUpBodyText" + alertNum, "hidden", false);
  setProperty("popUpButton" + alertNum, "hidden", false);
  setProperty("popUpBackdrop" + alertNum, "hidden", false);
  
  setProperty("popUpTitle" + alertNum, "text", title);
  setProperty("popUpBodyText" + alertNum, "text", body);
  setProperty("popUpButton" + alertNum, "text", button);
}

// Close an alert function
function closeAlert(alertNum){
  //Make elemnts visible again
  setProperty("popUpTitle" + alertNum, "hidden", true);
  setProperty("popUpBodyBackdrop" + alertNum, "hidden", true);
  setProperty("popUpBodyText" + alertNum, "hidden", true);
  setProperty("popUpButton" + alertNum, "hidden", true);
  setProperty("popUpBackdrop" + alertNum, "hidden", true);
  
  if (monthsInDebt == 5){
    setScreen("gameOverScreen");
  }
}

// Sort data function
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
  
  //save potato yield for later use in harvesting
  if(plants[x] == "Potatoes"){
    potatoYield = plantYield[x];
  }
}
return biggestYield;
}


//market related code
onEvent("marketButton", "click", function(){
  setScreen("marketScreen");
  updateMarket();
});

onEvent("farmButton", "click", function(){
  setScreen("farmScreen");
  updateUI();
});

//on events for shoppity shop
{
onEvent("chest1", "click", function(){
  chestLogic(1);
  
});

onEvent("chest2", "click", function(){
  chestLogic(2);
});

onEvent("chest3", "click", function(){
  chestLogic(3);
});

onEvent("purpleSlider", "input", function(){
  updateMarket();
});

onEvent("yellowSlider", "input", function(){
  updateMarket();
});

onEvent("redSlider", "input", function(){
  updateMarket();
});

onEvent("sellButton", "click", function(){
  money+=(getProperty("purpleSlider", "value") * 10 + getProperty("yellowSlider", "value") * 3 + getProperty("redSlider", "value") * 5);
  moneyEarnedInMonth+=(getProperty("purpleSlider", "value") * 10 + getProperty("yellowSlider", "value") * 3 + getProperty("redSlider", "value") * 5); 

  inventory.purplePotato-=getProperty("purpleSlider", "value");
  inventory.redPotato-=getProperty("redSlider", "value");
  inventory.yellowPotato-=getProperty("yellowSlider", "value");
  updateMarket();
});

onEvent("buyButton", "click", function(){
  setProperty("purpleSeedAmount", "placeholder", "0");
  setProperty("yellowSeedAmount", "placeholder", "0");
  setProperty("redSeedAmount", "placeholder", "0");
  
  //display an alert if the user enters invalid values
  if(isNaN(getProperty("purpleSeedAmount", "placeholder")) || 
     isNaN(getProperty("yellowSeedAmount", "placeholder")) || 
     isNaN(getProperty("redSeedAmount", "placeholder"))){

    //displayAlert(1);

  } else{
    
    console.log(money);
    
    //buy seeeeeeeds (yotam's code sucked)
    buySeeds("yellow", 1);
    buySeeds("red", 3);
    buySeeds("purple", 5);

    //set back to zero
    setProperty("purpleSeedAmount", "text", "");
    setProperty("redSeedAmount", "text", "");
    setProperty("yellowSeedAmount", "text", "");
  }
});
}

//function to reduce repeat code in buying seeds
function buySeeds(color, cost){
  if(!isNaN(getNumber(color + "SeedAmount"))){
      if(money >= getNumber(color + "SeedAmount")*cost){
        money-=getNumber(color + "SeedAmount")*cost;
        expenses-=getNumber(color + "SeedAmount")*cost; 
        inventory[color + "seeds"]+=getNumber(color + "SeedAmount");
    }
  }
}

function updateMarket(){
  setProperty("purpleSlider", "max", inventory.purplePotato);
  setProperty("yellowSlider", "max", inventory.yellowPotato);
  setProperty("redSlider", "max", inventory.redPotato);
  
  setProperty("purpleAmount", "text", "Sell " + getProperty("purpleSlider", "value") + " purple potatoes at " + getProperty("purpleSlider", "value") * 10 + "$");
  setProperty("yellowAmount", "text", "Sell " + getProperty("yellowSlider", "value") + " yellow potatoes at " + getProperty("yellowSlider", "value") * 3 + "$");
  setProperty("redAmount", "text", "Sell " + getProperty("redSlider", "value") + " red potatoes at " + getProperty("redSlider", "value") * 5 + "$");
  setProperty("estimatedProfit", "text", "x" + (getProperty("purpleSlider", "value") * 10 + getProperty("yellowSlider", "value") * 3 + getProperty("redSlider", "value") * 5));
}


//function to open and close chests accordingly
var chestState = 0;
function chestLogic(chestNum){
  if(chestState == 0){
    setProperty("chest" + chestNum, "image", "resized_closed_chest.png"); 
    chestState = 1;
    
    if(chestNum == 1){
      setProperty("coinPic", "hidden", false);
      setProperty("purpleSlider", "hidden", false);
      setProperty("redSlider", "hidden", false);
      setProperty("yellowSlider", "hidden", false);
      setProperty("redAmount", "hidden", false);
      setProperty("yellowAmount", "hidden", false);
      setProperty("purpleAmount", "hidden", false);
      setProperty("estimatedProfit", "hidden", false);
      setProperty("sellButton", "hidden", false);

    } else if(chestNum == 2){
      setProperty("buyButton", "hidden", false);
      setProperty("pSeedPacket", "hidden", false);
      setProperty("ySeedPacket", "hidden", false);
      setProperty("rSeedPacket", "hidden", false);
      setProperty("purpleSeedAmount", "hidden", false);
      setProperty("yellowSeedAmount", "hidden", false);
      setProperty("redSeedAmount", "hidden", false);
      setProperty("purpleCost", "hidden", false);
      setProperty("yellowCost", "hidden", false);
      setProperty("redCost", "hidden", false);
      
    }
  } else{
    setProperty("chest" + chestNum, "image", "resized_chest.png"); 
    chestState = 0;
    if(chestNum == 1){
      setProperty("coinPic", "hidden", true);
      setProperty("purpleSlider", "hidden",true);
      setProperty("redSlider", "hidden", true);
      setProperty("yellowSlider", "hidden", true);
      setProperty("redAmount", "hidden", true);
      setProperty("yellowAmount", "hidden", true);
      setProperty("purpleAmount", "hidden", true);
      setProperty("estimatedProfit", "hidden", true);
      setProperty("sellButton", "hidden", true);

    }else if(chestNum == 2){
      setProperty("buyButton", "hidden", true);
      setProperty("pSeedPacket", "hidden", true);
      setProperty("ySeedPacket", "hidden", true);
      setProperty("rSeedPacket", "hidden", true);
      setProperty("purpleSeedAmount", "hidden", true);
      setProperty("yellowSeedAmount", "hidden", true);
      setProperty("redSeedAmount", "hidden", true);
      setProperty("purpleCost", "hidden", true);
      setProperty("yellowCost", "hidden", true);
      setProperty("redCost", "hidden", true);
      
    }
  }
}
