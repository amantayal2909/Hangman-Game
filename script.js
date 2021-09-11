window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categories;         // Array of topics
    var chosenCategory;     // Selected catagory
    var getHint;          // Word getHint
    var word;              // Selected word
    var guess;             // Geuss
    var geusses = [];      // Stored geusses
    var lives;             // Lives
    var counter;           // Count correct geusses
    var space;              // Number of spaces in word '-'
    var gameOver=false;
    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");


    // create alphabet ul
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
            
        }
        
    }
    

    // Select Catagory
    var selectCat = function () {
        if (chosenCategory === categories[0]) {
            catagoryName.innerHTML = "The Chosen Category Is One Word Substitution";
        } else if (chosenCategory === categories[1]) {
            catagoryName.innerHTML = "The Chosen Category Is Indian Brands";
        } else if (chosenCategory === categories[2]) {
            catagoryName.innerHTML = "The Chosen Category Is Indian Cities";
        }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function () {
        
        
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "Game Over\n the word was "+ word;
            gameOver=true;

        }
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Animate man
    var animate = function () {
        var drawMe = lives;
        drawArray[drawMe]();
    }


    // Hangman
    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


    // OnClick Function
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            
           

            if(!gameOver)
            {
                //this.setAttribute("class", "active");
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === geuss) {
                        geusses[i].innerHTML = geuss;
                        counter += 1;
                    }
                }
                var j = (word.indexOf(geuss));
                if (j === -1) {
                    lives -= 1;
    
                    comments();
                    animate();
                   
                   
                } else {
                    comments();
                }
            }
        }
    }


    // Play
    play = function () {
        categories = [
            ["geology", "anthropology", "psychology", "atheist", "introvert", "pedestrian", "philanthropist","cartographer"],
            ["aquafina", "amul", "castrol", "coca-cola", "complan",
             "flipkart","haldiram","kurkure","nestle","sensodyne",
             "videocon"],
            ["shillong", "bhubaneshwar", "jamshedpur", "kashmir",
             "pondicherry","chennai","madurai","kollam",
             "hyderabad","bangalore" ,"nasik","mumbai","jodhpur"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        geusses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
        gameOver=false;
    }

    play();

    // Hint

    hint.onclick = function () {

        hints = [
            ["The study of rocks and soil", "The study of evolution of mankind", "The study of Human Mind", "The one who does not believe in God",
             "Someone who is reserved and shy", "Someone who walks by foot", "The one who loves mankind","A person who draws maps"],
            ["Pure Water That Tastes Good", "Utterly, Butterly, Delicious", "It’s More Than Just Oil", "Always The Real Thing!", "For Extra Growing Power",
             "Shopping Ka Naya Address","Taste Of Tradition","Spend Time With Family","Good Food, Good Life","Stop The Pain And Eat What You Love",
             "Experience Change"],
            ["Scotland of East", "Temple city of India", "Steel city of India, Pittsburgh of India", "Switzerland of India", 
            "Paris of the East" ,"Gateway of South, Detroit of Asia" ,"The City of Festivals, Athens of the East","Cashew Capital",
            "City of Pearls, Hitech city","Space city, Science city, Silicon Valley of India",
             "Wine Capital of India"  ,"City of 7 Islands, Gateway of India","Blue city, Sun city"]
        ];

        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
    };

    // Reset

    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
}
