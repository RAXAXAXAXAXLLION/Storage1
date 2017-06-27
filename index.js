
app=require('express')()
THREE=require('three-js')()
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('port',(process.env.PORT||5000))
app.use(require('express').static(__dirname+'/public'))
app.get('*',function(req,res){res.sendfile(__dirname+'/public/index.html')})
app.listen(app.get('port'),function(){console.log('Node app is running on port',app.get('port'))})
require("socket.io").listen(require('http').createServer(app)).on('connection',function(socket){socket.id=Math.random()
all.player[socket.id]={
x:0,y:0,z:-4890,xs:0,ys:0,zs:0,hp:10,fire:0,
camera:new THREE.PerspectiveCamera(45,1,0.1,1000),
light:new THREE.PointLight("rgb(255,205,155)",1,0),
renderer:new THREE.CanvasRenderer({canvas:require("canvas")(socket.width,socket.height)}),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshLambertMaterial({color:"rgb(255,205,155)"}))}
socket.on('c',function(e){
all.player[socket.id].camera.aspect=e.width/e.height
all.player[socket.id].camera.updateProjectionMatrix()
all.player[socket.id].renderer.setSize(e.width,e.height)
all.player[socket.id].renderer.render(scene,all.player[socket.id].camera)})
socket.on('37',function(){if(0<all.player[socket.id].hp){all.player[socket.id].xs-=0.00002}})
socket.on('38',function(){if(0<all.player[socket.id].hp){all.player[socket.id].ys+=0.00002}})
socket.on('39',function(){if(0<all.player[socket.id].hp){all.player[socket.id].xs+=0.00002}})
socket.on('40',function(){if(0<all.player[socket.id].hp){all.player[socket.id].ys-=0.00002}})
setInterval(function(){socket.emit('output',{id:socket.id})},20)
})
setInterval(function(){
for(i1 in all.player){
all.player[i1].x+=all.player[i1].xs
all.player[i1].y+=all.player[i1].ys
all.player[i1].z+=all.player[i1].zs
all.player[i1].camera.position.set(all.player[i1].x,all.player[i1].y,all.player[i1].z)
all.player[i1].light.position.set(all.player[i1].x,all.player[i1].y,all.player[i1].z)
all.player[i1].form.position.set(all.player[i1].x,all.player[i1].y,all.player[i1].z)
if(all.player[i1].fire==1){if(0<all.player[i1].hp){all.player[i1].hp-=0.01}}
for(i2 in all.player){if(i1==i2){}else{
if(all.player[i1].x-2<all.player[i2].x+2){if(all.player[i1].x+2>all.player[i2].x-2){
if(all.player[i1].y-2<all.player[i2].y+2){if(all.player[i1].y+2>all.player[i2].y-2){
if(all.player[i1].z-2<all.player[i2].z+2){if(all.player[i1].z+2>all.player[i2].z-2){
if(0>(all.player[i1].xs*(all.player[i1].x-all.player[i2].x)+
all.player[i1].ys*(all.player[i1].y-all.player[i2].y)+
all.player[i1].zs*(all.player[i1].z-all.player[i2].z))/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),1))){
all.player[i1].xs+=0.005*(all.player[i1].x-all.player[i2].x)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
all.player[i1].ys+=0.005*(all.player[i1].y-all.player[i2].y)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
all.player[i1].zs+=0.005*(all.player[i1].z-all.player[i2].z)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
}else{
all.player[i1].xs+=0.0001*(all.player[i1].x-all.player[i2].x)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
all.player[i1].ys+=0.0001*(all.player[i1].y-all.player[i2].y)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
all.player[i1].zs+=0.0001*(all.player[i1].z-all.player[i2].z)/(Math.pow(
(all.player[i1].x-all.player[i2].x)*(all.player[i1].x-all.player[i2].x)+
(all.player[i1].y-all.player[i2].y)*(all.player[i1].y-all.player[i2].y)+
(all.player[i1].z-all.player[i2].z)*(all.player[i1].z-all.player[i2].z),3/2))
}
}}}}}}
}
}
for(i2 in all.stone){
if(all.player[i1].x-2<all.stone[i2].x+0.5){if(all.player[i1].x+2>all.stone[i2].x-0.5){
if(all.player[i1].y-2<all.stone[i2].y+0.5){if(all.player[i1].y+2>all.stone[i2].y-0.5){
if(all.player[i1].z-2<all.stone[i2].z+0.5){if(all.player[i1].z+2>all.stone[i2].z-0.5){
if(0>(all.player[i1].xs*(all.player[i1].x-all.stone[i2].x)+
all.player[i1].ys*(all.player[i1].y-all.stone[i2].y)+
all.player[i1].zs*(all.player[i1].z-all.stone[i2].z))/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),1))){
all.player[i1].xs+=0.005*(all.player[i1].x-all.stone[i2].x)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
all.player[i1].ys+=0.005*(all.player[i1].y-all.stone[i2].y)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
all.player[i1].zs+=0.005*(all.player[i1].z-all.stone[i2].z)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
}else{
all.player[i1].xs+=0.0001*(all.player[i1].x-all.stone[i2].x)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
all.player[i1].ys+=0.0001*(all.player[i1].y-all.stone[i2].y)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
all.player[i1].zs+=0.0001*(all.player[i1].z-all.stone[i2].z)/(Math.pow(
(all.player[i1].x-all.stone[i2].x)*(all.player[i1].x-all.stone[i2].x)+
(all.player[i1].y-all.stone[i2].y)*(all.player[i1].y-all.stone[i2].y)+
(all.player[i1].z-all.stone[i2].z)*(all.player[i1].z-all.stone[i2].z),3/2))
}
}}}}}}
}
for(i2 in all.limestone){
if(all.player[i1].x-2<all.limestone[i2].x+0.5){if(all.player[i1].x+2>all.limestone[i2].x-0.5){
if(all.player[i1].y-2<all.limestone[i2].y+0.5){if(all.player[i1].y+2>all.limestone[i2].y-0.5){
if(all.player[i1].z-2<all.limestone[i2].z+0.5){if(all.player[i1].z+2>all.limestone[i2].z-0.5){
if(0>(all.player[i1].xs*(all.player[i1].x-all.limestone[i2].x)+
all.player[i1].ys*(all.player[i1].y-all.limestone[i2].y)+
all.player[i1].zs*(all.player[i1].z-all.limestone[i2].z))/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),1))){
all.player[i1].xs+=0.005*(all.player[i1].x-all.limestone[i2].x)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
all.player[i1].ys+=0.005*(all.player[i1].y-all.limestone[i2].y)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
all.player[i1].zs+=0.005*(all.player[i1].z-all.limestone[i2].z)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
}else{
all.player[i1].xs+=0.0001*(all.player[i1].x-all.limestone[i2].x)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
all.player[i1].ys+=0.0001*(all.player[i1].y-all.limestone[i2].y)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
all.player[i1].zs+=0.0001*(all.player[i1].z-all.limestone[i2].z)/(Math.pow(
(all.player[i1].x-all.limestone[i2].x)*(all.player[i1].x-all.limestone[i2].x)+
(all.player[i1].y-all.limestone[i2].y)*(all.player[i1].y-all.limestone[i2].y)+
(all.player[i1].z-all.limestone[i2].z)*(all.player[i1].z-all.limestone[i2].z),3/2))
}
}}}}}}
}
for(i2 in all.sun){
if(all.player[i1].x-2<all.sun[i2].x+0.5){if(all.player[i1].x+2>all.sun[i2].x-0.5){
if(all.player[i1].y-2<all.sun[i2].y+0.5){if(all.player[i1].y+2>all.sun[i2].y-0.5){
if(all.player[i1].z-2<all.sun[i2].z+0.5){if(all.player[i1].z+2>all.sun[i2].z-0.5){
if(0<all.player[i1].hp){all.player[i1].hp-=0.1;all.player[i1].fire=1}
all.player[i1].xs=all.player[i1].xs*39/40
all.player[i1].ys=all.player[i1].ys*39/40
all.player[i1].zs=all.player[i1].zs*39/40
}}}}}}
if(0.5<Math.pow(
(all.player[i1].x-all.sun[i2].x)*(all.player[i1].x-all.sun[i2].x)+
(all.player[i1].y-all.sun[i2].y)*(all.player[i1].y-all.sun[i2].y)+
(all.player[i1].z-all.sun[i2].z)*(all.player[i1].z-all.sun[i2].z),1/2)){
all.player[i1].xs-=0.001*(all.player[i1].x-all.sun[i2].x)/(Math.pow(
(all.player[i1].x-all.sun[i2].x)*(all.player[i1].x-all.sun[i2].x)+
(all.player[i1].y-all.sun[i2].y)*(all.player[i1].y-all.sun[i2].y)+
(all.player[i1].z-all.sun[i2].z)*(all.player[i1].z-all.sun[i2].z),3/2))
all.player[i1].ys-=0.001*(all.player[i1].y-all.sun[i2].y)/(Math.pow(
(all.player[i1].x-all.sun[i2].x)*(all.player[i1].x-all.sun[i2].x)+
(all.player[i1].y-all.sun[i2].y)*(all.player[i1].y-all.sun[i2].y)+
(all.player[i1].z-all.sun[i2].z)*(all.player[i1].z-all.sun[i2].z),3/2))
all.player[i1].zs-=0.001*(all.player[i1].z-all.sun[i2].z)/(Math.pow(
(all.player[i1].x-all.sun[i2].x)*(all.player[i1].x-all.sun[i2].x)+
(all.player[i1].y-all.sun[i2].y)*(all.player[i1].y-all.sun[i2].y)+
(all.player[i1].z-all.sun[i2].z)*(all.player[i1].z-all.sun[i2].z),3/2))
}
}
for(i2 in all.magma){
if(all.player[i1].x-2<all.magma[i2].x+0.5){if(all.player[i1].x+2>all.magma[i2].x-0.5){
if(all.player[i1].y-2<all.magma[i2].y+0.5){if(all.player[i1].y+2>all.magma[i2].y-0.5){
if(all.player[i1].z-2<all.magma[i2].z+0.5){if(all.player[i1].z+2>all.magma[i2].z-0.5){
if(0<all.player[i1].hp){all.player[i1].hp-=0.1;all.player[i1].fire=1}
all.player[i1].xs=all.player[i1].xs*39/40
all.player[i1].ys=all.player[i1].ys*39/40
all.player[i1].zs=all.player[i1].zs*39/40
}}}}}}
}
for(i2 in all.plasma){
if(all.player[i1].x-2<all.plasma[i2].x+0.5){if(all.player[i1].x+2>all.plasma[i2].x-0.5){
if(all.player[i1].y-2<all.plasma[i2].y+0.5){if(all.player[i1].y+2>all.plasma[i2].y-0.5){
if(all.player[i1].z-2<all.plasma[i2].z+0.5){if(all.player[i1].z+2>all.plasma[i2].z-0.5){
if(0<all.player[i1].hp){all.player[i1].hp-=0.1;all.player[i1].fire=1}
all.player[i1].xs=all.player[i1].xs*39/40
all.player[i1].ys=all.player[i1].ys*39/40
all.player[i1].zs=all.player[i1].zs*39/40
}}}}}}
}
}
for(i in all.stone){
all.stone[i].light.position.set(all.stone[i].x,all.stone[i].y,all.stone[i].z)
all.stone[i].form.position.set(all.stone[i].x,all.stone[i].y,all.stone[i].z)
all.stone[i].x+=all.stone[i].xs
all.stone[i].y+=all.stone[i].ys
all.stone[i].z+=all.stone[i].zs
}
for(i in all.limestone){
all.limestone[i].light.position.set(all.limestone[i].x,all.limestone[i].y,all.limestone[i].z)
all.limestone[i].form.position.set(all.limestone[i].x,all.limestone[i].y,all.limestone[i].z)
all.limestone[i].x+=all.limestone[i].xs
all.limestone[i].y+=all.limestone[i].ys
all.limestone[i].z+=all.limestone[i].zs
}
for(i in all.magma){
all.magma[i].light.position.set(all.magma[i].x,all.magma[i].y,all.magma[i].z)
all.magma[i].form.position.set(all.magma[i].x,all.magma[i].y,all.magma[i].z)
all.magma[i].x+=all.magma[i].xs
all.magma[i].y+=all.magma[i].ys
all.magma[i].z+=all.magma[i].zs
}
for(i in all.sun){
all.sun[i].light.position.set(all.sun[i].x,all.sun[i].y,all.sun[i].z)
all.sun[i].form.position.set(all.sun[i].x,all.sun[i].y,all.sun[i].z)
all.sun[i].x+=all.sun[i].xs
all.sun[i].y+=all.sun[i].ys
all.sun[i].z+=all.sun[i].zs
}
for(i in all.plasma){
all.plasma[i].light.position.set(all.plasma[i].x,all.plasma[i].y,all.plasma[i].z)
all.plasma[i].form.position.set(all.plasma[i].x,all.plasma[i].y,all.plasma[i].z)
all.plasma[i].x+=all.plasma[i].xs
all.plasma[i].y+=all.plasma[i].ys
all.plasma[i].z+=all.plasma[i].zs
}
},1)
all={player:{},limestone:{},stone:{},magma:{},plasma:{},sun:{},scene:new THREE.Scene()}
g=(obj,x,y,z)=>{
if(obj=="limestone"){
all.limestone[Math.random()]={x:x,y:y,z:z,xs:0,ys:0,zs:0,
light:new THREE.PointLight("rgb(200,200,200)",1,0),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshLambertMaterial({color:"rgb(200,200,200)"}))}}
if(obj=="stone"){
all.stone[Math.random()]={x:x,y:y,z:z,xs:0,ys:0,zs:0,
light:new THREE.PointLight("rgb(100,100,100)",1,0),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshLambertMaterial({color:"rgb(100,100,100)"}))}}
if(obj=="magma"){
all.magma[Math.random()]={x:x,y:y,z:z,xs:0,ys:0,zs:0,
light:new THREE.PointLight("rgb(255,0,0)",1,5),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshLambertMaterial({color:"rgb(255,0,0)"}))}}
if(obj=="plasma"){
all.plasma[Math.random()]={x:x,y:y,z:z,xs:0,ys:0,zs:0,
light:new THREE.PointLight("rgb(250,250,100)",1,10000),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"}))}}
if(obj=="sun"){
all.sun[Math.random()]={x:x,y:y,z:z,xs:0,ys:0,zs:0,
light:new THREE.PointLight("rgb(250,250,250)",1,10000),
form:new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"}))}}
}
gen=(e,x,y,z)=>{if(e=="system"){
console.log("Generating an star.")
g("sun",x,y,z)
gen("planet",x,y,z-5000)
for(gx=0.5;gx<1000;gx++){
for(gy=0.5;gy<1000;gy++){
for(gz=0.5;gz<1000;gz++){
if(1<gx*gx+gy*gy+gz*gz){
if(gx*gx+gy*gy+gz*gz<1000*1000){
g("plasma",x+gx,y+gy,z+gz)
g("plasma",x-gx,y+gy,z+gz)
g("plasma",x+gx,y-gy,z+gz)
g("plasma",x-gx,y-gy,z+gz)
g("plasma",x+gx,y+gy,z-gz)
g("plasma",x-gx,y+gy,z-gz)
g("plasma",x+gx,y-gy,z-gz)
g("plasma",x-gx,y-gy,z-gz)
}}}}}}
if(e=="planet"){
console.log("Generating a planet.")
g("sun",x,y,z)
for(gx=0.5;gx<1000;gx++){
for(gy=0.5;gy<1000;gy++){
for(gz=0.5;gz<1000;gz++){
if(1<gx*gx+gy*gy+gz*gz){
if(gx*gx+gy*gy+gz*gz<90*90){
g("magma",x+gx,y+gy,z+gz)
g("magma",x-gx,y+gy,z+gz)
g("magma",x+gx,y-gy,z+gz)
g("magma",x-gx,y-gy,z+gz)
g("magma",x+gx,y+gy,z-gz)
g("magma",x-gx,y+gy,z-gz)
g("magma",x+gx,y-gy,z-gz)
g("magma",x-gx,y-gy,z-gz)
}else{if(gx*gx+gy*gy+gz*gz<100*100){
g("stone",x+gx,y+gy,z+gz)
g("stone",x-gx,y+gy,z+gz)
g("stone",x+gx,y-gy,z+gz)
g("stone",x-gx,y-gy,z+gz)
g("stone",x+gx,y+gy,z-gz)
g("stone",x-gx,y+gy,z-gz)
g("stone",x+gx,y-gy,z-gz)
g("stone",x-gx,y-gy,z-gz)
}}}}}}}}
gen("system",0,0,0)
