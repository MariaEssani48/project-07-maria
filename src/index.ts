#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


const sleep = () => {
    return new Promise((r) =>
     {setTimeout(r,2000)});
};


// game variables
class player  {
    name: string;
    health = 100;
    attackDamage  = 50;
    healthpotion = 3;
    healtPotionAmount  = 30;
    healthPotionDropchance = 50; //percentage
    running : boolean = true;
    constructor(name: string){
        this.name = name;
    }
}

async function Actions(){
        const answers = await inquirer.
         prompt([
           /* Pass your actions in here */
           {
             type: "list",
             name: "acts",
             message: "What do you want to do? \n",
             choices: ["Attack","Drink Health Potion", "Run"], 
           },
         ]);  
         return answers.acts; 
}



function randomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  async function fight(player1: player){
    let score = 0;
    let enemies: string[] = ["skeleton", "Zombie", "Warrior", "Assasin"];
    let enemyHealth = randomInt(75);
    let fightingEnemy =  enemies[randomInt(3.1)];
    console.log(chalk.cyanBright("\t" + fightingEnemy + " has appeared!" + "\n"));

        while(enemyHealth > 1){
            console.log(chalk.green(`\t Your health is  ${player1.health} \n`));
            console.log(chalk.green(`\t ${fightingEnemy} health is  ${enemyHealth}\n`));
            //user input
            let act = await Actions();
            if (act == "Attack"){
                await sleep();
                let damageDealt = randomInt(enemyHealth);
                let damageTaken = randomInt(player1.health);
                   enemyHealth -= damageDealt;
                   player1.health -= damageTaken;
                   console.log(chalk.yellowBright(`\t You loss ${damageTaken} \n`));
                   console.log(chalk.yellowBright(`\t ${fightingEnemy} loss ${damageDealt} \n`));
                   if(player1.health <= 1){
                    console.log(chalk.red(`\t You have taken too much damage! You are gone.\n`));
                    break;
              }
            }
            else if (act == "Drink Health Potion") {
                await sleep();
                if (player1.healthpotion >= 2){
                    player1.health += player1.healtPotionAmount;
                    player1.healthpotion -= 1; 
                console.log(chalk.grey(`\t You've drink a health potion, healing yourself and your health is ${player1.health}.\n
                             You have ${player1.healthpotion} health potions left. \n`))
                 }
                else{
                    console.log(chalk.grey(`\t You don't have enough Health Potions! Sorry. \n `))
                } 
            }
            else{
                await sleep();
                console.log(chalk.red(`\t You run away from the Enemy \n`));
                score -= 10;
                break;
            }
        }
             if(enemyHealth == 1){
                    score += 10;
                    console.log(chalk.bgBlue(`\t You finished the enemy.\n`));
            }
    return score;
}




async function  startGame(){
    let scoring = 0;
    const getName = await inquirer.
    prompt([
      //name of player
      {
        type: "input",
        name: "name",
        message: "Write name of player? \n",
       
      },
    ]); 
    let playerA = new player(getName.name);
    do{
    console.clear();
    console.log(chalk.bgMagenta(`\t Welcome to the Dungeon!, ${getName.name} \n `))
    scoring += await  fight(playerA);
     await sleep();
    if (scoring >= 0){
        var re_Start = await inquirer
        .prompt([
          
            {
                type: "list",
                name: "more",
                message: "You want to play more? \n",
                choices: ["Yes", "No"], 
            }, 
        ])
        console.log(chalk.green(`\t Your score is ${scoring} \n`))
      }
        else{
        console.log(chalk.red(`\t Your score is too low \n`));
        console.log(chalk.red(`\t Game Over \n`));
        break;
      }
    }
  
    while(re_Start.more == "Yes");   
  }
  startGame();