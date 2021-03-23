//global variables declaration
let myChar = document.getElementById('character').contentDocument;
let charEye1 = myChar.getElementById("eye1");
let charEye2 = myChar.getElementById("eye2");
let charMouth = myChar.getElementById('mouth');
let charHappy = "M298.59,632.68c86.13,114.47,196.81,0,196.81,00";
let laughEyebrow1 ="M231.25,380s68.84-65.18,125.71,0";
let laughEyebrow2 ="M445.73,380s68.85-65.18,125.72,0";
let charlaugh = "M298,632.68c100.72-13.82,196,0,196,0 M298.59,632.68c86.13,114.47,196.81,0,196.81,00";
let charAngry = "M312.28,649.68l-31.7-37.74,18,20.74c82.83-61.76,178-11,194.37-1.48,1.6.94,2.44,1.48,2.44,1.48l18.06-18.06-32.93,32.93";
let angryEyebrow1 ="M236.72,365.53s74.15-3.29,131,61.89";
let angryEyebrow2 ="M430.85,427.42s48-65.53,140.6-61.73";
let charEyebrow1 = myChar.getElementById("eyebrow1");
let charEyebrow2 = myChar.getElementById("eyebrow2");
let charNeutralMouth ="M298,632.68c100.72-13.82,196,0,196,0";
let nuetralEyebrow1="M231.25,400s68.84-65.18,125.71,0";
let nuetralEyebrow2="M445.73,400s68.85-65.18,125.72,0";
let deadEye1 = myChar.getElementById("dead_eyes1");
let deadEye2 = myChar.getElementById("dead_eyes2");
let movingMouth= myChar.getElementById("movingMouth");

//major class
class Tamogotchi {
    constructor(tamoName){
        this.initialFood = 60;
        this.metabolismRate = 1000;
        this.petName = tamoName;
        this.addEventListeners();
        this.fetchData();
    }
    addEventListeners(){
        document.getElementById("feedMyPet").addEventListener("click", ()=>{
            this.addRandomFood();
        });
        document.getElementById("compliment").addEventListener("click", ()=>{
            this.compliment();
        });
        document.getElementById("increasePetMetabolismRate").addEventListener("click", ()=>{
            this.increasePetMetabolism();
        });
        document.getElementById("decreasePetMetabolismRate").addEventListener("click", ()=>{
            this.decreasePetMetabolism();
        });
        document.getElementById("showPetMood").addEventListener("click", ()=>{
            this.addRandomMood();
        });
        document.getElementById("startGame").addEventListener("click", ()=>{
            if(this.food >= 0){
                location.reload();
            }
            else{
            this.startMetabolism();
            }
            
    
        });
        let playerName = document.getElementById("playerName").value;
         console.log(playerName);

        document.getElementById("displayFoodPoints").innerHTML = `<p>Hi ${playerName},My name is this ${this.petName}</p>`;

        
    }

    fetchData(){
        fetch("data.json")
            .then(petData => petData.json())
            .then(data => {
                this.petEmotionalReaction = data.petEmotionalReaction;
                this.foodForMyPet = data.foodForMyPet;
                this.complimentForUser= data.complimentForUser;
                // console.log(this.foodForMyPet);
                // console.log(this.petReaction);
                this.hatch();
        })
    
        .catch(err =>console.log(err));
    }

    hatch(){
        console.log(`%cHello this beautiful world.Thankyou for naming me ${this.petName}`,"color:lightblue;font-size:12px")
    }
    die(){
        clearInterval(this.metabolism);
        console.error("I am dead! Why didn't give me something to eat.  >< (");
        this.charDead();
    }
    startMetabolism(){
        this.food=this.initialFood;
            this.metabolism = setInterval(()=> {
                this.food -=1;
                document.getElementById('displayMetabolism').innerText =`${this.food} till I starve`;
                if(this.food<= 0){
                    document.getElementById('displayMetabolism').innerText =`Why did you Let me Die, I hate you`;
                    this.die();
                }
            },this.metabolismRate);
            this.charNeutral();
    }
    increasePetMetabolism(){
        clearInterval(this.metabolism);
        this.metabolismRate = 2000;
        console.log(`now ${this.petName}'s metalbolism rate is  = ${this.metabolismRate}`);
        this.metabolism = setInterval(()=> {
            this.food -=1;
            document.getElementById('displayMetabolism').innerText =`${this.food} till I starve`;
            if(this.food<= 0){
                document.getElementById('displayMetabolism').innerText =`Why did you Let me Die, I hate you`;
                this.die();
            }
        },this.metabolismRate);

    }
    decreasePetMetabolism(){
        clearInterval(this.metabolism);
        this.metabolismRate = 500;
        console.log(`now ${this.petName}'s metalbolism rate is  = ${this.metabolismRate}`);
        this.metabolism = setInterval(()=> {
            this.food -=1;
            document.getElementById('displayMetabolism').innerText =`${this.food} till I starve`;
            if(this.food<= 0){
                document.getElementById('displayMetabolism').innerText =`Why did you Let me Die, I hate you`;
                this.die();
            }
        },this.metabolismRate);
    }
    addRandomMood(){
        let addRandomMood = this.petEmotionalReaction[Math.floor(this.petEmotionalReaction.length*Math.random())];
        console.log(addRandomMood.myPetMood)
        document.getElementById('moodPlace').innerHTML = `Mood: `+addRandomMood.myPetMood+`<br> Phrase: `+addRandomMood.myPetReaction;
        if(addRandomMood.myPetMood=="Happy"){
            this.charHappy();
        }
        if(addRandomMood.myPetMood=="Sad"){
            this.charSad();
        }
        if(addRandomMood.myPetMood=="Jokey"){
            this.charLaugh();
        }
        if(addRandomMood.myPetMood=="Angry"){
            this.charAngry();
        }

        

    }
    addRandomFood(){
        let addRandomFood = this.foodForMyPet[Math.floor(this.foodForMyPet.length*Math.random())];
        let randomNumber = Math.random();
        let displayFoodPoints = document.getElementById("displayFoodPoints");
        if(addRandomFood.chancesToGetSick>=randomNumber){
            this.food -= addRandomFood.pointsToPet;
            displayFoodPoints.innerHTML = `<p>
                Food Eaten: ${addRandomFood.NameOfFood}<br>
                Points Gained/Lost : Lost ${addRandomFood.pointsToPet} points<br>
                </p>`;
            this.charSad();
        }
        else{
            this.food += addRandomFood.pointsToPet;
            displayFoodPoints.innerHTML = `<p>
                Food Eaten: ${addRandomFood.NameOfFood} points<br>
                Points Gained/Lost : Gained ${addRandomFood.pointsToPet}<br>
                </p>`

            this.charHappy();
        }
    }
    compliment(){
        let username=document.getElementById('playerName').value;
        let getRandomCompliment =this.complimentForUser[Math.floor(this.complimentForUser.length*Math.random())];
        console.log(getRandomCompliment);
        document.getElementById("displayCompliment").innerText = `${username}, `+ getRandomCompliment;
        this.charTalk();
    }
    //  all the emotions displays here
    
    charHappy(){
        gsap.to(charMouth,{
            attr:{
                d:charHappy
            },
        });
        
        gsap.to(charEye1,{
            attr:{
                cy:"420"
            },
            duration:1
        })
        gsap.to(charEye2,{
            attr:{
                cy:"420"
            },
            duration:1
        });
        setTimeout(this.charNeutral,4000);
        
    }
    // Sad
    charSad(){
        let myChar = document.getElementById('character').contentDocument;
        let charMouth = myChar.getElementById('mouth');
        let charSad = "M298.59,632.68c111.15-67.47,196.81,0,196.81,0";
        let charEye1 = myChar.getElementById("eye1");
        let charEye2 = myChar.getElementById("eye2");
        gsap.to(charMouth,{
            attr:{
                d:charSad
            },
        });

        gsap.to(charEye1,{
            attr:{
                cy:"430",
                cx:"205"
            },
            duration:1
        })
        gsap.to(charEye2,{
            attr:{
                cy:"430",
                cx:"418"
            },
            duration:1
        });
        setTimeout(this.charNeutral,4000);
    }
    charLaugh(){
         console.log("click workss")
         gsap.to(charMouth,{
            attr:{
                d:charlaugh
            },
        });
        gsap.to(charEyebrow1,{
            attr:{
                d:laughEyebrow1
                
            },
            duration:1
        })
        gsap.to(charEyebrow2,{
            attr:{
                d:laughEyebrow2
            },
            duration:1
        }),
        gsap.to(charEye1,{
            attr:{
                cx:"205"
            },
            duration:1
        })
        gsap.to(charEye2,{
            attr:{
                cx:"418"
            },
            duration:1
        })
        setTimeout(this.charNeutral,4000);

    }
    charAngry(){
        console.log("click workss")
        gsap.to(charMouth,{
           attr:{
               d:charAngry
           },
       });
       gsap.to(charEyebrow1,{
           attr:{
               d:angryEyebrow1
               
           },
           duration:1
       })
       gsap.to(charEyebrow2,{
           attr:{
               d:angryEyebrow2
           },
           duration:1
       })
       gsap.to(charEye1,{
        attr:{
            cy:"410"
        },
        duration:1
        })
        gsap.to(charEye2,{
            attr:{
                cy:"410"
            },
            duration:1
        })
        setTimeout(this.charNeutral,4000);
    }
    charNeutral(){
        console.log("click workss")
        gsap.to(charMouth,{
           attr:{
               d:charNeutralMouth
           },
       });
       gsap.to(charEyebrow1,{
           attr:{
               d:nuetralEyebrow1
               
           },
           duration:1
       })
       gsap.to(charEyebrow2,{
           attr:{
               d:nuetralEyebrow2
           },
           duration:1
       }),
       gsap.to(charEye1,{
        attr:{
            cy:"420",
            cx:"195"
        },
        duration:1
        })
        gsap.to(charEye2,{
            attr:{
                cy:"420",
                cx:"408"
            },
            duration:1
        })
        setTimeout(this.charNeutral,4000);
    }
    charDead(){
        gsap.to(deadEye1,{
            opacity:1
        })
        gsap.to(deadEye2,{
            opacity:1
        })
        
        gsap.to(charEye1,{
            attr:{
                opacity:0
            },
            duration:1
        })
        gsap.to(charEye2,{
            attr:{
                opacity:0
            },
            duration:1
        });
        setTimeout(this.charNeutral,4000);
    }
    charTalk(){
        gsap.to(movingMouth,{
            attr:{
                opacity:1
            },
            duration:1
        })
    }
}
let  Tamo = new Tamogotchi("Tamo");  

