var date1=new Date();
var seconds=0;
var playerX=100;
var playerY=71;
var playerZ=100;
var yes = true
register('PlayerInteract', () => {
  if(Player.getHeldItem().getID() == 346){
    date1=new Date(); 
  }
});

register("renderWorld", myWorldRender);

function updateTimer() {
  var entities=World.getAllEntitiesOfType(Java.type("net.minecraft.entity.projectile.EntityFishHook"))
  entities.forEach((entity) => {
    if(entity.getEntity().field_146042_b==Player.getPlayer()){
      console.log(entity.x);
      playerX=entity.x;
      playerY=entity.y+1;
      playerZ=entity.z;
    }
  })
  if(entities.length==0){
    yes=false;
  }
  else{
    yes=true;
  }
}

function myWorldRender() {
  updateTimer()
  //yes is 1 or 2 after the bobber is thrown for the 1st time
  //yes is 3 or 4 after bobber is thrown for the 2nd time
  if(yes){  
    Tessellator.drawString(Math.abs(new Date() - date1) / 1000, playerX, playerY, playerZ);
  }
}
