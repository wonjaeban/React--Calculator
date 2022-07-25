## Calculator and Counter

## 💭 About

> This is Calculator and Counter using ReactNative and Expo  
> There are four directories.  
> 'calculator-backend' is directory for calculator's backend  
> 'calculator' is directory for calculator's frontend  
> 'counter(classComponent)' is directory for counter of class component structure  
> 'counter' is directory for counter of function component structure

<br />

## 📅 project duration

- 2022.7.4 ~ 2022.7.22

<br />


<br>
<br />

## ✨ calculator features

- **`Numbers`**
  You can enter a combination of numbers from 0 to 9. You can also use decimal points to make actual number.
- **`math signs`**
  You can use percentage, division, multiplication, plus, minus, parenthesis
- **`AC`**
  You can use All Clear.
- **`HS`**
  You can use History. HS shows the history you calculated in the past.
  
## ✨ calculator warnings

> You can't see all math expressions if you type too long.  
> If you want to use HS, you need to make mssql server and type about your mssql server in calculator-backend -> index.js  
> Also, you need to type your ip address in calculator -> src -> components -> History.js -> connectGet method and calculator -> src -> components -> Calculator.js -> connectPost method  
> I used redux to make math expressions just for pracrice redux.  
> Also i made class components to practice about class components

## ✨ calculator images
<img src="https://user-images.githubusercontent.com/70055619/180787959-2343ef1c-b74f-414f-902d-280f2364a7ee.jpg" width="200" height="400">  
> This is Calculator's first screen I've put up as an expo.  
  
<img src="https://user-images.githubusercontent.com/70055619/180788586-7dbe0dd0-2224-4aaa-8998-27e92d77b8c5.jpg" width="200" height="400">  
> You can type basic math signs.  
  
<img src="https://user-images.githubusercontent.com/70055619/180788891-95df3248-e7f3-4816-8688-89c3aa9ab79d.jpg" width="200" height="400">  
> Press = to calculate. It is the result of the above screen.  
  
<img src="https://user-images.githubusercontent.com/70055619/180790524-92133dfa-e9af-4457-856d-3d62874bae6f.jpg" width="200" height="400">  
> You can make actual numbers.  
  
<img src="https://user-images.githubusercontent.com/70055619/180790843-2aae76c1-3c76-402f-802d-3815c0d20fe0.jpg" width="200" height="400">  
> It is the result of the above screen.  
  
<img src="https://user-images.githubusercontent.com/70055619/180793878-c211cade-a82a-4b8d-bf3b-0418f617ec1e.jpg" width="200" height="400">  
> You can type percent and parenthesis.  
  
<img src="https://user-images.githubusercontent.com/70055619/180794076-3ff81a7e-5c87-4e56-b4cd-273fabc0e014.jpg" width="200" height="400">  
> It is the result of the above screen.  
  
<img src="https://user-images.githubusercontent.com/70055619/180796205-908c1478-9a55-4ae4-8b3f-decc264cf5c9.jpg" width="200" height="400">  
> You can see the historys of your calculation results when you press HS.  
> The modal shows you only the latest 10 histories.  


<br>
<br />
## what i used in calculator  

- ReactNative
- NodeJS
- Express
- MSSQL


<br />
