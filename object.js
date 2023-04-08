let id;
let name;
let role;
function student(id,name,role){
    this.id=id;
    this.name=name;
    this.role=role;
}
let obj1=new student(1,"gursevak","software developer");
let obj2=new student(2,"vikram","web developer");

console.log(obj1.name);
