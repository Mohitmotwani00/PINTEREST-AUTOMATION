//    bbjgxsp018@mailnd7.com
// "bbjgxsp018@mailnd7.com",
let puppeteer = require("puppeteer");
let fs = require("fs");
let allimages;
// let fileToUpload = 'ProfileImage.jpg';
let credentialsFile = process.argv[2];
let boardName = Date.now().toString() ;
console.log(boardName);
let ToSearch= process.argv[3];
let Category=process.argv[4];
let TOLIKENDSAVE =process.argv[5];
let CommentWord=process.argv[6];
let TREND=process.argv[7];

let friends=["tovaw75479@unomail9.com","laronif606@psk3n.com","gggg@mailnd7.com"];
let Messages=["hey bro","all well??","okkkkkkk "];
let ProfileInfo=["MOHIT","MOTWANI","MM","MUSIC LOVER","DELHI-110085"];

(async function () {
    
    try{ 

        let data = await fs.promises.readFile(credentialsFile, "utf-8");
        let credentials = JSON.parse(data);
        let login = credentials.login;
        let email = credentials.email;
        let pwd = credentials.pwd;
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--icognito", "--disable-notifications"]
        });
        let numberOfPages = await browser.pages();
        let tab = numberOfPages[0];
    
   
        await Login(tab,login,email,pwd);
        
        await follow(tab) ;   

        await UpdateProfile(tab);

        await sendMsgFunction(tab);
        
        await BoardCreated(tab);
        
        await SrchSlctCtgry(tab);  
        
       await HandleAllImages(tab);

    }catch(err){
        console.log(err.message);
    }

})();
async function Login(tab,login,email,pwd){
    try{
        
        
    
        await tab.goto(login, {
            waitUntil: "networkidle2"
        });
    
            await tab.waitForSelector("input[autocomplete='username']")
            await tab.type( "input[autocomplete='username']",email,{delay:200});
        
            await tab.waitForSelector("#password");
            await tab.type( "#password",pwd,{delay:300});
        
            await tab.waitForSelector("button.red.SignupButton.active ");
            await tab.click("button.red.SignupButton.active");
            console.log("user logged in");
             


    }catch(err){
        console.log(err.message);
    }
}
async function follow(tab ){
    
    try{

        await tab.waitForSelector("div[data-test-id='following-feed-tab']",{visible:true}) ;
        await navigationHelper(tab,"div[data-test-id='following-feed-tab']") ;

        // await tab.waitForSelector("button.RCK.Hsu.USg.Vxj.aZc.Zr3.hA-.GmH.adn.Il7.Jrn.hNT.iyn.BG7.gn8.L4E.kVc") ;
        // await navigationHelper(tab,"button.RCK.Hsu.USg.Vxj.aZc.Zr3.hA-.GmH.adn.Il7.Jrn.hNT.iyn.BG7.gn8.L4E.kVc") ;
        console.log("hee")
        await tab.waitFor(200);

        let done=0;
        await tab.waitForSelector(".rLK.iyn.DI9.BG7.Lfz.FTD.L4E .tBJ.dyH.iFc.MF7.B9u.DrD.IZT.mWe",{visible:true}) ;
        let arr = await tab.$$(".rLK.iyn.DI9.BG7.Lfz.FTD.L4E .tBJ.dyH.iFc.MF7.B9u.DrD.IZT.mWe " ) ;
        console.log(arr.length);
        for(let i=0;i<arr.length;i++){
           let val=await tab.evaluate(function(ele){
            return ele.textContent;
           },arr[i]);
           console.log(val);
           if(val.includes(TREND)){
               done=1;
               await arr[i].click();
               break;
           }

        }
        
         if(done==0){
           await arr[arr.length-1].click(); 
           await tab.waitForSelector(".Jea.fZz.qDf.ujU.zI7.iyn.Hsu .Rz6.X6t.ujU.xvE.zI7.iyn.Hsu .rLK.iyn.DI9.BG7.DUt.FTD.L4E .tBJ.dyH.iFc.MF7.pBj.DrD.IZT.mWe",{visisble:true});
           let TrendArr= await tab.$$(".Jea.fZz.qDf.ujU.zI7.iyn.Hsu .Rz6.X6t.ujU.xvE.zI7.iyn.Hsu .rLK.iyn.DI9.BG7.DUt.FTD.L4E .tBJ.dyH.iFc.MF7.pBj.DrD.IZT.mWe");
           console.log(TrendArr.length);
            for(let i=0;i<TrendArr.length;i++){
            let val=await tab.evaluate(function(ele){
                return ele.textContent;
            },TrendArr[i]);
            console.log(val);
            if(val.includes(TREND)){
                done=1;
                await TrendArr[i].click();
                await tab.waitForNavigation({
                    waitUntil: "networkidle2",
                    timeout:40000
                });
                break;
            }
            }   
         }
        
        //follow krdegha sare bndne
        await tab.waitForSelector(".vbI.XiG .Yl-.MIw.Hb7 div[data-test-id='user-follow-button']",{visible:true}) ;
        let FollowArr = await tab.$$(".vbI.XiG .Yl-.MIw.Hb7 div[data-test-id='user-follow-button']") ;
        console.log(FollowArr.length);
        for(let idx=0;idx<=FollowArr.length;idx++){
        await FollowArr[idx].click();
        await tab.waitFor(200);
        await tab.waitForSelector(".vbI.XiG") ;
        console.log("person-> " + idx +" is followd")
        }
       
    }catch(err){
        console.log(err.message);
    }
        
}
async function UpdateProfile(tab){
    try{
        await tab.waitForSelector("div[data-test-id='header-accounts-options-button']") ;
        await tab.click("div[data-test-id='header-accounts-options-button']" , {visible:true}) ;
        
        await tab.waitForSelector("div[data-test-id='header-menu-options-settings']") ;
        await tab.click("div[data-test-id='header-menu-options-settings']" , {visible : true}) ;
          
        // await tab.waitForSelector(".Pyg.zI7.iyn.Hsu") ;
        // await tab.click(".Pyg.zI7.iyn.Hsu" , {visible : true}) ;

        // await tab.waitFor(4000000);
        
        // await tab.waitForSelector("input[title='File upload']") ;
        // await tab.click("input[title='File upload']" , {visible : true}) ;
       
   
        await tab.waitForSelector("#first_name")
        await tab.evaluate(function() {
            document.querySelector('input#first_name').value = ''
        })
        await tab.waitFor(200);
        await tab.type( "#first_name",ProfileInfo[0],{delay:200});

        await tab.waitForSelector("#last_name")
        await tab.evaluate(function() {
            document.querySelector('input#last_name').value = ''
        })
        await tab.waitFor(200);
        await tab.type( " #last_name",ProfileInfo[1],{delay:200});

        await tab.waitForSelector("  #username")
        await tab.evaluate(function() {
            document.querySelector('input#username').value = ''
        })
        await tab.waitFor(200);
        await tab.type( " #username",ProfileInfo[2],{delay:200});
        
        await tab.waitForSelector("textarea[name='about']")
        await tab.type( "textarea[name='about']",ProfileInfo[3],{delay:200});
        
        await tab.waitForSelector("input[name='location']")
        await tab.type( "input[name='location']",ProfileInfo[4],{delay:200});

        await tab.waitForSelector("div[data-test-id='done-button'] ");
        await navigationHelper(tab,"div[data-test-id='done-button'] ");
        
        
            
    }catch(err){
        console.log(err.message);
    }
}
async function sendMsgFunction(tab) {

    try {

       

        await tab.waitForSelector("button[aria-label='Messages']", { visible: true });
        await tab.click("button[aria-label='Messages']");

        for(let i=0;i<friends.length;i++){

            await tab.waitForSelector("input[aria-label='Contacts Search Field']", { visible: true });
            await tab.click("input[aria-label='Contacts Search Field']");

            await tab.waitForSelector("[id='search']", { visible: true })
            await tab.type("[id='search']",friends[i], { delay: 600 });

            await tab.waitForSelector(".tBJ.dyH.iFc._yT.B9u.DrD.IZT.swG.z-6", { visible: true });
            await tab.click(".tBJ.dyH.iFc._yT.B9u.DrD.IZT.swG.z-6");

            await tab.waitForSelector("#messageDraft", { visible: true });
            await tab.type("#messageDraft", Messages[i], { delay: 200 });

            await tab.keyboard.press("Enter");
            
            await tab.waitForSelector("button[aria-label='Back to conversations list']", { visible: true });
            await tab.click("button[aria-label='Back to conversations list']");
        
       }

    }
    catch (err) {
        console.log(err.message);
    }
}
async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2",
        timeout:40000
    }), tab.click(selector)]);
}
async function BoardCreated(tab){
    try{

        await tab.waitForSelector("div[data-test-id='header-profile']");
    await tab.click("div[data-test-id='header-profile']");

    await tab.waitForSelector("button[aria-label='Profile actions overflow']");
    await tab.click("button[aria-label='Profile actions overflow']");

    await tab.waitForSelector("div[title='Create board']");
    await tab.click("div[title='Create board']");

    await tab.waitForSelector("input[name='boardName']");
    await tab.type("input[name='boardName']", boardName, { delay: 200 });

    await tab.waitForSelector("button[type='submit']");
    await tab.click("button[type='submit']");

    await tab.waitForSelector("button[aria-label='Done']", { waitUntil: "networkidle2"});
    await tab.click("button[aria-label='Done']");

    // await tab.click("button[aria-label='Done']");

    console.log("BOARD CREATED");

    }catch(err){
        console.log(err.message);
    }
}
async function SrchSlctCtgry(tab){
    try{
        
        await tab.waitForSelector("input.SearchBoxInputExperimental");
        await tab.type( "input.SearchBoxInputExperimental",ToSearch,{delay:200});
        await tab.keyboard.press('Enter');
        
        console.log("item searched");
        //search category
        await tab.waitForSelector(".SearchImprovementsBar-InnerScrollContainer a[data-test-id='search-guide']")
        let ALLArr=await tab.$$(".SearchImprovementsBar-InnerScrollContainer a[data-test-id='search-guide']");
        console.log(ALLArr.length);
        for(let i=0;i<ALLArr.length;i++){
            let title=await tab.evaluate(function(a){
                return a.title;
            },ALLArr[i]); 
              console.log(title);
            
              if(title.includes(Category)){
                console.log("hi");
                await ALLArr[i].click();
                 allimages=tab.url();
                break;
            }
        }

    }catch(err){
        console.log(err.message);
    }
}
async function HandleAllImages(tab){
    try{
     let idx=0;
     do{
        await tab.waitForSelector(".vbI.XiG .Yl-.MIw.Hb7 a[data-force-refresh='1']");
        let totalimages =  await tab.$$(".Yl-.MIw.Hb7 a[data-force-refresh='1']");
        
        console.log(totalimages.length);  
        
        let singleimage=totalimages[idx];
        // console.log(singleimage +" ");
        let link=await tab.evaluate(function(a){
            return a.href;
        },singleimage);
        
        console.log("image " + idx + "-> "+ link);
        
        await tab.goto(link, {
            waitUntil: "networkidle2"
        });
        
        await AddImagetBrd(tab,idx);
        
        await DonwloadImage(tab,idx);

        await ToComment(tab,idx);

                
        await tab.goto(allimages, {
            waitUntil: "networkidle2"
        });

        
            for(let i=0;i<=idx+6;i++){
            await tab.keyboard.press('ArrowDown');
            }
        
            await tab.waitForSelector(".vbI.XiG ");
        
        idx++;
        }while(idx<TOLIKENDSAVE);

    }catch(err){
        console.log(err.messsage);
    }
}
async function AddImagetBrd(tab,idx){
    try{
        await tab.waitForSelector("button[data-test-id='PinBetterSaveButton']");
        await tab.click("button[data-test-id='PinBetterSaveButton']");
        console.log("image added to baored ->" + idx);

    }catch(err){
        console.log(err.message);
    }
}
async function ToComment(tab,idx){
    try{
     
        await tab.waitForSelector("button[aria-label='Show more']");
        await tab.click("button[aria-label='Show more']",{visible:true});
        await tab.waitForSelector("textarea[name='communityItemTextBox']");
        await tab.type("textarea[name='communityItemTextBox']",CommentWord,{delay:200});
        await tab.waitForSelector("div[data-test-id='activity-item-create-submit']");
        await tab.click("div[data-test-id='activity-item-create-submit']",{visible:true});
        
        console.log("COMMENTED FUDDU ON IMAGE-> " +idx);


    }catch(err){
        console.log(err.message);
    }
}
async function DonwloadImage(tab,idx){
    try{
     
        await tab.waitForSelector("div[data-test-id='lego-icon-wrapper']");
        var hm = await tab.$$("div[data-test-id='lego-icon-wrapper']")
        await hm[0].click();

        await tab.waitForSelector("div[role='list'] .rLK.iyn.eEj.DI9.BG7");
        let Arr=await tab.$$("div[role='list'] .rLK.iyn.eEj.DI9.BG7");
        console.log(Arr.length);
        if(Arr.length>1){
        await Arr[0].click();
        await tab.waitFor(2147);
        console.log("image " + idx +" downloaded")
        }

    }catch(err){
        console.log(err.message);
    }
}
 
