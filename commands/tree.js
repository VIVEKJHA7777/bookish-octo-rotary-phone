//tree function
let fs=require("fs");
let path= require("path");
function treefn(dirpath){
    let destpath;
     if(dirpath==undefined ){
        treehelper(process.cwd(),"");
        return;
     }
     else{
       let doesexist=fs.existsSync(dirpath);
       if(doesexist){
           treehelper(dirpath,"");
        
        }
       else{
        console.log("kindly enter the path")
        return;
       }
     }

}
function treehelper(dirpath,indent){
  //isfile or folder
  let isfile=fs.lstatSync(dirpath).isFile();
  if(isfile==true){
    let filename=path.basename(dirpath);
    console.log(indent+"|------"+filename);
  }
  else{
    let dirname = path.basename(dirpath)
    console.log(indent+"|_______"+dirname);
    let children=fs.readdirSync(dirpath);
    for(let i=0;i<children.length;i++){
       let childrenpath= path.join(dirpath,children[i]);
        treehelper(childrenpath,indent+"\t");
    }

  }
}

module.exports={
    treekey:treefn
}