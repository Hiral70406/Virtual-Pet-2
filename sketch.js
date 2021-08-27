//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;


function preload()
{
  dogImg=loadImage('images/dogImg.png');
  happyDog=loadImage('images/dogImg1.png');
	//load images here
}

function setup() {
  database=firebase.database()
 console.log(database);

createCanvas(1000, 400);

foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg)
  dog.scale=0.3  
  
  foodStock=database.ref('Food');
  console.log(" foodStock",foodStock);
  foodStock.on("value",readStock);
  
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  //addFood.mousePressed(addFoods);
  }


function draw() {  
background(46,139,87)

foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

    fill("blue")
    textSize(25);

    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + "PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed: 12 AM", 350,30);
    }else{
      text("Last Feed: "+ lastFed + "AM", 350,30);
    }

    drawSprites();
    //text ("Food Stock  " + foodS, 170,400);
    
    //textSize(13);
    //text("Press UP ARROW to feed", 60,10, 320, 50); 

    
 //add styles here
}

//function to read foodStock
function readStock(data){
  console.log("data",data);
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }

//function to update foodStock and lastfed time.
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
  })
}

//function to add foodstock.
//function addFoods(){
  //foodS++;
 // database.ref('/').update({
    //Food:foodS
  //})
//}




  //function writeStock(x){

    //if(x<=0){
     // x=0
    //}
    //else {
    //x=x-1
    //}

    //database.ref('/').update({
   //   Food:x
    //})
  //}



