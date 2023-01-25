let fs=require("fs");
let path=require("path");

let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
     app:['exe','dmg','pkg','deb']
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

module.exports={
    organisekey:organisefn

}