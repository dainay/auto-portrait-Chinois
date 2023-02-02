
    // code to add blocks html
    fetch('data.json').then(function (response) {
        response.json().then(function (data) {
            console.log("HERE", data);
            numCase = 0;

            data.forEach(function afficheNote(analogie) {
                count = numCase + 1;
                console.log(count)
                document.querySelector('.liste-analogies').innerHTML += '<div class="content' + ' ' + data[numCase]["class"] + '"> <h2 id="ancre' + count + '">' + count + '. ' + "Si j'etais " + data[numCase]["analogie"] + ", je serais " + data[numCase]["valeur"] + " </h2><p>" + data[numCase]["explaination"] + '</p></div><div class="parent-button-info"><div class="button-info" id="num' + count + '"> i </div><div class="info turn-off"><p>' + data[numCase]["licence"] + '</p></div></div><div id="div' + count + '" ' + 'class="image image' + count + '"></div>';

                var photos = "url('" + data[numCase]["photo"] + "')";
                console.log(photos);
                var classPhoto = ".image" + count;
                console.log(classPhoto);

                document.querySelector(classPhoto).style.backgroundImage = photos;
                numCase = numCase + 1;
            })

            // Information about images

            var buttonsInfo = document.querySelectorAll(".button-info");
            console.log(buttonsInfo);
            var infoAll = document.querySelectorAll(".info");


            buttonsInfo.forEach(function afficheInfo(buttonInfo) {
                console.log(buttonInfo)
                buttonInfo.addEventListener("click", function a(event) {
                    var numTab = event.target.getAttribute("id");
                    console.log(parseInt(numTab.substring(3, 4)));
                    infoAll[parseInt(numTab.substring(3, 4)) - 1].classList.toggle('turn-off')
                });

            });

        })
    });


    // Christmas mode button

    var buttonNoel = document.querySelector(".noel-button");
    var christmasStuff = document.querySelectorAll(".christmas");
    console.log(christmasStuff);
    var audio = document.querySelector("audio");
    console.log("HERE" + audio)

    buttonNoel.addEventListener("click", function (e) { // check if mode is off or on and change this
        christmasStuff.forEach(function checkClass(christmasEach) {
            if (christmasEach.classList.contains("turn-off")) {
                christmasEach.classList.remove("turn-off");
                audio.pause();
                buttonNoel.style.backgroundColor = "transparent"

            } else {
                christmasEach.classList.add("turn-off");
                audio.play();
                buttonNoel.style.backgroundColor = "#8e1616c3"


            }
        }
        )
    });


    // scroll arrors

    var scr = document.querySelectorAll(".scroll");
    console.log(scr);
    var scrollyValue = window.scrollY;
    console.log(scrollyValue);
    scr.forEach(function (item3) {
        window.addEventListener('scroll', function (e) {
            item3.animate([{ "opacity": "0", }],
                { "duration": 2000, "iterations": 1, "delay": 300 })  //make them dissapear after scroll for some time and come back after long not moving
        }
        )

    })


    //to remove scrolling arrows during scroling. They come back if scrolling stops 

    var changeScroll = document.querySelector(".scrolldown");
    changeScroll.addEventListener('click', function (event) { 
        window.scrollBy(0, window.innerHeight) })// needed to add this code to make it work before first skroll on page

    document.addEventListener('scroll', function (event) {
        var scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        ) - window.innerHeight - 200; // heigh of site minus 200

        var scrollNow = window.pageYOffset;
        var changeScroll = document.querySelector(".scrolldown")
        // console.log("check the scroll here", scrollHeight, scrollNow);
        if (parseInt(scrollHeight) < parseInt(scrollNow)) {
            changeScroll.style.transform = 'rotate(180deg)'; //to change arrors at the bottom
            changeScroll.addEventListener('click', function (event) { //with click on arrors it will scroll page up
                window.scrollTo(top);
            })

        } else {
            changeScroll.style.transform = "none";
            changeScroll.addEventListener('click', function (event) { //with click on arrors it will scroll page down for siwe of browser page
                window.scrollBy(0, window.innerHeight)
            });
        }
    })


    





    //get input

    var inputObject = document.querySelector("#object");
    inputObject.addEventListener("input", function (e) { console.log("Si j'etais", inputObject.value) });

    var inputAnalogy = document.querySelector("#analogy");
    inputAnalogy.addEventListener("input", function (e) { console.log("je serai", inputAnalogy.value) });

    var inputExplication = document.querySelector("textarea");
    inputExplication.addEventListener("input", function (e) { console.log("Explication", inputExplication.value) });

    var inputMail = document.querySelector("#mail");
    inputMail.addEventListener("input", function (e) { console.log("Mail", inputMail.value) });

    var inputLogin = document.querySelector("#name");
    inputLogin.addEventListener("input", function (e) { console.log("Name", inputLogin.value) });

    var inputPhoto = document.querySelector("#photo");
    inputPhoto.addEventListener("input", function (e) { console.log("Photo", inputLogin.value) });


    //  formulaire
    var buttonForm = document.querySelector("#send");
    console.log(buttonForm);

    buttonForm.addEventListener("click", function (event) {
        alert("En envoyant le formulaire, vous indiquez votre consentement pour que votre adresse IP sera conservé sur des serveurs de l’Université Gustave Eiffel pendant un an au maximum. La personne responsable du traitement des données est Philippe Gambette (philippe.gambette@univ-eiffel.fr)");
        // event.preventDefault();

        console.log("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=daria.iarovaia&courriel=" + inputMail.value + "&message=" + inputObject.value + "\n" + inputAnalogy.value + "\n" + inputExplication.value.replaceAll(" ", "+") + "\n" + inputPhoto.value);

        urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=daria.iarovaia&courriel=" + inputMail.value + "&message=" + inputObject.value + "\n" + inputAnalogy.value + "\n" + inputExplication.value.replaceAll(" ", "+") + "\n" + inputPhoto.value; //url to server

        fetch(urlVisitee).then(function (response) {
            response.json().then(function (data) {
                console.log("Réponse reçue : ")
                console.log(data);//answer
            })
        })

        document.querySelector('.liste-analogies-add').innerHTML += "<div class='content added'><br><br><br><h1>Je vous remercie, " + inputLogin.value + ", d'avoir participé et d'avoir ajouté votre analogie</h1><h2 id='ancre 8'> Si j'etais " + inputObject.value + ", je serais " + inputAnalogy.value + " </h2><p>" + inputExplication.value + '</p></div><div id="div8" class="image image8" style="background-image: url(' + inputPhoto.value + ')"></div>;'; //create additional block with info from form



    });

    buttonForm.addEventListener("click", function (event) {
        document.querySelector('.liste-analogies-add').scrollIntoView()  //scroll page to created element
    });



    // button mention legal

    var mentionsClick = document.querySelector(".legal");
    var mentionsLegales = document.querySelector(".textlegal");
    console.log(mentionsClick, mentionsLegales);

    mentionsClick.addEventListener("click", function (e) {
        mentionsLegales.classList.toggle('turn-off')
    }
    );

    //cursor

    /* Modifed version of the code -  Copyright (c) 2023 by Gabrielle (https://codepen.io/gabriellemkan/pen/rNmPJaq)
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

    document.addEventListener("DOMContentLoaded", () => {
        let mousePosX = 0,
            mousePosY = 0,
            mouseCircle = document.getElementById("mouse-circle");

        document.onmousemove = (e) => {
            mousePosX = e.pageX;
            mousePosY = e.pageY;
        };

        let delay = 120,
            revisedMousePosX = 0,
            revisedMousePosY = 0;

        function delayMouseFollow() {
            requestAnimationFrame(delayMouseFollow);

            revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
            revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

            mouseCircle.style.top = revisedMousePosY + "px";
            mouseCircle.style.left = revisedMousePosX + "px";
        }
        delayMouseFollow();
    });

