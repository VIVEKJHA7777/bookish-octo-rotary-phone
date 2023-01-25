// taking input from command line
let fs=require("fs")
let path=require("path")
let helpobj=require("./commands/help")
let treeobj=require("./commands/tree")
let organiseobj=require("./commands/organise")
//for taking input from command line give input in form of array
let inputarr=process.argv.slice(2);
console.log(inputarr)
// node main.js tree "directorypath"
//node main.js organise "directorypath"
//node main.js help
let command = inputarr[0];
let types = {
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
     app:['exe','dmg','pkg','deb']
}
switch(command){
    case "tree":
        treeobj.treekey(inputarr[1]);
       // treefn(inputarr[1])
        break;
    case "organise":
        organiseobj.organisekey(inputarr[1]);
        //organisefn(inputarr[1])
        break;
    case "help":
        helpobj.helpkey();  
        //helpfn()
        break;
    default:
        console.log("please 😊 input right command");
        break;  
}
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
function organisefn(dirpath){
    console.log("organise command implemented for", dirpath);
    let destpath;
    //1. input->dirrectory path given
    //in javascript in dirpath is not given then it will give undefined 
     if(dirpath==undefined ){
        destpath=process.cwd();
        return;
     }
     else{
       let doesexist=fs.existsSync(dirpath);
       if(doesexist){
        //2. create ->organised_files ->directory
         destpath= path.join(dirpath,"organisedfiles");
        if(fs.existsSync(destpath)==false){ 
             fs.mkdirSync(destpath);
        }
       }
       else{
        console.log("kindly enter the path")
        return;
       }
     }
    organizehelper(dirpath,destpath)
    
    
    
   
}

function sendfiles(srcfilepath,dest,category){

    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
    }
    let filename= path.basename(srcfilepath);
    let destfilepath = path.join(categorypath,filename);
    fs.copyFileSync(srcfilepath,destfilepath);
    fs.unlinkSync(srcfilepath);
    console.log(filename,"copied to",category)
}
function organizehelper(src,dest){
//3. identify category of all the files present in that input directory
 let childnames=fs.readdirSync(src)   
 for (let i=0;i<childnames.length;i++){
 let childaddress = path.join(src,childnames[i]);
 let isfile= fs.lstatSync(childaddress).isFile(); 
 if(isfile){
    //console.log(childnames[i]);
    let category = getcategory(childnames[i])
    console.log(childnames[i],"belongs to ---->", category);
     //4. copy/cut files to that organised directory inside of any of category folder
     sendfiles(childaddress,dest,category);
 } 
 }
}
function getcategory(name){
    let ext = path.extname(name);
    console.log(ext);
    //from ext i have to remove dot
    ext=ext.slice(1);
    for(let type in types){
        let ctypearray= types[type];
        for(let i=0;i<ctypearray.length;i++){
            if(ext==ctypearray[i]){
                return type;
            }
        }
    }
    return "others";

}



//help implemented
function helpfn(){
    console.log(` 
    list of all the commands: 
                node main.js tree "directorypath"
                node main.js organise "directorypath"
    `);
}
 