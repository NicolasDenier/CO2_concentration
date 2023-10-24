let camera;
let camx = 600;
let camz = 800;

function setup() {
  pixelDensity(4.166);
  let canvas = createCanvas(1000, 1000, WEBGL);
  camera = createCamera();
  camera.camera(camx,0,camz);
  //perspective(PI/2);
}

function CO2(r=100, tr={x:0,y:0,z:0}, rot={x:0,y:0,z:0}){
  let k=r/100;
  let ratio_c_o = 140/150;
  camx = camera.eyeX;
  camz = camera.eyeZ;
  //console.log(camera.eyeX + ',' + camera.eyeY + ',' + camera.eyeZ);
  translate(tr.x, tr.y, tr.z);
  rotateX(rot.x);
  rotateY(rot.y);
  rotateZ(rot.z);
  
  ambientMaterial(50, 50, 50);
  sphere(r);
  ambientMaterial(250, 10, 10);
  translate(3*r,0,0);
  sphere(r*ratio_c_o);
  translate(-6*r,0,0);
  sphere(r*ratio_c_o);
  translate(3*r,0,0);
  
  rotateZ(PI/2);
  //rotateX(-PI/3);
  translate(-20*k, 0,0);
  cylinder(15*k, 5*r);
  
  translate(40*k, 0,0);
  cylinder(15*k, 5*r);
  translate(-20*k, 0,0);
  
  // remove rotations and translations FILO order
  rotateZ(-PI/2);
  rotateZ(-rot.z);
  rotateY(-rot.y);
  rotateX(-rot.x);
  translate(-tr.x, -tr.y, -tr.z);
}

function draw() {
  orbitControl();
  background(158, 132, 209);
  ambientLight(100,100,100); 
  pointLight(158, 132, 209, 700, -250, 200);
  noStroke();
  
  CO2();
  //CO2(r=50, tr={x:-500,y:-300,z:-250}, rot={x:1.3,y:0.5,z:1.8});
  
  // background circles
  
  let a = acos(camz/sqrt(sq(camx)+sq(camz)));
  let d = cos(a)*300;
  let ratio_1_2 = 1.2149608305017212;
  let ratio_1_3 = 1.419730819227875;
  let circle_radius = 220;
  ambientMaterial(255, 255, 255);
  rotateY(a); // camera plane
  translate(0,500,-300);
  
  circle(-d*1.11, 0, circle_radius);
  circle(0, 0, circle_radius*ratio_1_2);
  circle(d*1.61, 0, circle_radius*ratio_1_3);

}

function keyTyped() {
  if (key == 's') {
    saveCanvas(canvas, 'CO2', 'png');
  }
}


