const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
let left = false,
  right = false,
  up = false,
  down = false,
  falling = false,
  primary9pos = [],
  count9 = 0,
  primary8pos = [],
  count8 = 0,
  swapped8 = false,
  swapped9 = false;
  let radius = 7;
  let oldPos;
  let secondOldPos;
  function submitRadius(){
    radius = document.getElementById('radius').value;
  }
  document.addEventListener("keydown", async function (event) {
    if (event.key === "ArrowLeft") {
      if (!left) {
        left = true;
        await onLeftArrowKeyPress();
      }
    } else if (event.key === "ArrowRight") {
      if (!right) {
        right = true;
        await onRightArrowKeyPress();
      }
    } else if (event.key === "ArrowUp") {
      if(!up){
        up = true;
        await onUpArrowKeyPress();
        up = false;
      }
    } else if (event.key === "ArrowDown") {
      if (!down) {
        await onDownArrowKeyPress();
      }
    }
  });
  
  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
      left = false;
    } else if (event.key === "ArrowRight") {
      right = false;
    } else if (event.key === "ArrowDown") {
      down = false;
    }
  });
  
let gameArr = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,1,5,5,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,5,5,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,5,5,1,1,1,1,1,0,0,1,0,0,1,1,7,7,1,1],
  [1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,5,5,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
  [1,2,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,6,6,1,0,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,6,0,1,1,5,5,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,6,0,0,0,1,1,0,0,1,1,6,6,1,1,1,1,0,0,0,0,1,1,0,0,1,1],
  [1,0,0,0,0,0,0,0,6,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,1,1,7,7,0,0,1,1,0,0,1,1],
  [0,0,0,0,0,0,6,0,0,0,0,0,0,0,1,1,5,5,1,1,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,1],
  [0,0,0,0,6,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,1,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,7,7,0,0,0,0,1,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,9,0,0,0,1],
  [1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
function addBorder(array) {
  const borderedArray = array.map((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === array.length - 1) {
      return row.map(() => 1);
    } else {
      return [1, ...row, 1];
    }
  });

  return [
    Array(borderedArray[0].length).fill(1),
    ...borderedArray,
    Array(borderedArray[0].length).fill(1),
  ];
}
for(let i =0; i<radius;i++){
  gameArr = addBorder(gameArr);
}
const body = document.body;
const cellWidth = window.innerWidth / 15;
const cellHeight = window.innerHeight / 15;
async function visualizeArrayInHTML(array) {
  let centerX, centerY;
  const colorMap = {
    0: "white",
    1: "black",
    2: "#0000ff",
    3: "yellow",
    4: "red",
    5: "gray",
    6: "lime",
    7: "green",
    8: "black",
    9: "white",
    10: "#0000ff66",
    11: "#0000ff33"
  };
  let htmlContent = '<table style="border-collapse: collapse;">';

  // Find the coordinates of the cell with the value '2'
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 2) {
        centerX = j;
        centerY = i;
        break;
      }
    }
  }

  // Visualize the area around the cell with the value '2'
  for (let i = Math.max(0, centerY - radius); i < Math.min(array.length, centerY + radius + 1); i++) {
    htmlContent += "<tr>";
    for (let j = Math.max(0, centerX - radius); j < Math.min(array[i].length, centerX + radius + 1); j++) {
      let value = array[i][j];
      if (secondOldPos && i === secondOldPos[0] && j === secondOldPos[1] && array[i][j] !== 2) {
        value = 11; // Set the value to 10 for visualization
      }
      if (oldPos && i === oldPos[0] && j === oldPos[1] && array[i][j] !== 2) {
        secondOldPos = oldPos;
        value = 10; // Set the value to 10 for visualization
      }
      const color = colorMap[value];
      htmlContent += `<td id"a=${i}${j}" style="background-color: ${color}; width: ${
        cellWidth
      }px; height: ${
        cellHeight  
      }px; border: 0px solid black;"></td>`;
    }
    htmlContent += "</tr>";
  }
  htmlContent += "</table>";
  body.innerHTML = htmlContent;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 2) {
        oldPos=[i, j];
      }
    }
  }
}



// Call the function to visualize the specified area
visualizeArrayInHTML(gameArr);

async function drop() {
  await wait(200);
  let a = false;
  while (!a) {
    let moved = false;
    for (let i = gameArr.length - 1; i >= 0; i--) {
      for (let j = 0; j < gameArr[i].length; j++) {
        if (
          gameArr[i][j] === 3 &&
          i < gameArr.length - 1 &&
          gameArr[i + 1][j] === 0
        ) {
          gameArr[i + 1][j] = 3;
          gameArr[i][j] = 0;
          moved = true;
        }
      }
    }
    visualizeArrayInHTML(gameArr);
    await wait(200);
    if (!moved) {
      a = true;
    }
  }
}

for (i = 0; i < gameArr.length; i++) {
  for (j = 0; j < gameArr[i].length; j++) {
    if (gameArr[i][j] === 9) {
      primary9pos[count9] = [i, j];
      count9++;
    } else if (gameArr[i][j] === 8) {
      primary8pos[count8] = [i, j];
      count8++;
    }
  }
}
function swapEightAndNineInArray(arr) {
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr[i].length;j++){
      if(arr[i][j]===9&&arr[i-1][j]===2){
        dropPlayer();
      }
      if(arr[i][j]===2){
        for(let k = 0;k<primary9pos.length;k++){
          if(arr[i][j]===arr[primary9pos[k][0]][primary9pos[k][1]]){
            arr[i][j-1] = arr[i][j];
          }
        }
        for(let k = 0;k<primary8pos.length;k++){
          if(arr[i][j]===arr[primary8pos[k][0]][primary8pos[k][1]]){
            arr[i][j-1] = arr[i][j];
          }
        }
      }
      for(let k = 0;k<primary9pos.length;k++){
        if(arr[i][j]===9&&arr[i][j]!==arr[primary9pos[k][0]][primary9pos[k][1]]){
          arr[i][j]=0;
        }
      }
      for(let k = 0;k<primary8pos.length;k++){
        if(arr[i][j]===8&&arr[i][j]!==arr[primary8pos[k][0]][primary8pos[k][1]]){
          arr[i][j]=0;
        }
      }
    }
  }
  for (let i = 0; i < primary8pos.length; i++) {
    switch (swapped8) {
      case false:
        arr[primary8pos[i][0]][primary8pos[i][1]] = 9;
        swapped8 = true;
        break;
      default:
        arr[primary8pos[i][0]][primary8pos[i][1]] = 8;
        swapped8 = false;
        break;
    }
  }
  
  for (let i = 0; i < primary9pos.length; i++) {
    switch (swapped9) {
      case false:
        arr[primary9pos[i][0]][primary9pos[i][1]] = 8;
        swapped9 = true;
        break;
      default:
        arr[primary9pos[i][0]][primary9pos[i][1]] = 9;
        swapped9 = false;
        break;
    }
  }
  
}
function updateAndVisualiseArray() {
  swapEightAndNineInArray(gameArr);
  visualizeArrayInHTML(gameArr);
}
setInterval(updateAndVisualiseArray, 1000);
async function dropPlayer() {
  if (falling == false) {
    falling = true;
    let a = false;
    while (a == false) {
      let x, y;
      for (let i = 0; i < gameArr.length; i++) {
        for (let j = 0; j < gameArr[i].length; j++) {
          if (gameArr[i][j] === 2) {
            x = i;
            y = j;
            break;
          }
        }
      }
      switch (gameArr[x + 1][y]) {
        case 0:
          gameArr[x + 1][y] = 2;
          gameArr[x][y] = 0;
          break;
        case 6:
          switch (gameArr[x + 2][y]) {
            case 0:
              await wait(600);
              gameArr[x + 1][y] = gameArr[x][y];
              gameArr[x + 2][y] = 6;
              gameArr[x][y] = 0;
              break;
            case 1:
              await wait(600);
              gameArr[x + 1][y] = gameArr[x][y];
              gameArr[x][y] = 0;
              break;
          }          
          break;
        case 7:
          await wait(800);
          gameArr[x + 1][y] = gameArr[x][y];
          gameArr[x][y] = 0;
          break;
        case 9:
          gameArr[x + 1][y] = gameArr[x][y];
          gameArr[x][y] = 0;
          visualizeArrayInHTML(gameArr);
          await wait(200);
          if (gameArr[x + 2][y] === 0) {
            gameArr[x + 2][y] = gameArr[x + 1][y];
          } else if (gameArr[x + 1][y - 1] === 0) {
            gameArr[x + 1][y - 1] = gameArr[x + 1][y];
          } else if (gameArr[x + 1][y + 1] === 0) {
            gameArr[x + 1][y + 1] = gameArr[x + 1][y];
          }
          gameArr[x + 1][y] = 9;
          break;
        default:
          a = true;
          break;
      }
      visualizeArrayInHTML(gameArr);
      await wait(200);
    }
    falling = false;
  }
}
async function onLeftArrowKeyPress() {
  let x, y;
  for (let i = 0; i < gameArr.length; i++) {
    for (let j = 0; j < gameArr[i].length; j++) {
      if (gameArr[i][j] === 2) {
        x = i;
        y = j;
        break;
      }
    }
  }
  if (gameArr[x][y - 1] === 0) {
    gameArr[x][y - 1] = 2;
    gameArr[x][y] = 0;
  } else if (gameArr[x][y - 1] === 3 && gameArr[x][y - 2] === 0) {
    gameArr[x][y - 1] = 2;
    gameArr[x][y] = 0;
    gameArr[x][y - 2] = 3;
  } else if (gameArr[x][y - 1] === 4) {
    gameArr[x][y - 1] = 2;
    gameArr[x][y]=0;
    alert("you won");
  } else if (gameArr[x][y - 1] === 9) {
    gameArr[x][y - 1] = gameArr[x][y];
    gameArr[x][y] = 0;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y - 2] = gameArr[x][y - 1];
    gameArr[x][y - 1] = 9;
  }else if(gameArr[x][y-1]===3&&gameArr[x][y-2]===9){
    gameArr[x][y - 1] = 2;
    gameArr[x][y] = 0;
    gameArr[x][y - 2] = 3;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y-2]=2;
    gameArr[x][y-1]=0;
    gameArr[x][y-3]=3;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y-3]=2;
    gameArr[x][y-2]=9;
    gameArr[x][y-4]=3;
  }
  visualizeArrayInHTML(gameArr);
  await wait(200);
  await dropPlayer();
  await drop();
}
async function onRightArrowKeyPress() {
  let x, y;
  for (let i = 0; i < gameArr.length; i++) {
    for (let j = 0; j < gameArr[i].length; j++) {
      if (gameArr[i][j] === 2) {
        x = i;
        y = j;
        break;
      }
    }
  }
  if (gameArr[x][y + 1] === 0) {
    gameArr[x][y + 1] = 2;
    gameArr[x][y] = 0;
  } else if (gameArr[x][y + 1] === 3 && gameArr[x][y + 2] === 0) {
    gameArr[x][y + 1] = 2;
    gameArr[x][y] = 0;
    gameArr[x][y + 2] = 3;
  } else if (gameArr[x][y + 1] === 4) {
    gameArr[x][y + 1] = 2;
    gameArr[x][y]=0;
    alert("you won");
  } else if (gameArr[x][y + 1] === 9) {
    gameArr[x][y + 1] = gameArr[x][y];
    gameArr[x][y] = 0;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y + 2] = gameArr[x][y + 1];
    gameArr[x][y + 1] = 9;
  }else if(gameArr[x][y+1]===3&&gameArr[x][y+2]===9){
    gameArr[x][y + 1] = 2;
    gameArr[x][y] = 0;
    gameArr[x][y + 2] = 3;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y+2]=2;
    gameArr[x][y+1]=9;
    gameArr[x][y+3]=3;
    visualizeArrayInHTML(gameArr);
    await wait(200);
    gameArr[x][y+3]=2;
    gameArr[x][y+2]=9;
    gameArr[x][y+4]=3;
  }
  visualizeArrayInHTML(gameArr);
  await wait(200);
  await dropPlayer();
  await drop();
}

async function onUpArrowKeyPress() {
  let ease = [250,200,150];
  let a = 0;
  while (a < 3) {
    let x, y;
    for (let i = 0; i < gameArr.length; i++) {
      for (let j = 0; j < gameArr[i].length; j++) {
        if (gameArr[i][j] === 2) {
          x = i;
          y = j;
          break;
        }
      }
    }
    if (gameArr[x - 1][y] === 0) {
      gameArr[x - 1][y] = 2;
      gameArr[x][y] = 0;
    } else if (gameArr[x - 1][y] === 5 && gameArr[x - 2][y] === 0) {
      gameArr[x - 2][y] = 2;
      gameArr[x][y] = 0;
      a++;
    } else if (gameArr[x - 1][y] === 9 && gameArr[x - (2)[y] === 0]) {
      gameArr[x - 2][y] = 2;
      gameArr[x][y] = 0;
      a++;
    }
    visualizeArrayInHTML(gameArr);
    await wait(ease[a]);
    a++;
  }
  await dropPlayer();
}
async function onDownArrowKeyPress() {
  let x, y;
  for (let i = 0; i < gameArr.length; i++) {
    for (let j = 0; j < gameArr[i].length; j++) {
      if (gameArr[i][j] === 2) {
        x = i;
        y = j;
        break;
      }
    }
  }
  if (gameArr[x + 1][y] === 5 && gameArr[x + 2][y] === 0) {
    gameArr[x][y] = 0;
    gameArr[x + 2][y] = 2;
  }
  visualizeArrayInHTML(gameArr);
  await wait(200);
  let a = false;
  while (a == false) {
    let x, y;
    for (let i = 0; i < gameArr.length; i++) {
      for (let j = 0; j < gameArr[i].length; j++) {
        if (gameArr[i][j] === 2) {
          x = i;
          y = j;
          break;
        }
      }
    }
    if (gameArr[x + 1][y] === 0) {
      gameArr[x + 1][y] = 2;
      gameArr[x][y] = 0;
    } else {
      a = true;
    }
    visualizeArrayInHTML(gameArr);
    await wait(200);
  }
  await drop();
}