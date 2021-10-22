
    function findWayOut(inputData){
        // Проверяем корректность введенных данных
        if (checkInput(inputData) == true){
            // Преобразуем полученные данные в двумерный массив
            let maze = creatMaze(inputData);
            // Возвращаем полученный результат
            return outputData(maze);
        } else{
            // Выдаем ошибку и обнуляем форму ввода, если данные не корректны
            alert("Неправильный тип данных! Повторите попытку")
            document.getElementById('input').value = '';
            return '';
        }
    }

    function checkInput(input){
        // Проверяем точку входа на равность 0
        if (input.split('\n')[0][0] == 1){
            return false;
        }

        let checkLast;

        // Разбиваем на отдельные элементы
        for (let i = 0; i < input.split('\n').length; i++){
            let str = input.split('\n')[i];
            str = str.replace(/\s+/g, '');
            // Проверяем на равность 1 или 0
            for (let j = 0; j < str.length; j++){
                checkLast = str[j];
                switch(parseInt(str[j])){
                    case 0:
                        break;
                    case 1:
                        break;
                    default: 
                        return false;
                }
            }
        }

        // Проверяем точку выхода на равность 0
        if (checkLast == 1)
        {
            return false;
        }

        return true;
    }

    function creatMaze(inputData){
        let maze = [];
        let mazeStr = [];
        // Генерируем лабиринт исходя из входных данных
        for (let i = 0; i < inputData.split('\n').length; i++){
            let str = inputData.split('\n')[i];
            str = str.replace(/\s+/g, '');

            for (let j = 0; j < str.length; j++){
                mazeStr.push(parseInt(str[j]));
            }

            maze.push(mazeStr);
            mazeStr = [];
        }
        return maze;
    }

    function stepMain(start, end, maze){
        function step(x, y, swap, xx, yy){
            // Если вышли за пределы
            if (y < 0){
                return false;
            } 

            if (y >= maze.length){
                return false;
            } 

            if (maze[y][x] === undefined){
                return false;
            } 
        
            // Если пошли по неверному пути
            if (maze[y][x] === 1){
                return false;
            } 

            if ((maze[y][x] === '→') || (maze[y][x] === '←') ||
                (maze[y][x] === '↑') || (maze[y][x] === '↓')){
                return false;
            } 
        
            if (x === end.x && y === end.y){
                maze[yy][xx] = swap;
                maze[y][x] = '⎆';
                return true;
            } 

            // Отмечаем пройденный элемент
            maze[yy][xx] = swap;
            yy = y; 
            xx = x;
            return step(x + 1, y, '→', xx, yy) || step(x - 1, y, '←',  xx, yy) || 
                   step(x, y + 1, '↓',  xx, yy) || step(x, y - 1, '↑',  xx, yy);
        }
      
        return step(start.x, start.y, '#', 0, 0);
    }

    function outputData(maze){
        let strOutput;
        // Проверяем наличие выхода из лабиринта
        if(stepMain({ x: 0, y: 0 }, { x: maze.length - 1 , y: maze.length - 1 }, maze) == true){
            // Выводим положительный результат и найденный путь
            strOutput = "Найден выход из лабаиринта (" + true + ")" + 
                    '\n' + "Найденный путь:" + '\n';

            for (let i = 0; i < maze.length; i++){
                strOutput += maze[i].join(' ') + '\n';
            }
        } else{
            // Выводим отрицательный результат
            strOutput = "Выход из лабиринта отсутствует (" + false + ")";
        }
       
        return strOutput
    }