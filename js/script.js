/*-------------------------------------------------------------------------- */

$(document).ready(function () {
    $('#load').fadeOut(2000, function () {
        $('body').css('overflow', 'auto')
    });
})

/*--------------------------------------left-slider-------------------------*/

$('#click').click(function () {
    $('#leftnav').animate({
        'left': '240px'
    }, 500);
    $('#side').animate({
        'left': '0px'
    }, 500);
    $('#exit,#click').toggleClass("x");
    $('.up').slideDown(1500);
})
$('#exit').click(function () {
    $('#leftnav').animate({
        'left': '0px'
    }, 500);
    $('#side').animate({
        'left': '-250px'
    }, 500);
    $('#exit,#click').toggleClass("x");
    $('.up').slideUp(1000);
})

/*----------------------api-movie-database----------------------------- */

let show = document.getElementById('show');
let req = new XMLHttpRequest();
req.open('GET', 'https://api.themoviedb.org/3/trending/all/day?api_key=a37c573e162370921064c2b3994b2e4a')
req.send();
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        let arr = JSON.parse(req.response);
        display(arr.results)
    }
};

function display(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {
        let name = arr[i].name ? arr[i].name : arr[i].title
        box += `<div class="col-md-4 text-center">
        <div class=" photo">
            <img src="https://image.tmdb.org/t/p/w500/${arr[i].poster_path}" class="img-fluid rounded">
            <div class="layer rounded">
                <h4>${name}</h4>
                <p>${arr[i].overview}</p>
                <p>rate:${arr[i].vote_average}</p>
                <p>rate:${arr[i].first_air_date}</p>
            </div>
        </div>
    </div>`
    }
    show.innerHTML = box;
}

/*-------------------------------------validation------------------------------------------ */
let emailflag;
$('#Email').blur(function () {
    let x = $('#Email').val();
    let regex = /^[a-zA-Z]{1,}([0-9]{1,})?(@)[a-zA-Z]{2,}(.)[a-zA-Z]{2,7}/;
    if (regex.test(x)) {
        $('#Email').addClass('is-valid');
        $('#Email').removeClass('is-invalid');
        emailflag = true;
    } else {
        $('#Email').addClass('is-invalid ');
        $('#Email').removeClass('is-valid');
        $('#Email').attr('placeholder', 'use valid Email');
        emailflag = false;
    }
    checkButton();
})

/*--------------------- */
let nameflag;
$('#Name').blur(function () {
    if ($('#Name').val() == '') {
        $('#Name').addClass('is-invalid ');
        $('#Name').removeClass('is-valid');
        $('#Name').attr('placeholder', 'use valid Name');
        nameflag = false
    } else {
        $('#Name').addClass('is-valid');
        $('#Name').removeClass('is-invalid');
        nameflag = true;
    }
    checkButton();
})

/*-------------- */
let phoneflag;
$('#Phone').blur(function () {
    let x = $('#Phone').val();
    let regex = /^(01)[1205]{1}[0-9]{8}$/;
    if (regex.test(x)) {
        $('#Phone').addClass('is-valid');
        $('#Phone').removeClass('is-invalid');
        phoneflag = true;
    } else {
        $('#Phone').addClass('is-invalid ');
        $('#Phone').removeClass('is-valid');
        $('#Phone').attr('placeholder', 'use valid number');
        phoneflag = false;
    }
    checkButton();
})

/*--------------- */
let agesflage;
$('#Age').blur(function () {
    let x = $('#Age').val();
    let regex = /^[1-9][0-9]?$|^100$/;
    if (regex.test(x)) {
        $('#Age').addClass('is-valid');
        $('#Age').removeClass('is-invalid');
        agesflage = true;
    } else {
        $('#Age').addClass('is-invalid ');
        $('#Age').removeClass('is-valid');
        $('#Age').attr('placeholder', 'use valid Age');
        agesflage = false;
    }
    checkButton();
})

/*---------------- */
let passflag;
$('#Password').blur(function () {
    let x = $('#Password').val();
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8}$/;
    if (regex.test(x)) {
        $('#Password').addClass('is-valid');
        $('#Password').removeClass('is-invalid');
        passflag = true
    } else {
        $('#Password').addClass('is-invalid ');
        $('#Password').removeClass('is-valid');
        $('#Password').attr('placeholder', 'use valid Password');
        passflag = false;
    }
    checkButton();
    repassFunction();
})

/*----------------- */
let repassflag;
$('#rePassword').blur(repassFunction);

function repassFunction() {
    if ($('#Password').val() === '') {
        $('#rePassword').attr('placeholder', 'Please enter a password first');
        repassflag = false;
    } else if ($('#Password').val() === $('#rePassword').val()) {
        $('#rePassword').addClass('is-valid');
        $('#rePassword').removeClass('is-invalid');
        repassflag = true;
    } else {
        $('#rePassword').addClass('is-invalid ');
        $('#rePassword').removeClass('is-valid');
        $('#rePassword').attr('placeholder', 'Password Doesn\'t Match');
        repassflag = false;
    }
    checkButton();
}

/*----------------- */

function checkButton() {
    if (passflag === true && agesflage === true && repassflag === true && phoneflag === true && nameflag === true && emailflag === true) {
        $('#mainbtn').attr('disabled', false)
    } else if (passflag === false || agesflage === false || repassflag === false || phoneflag === false || nameflag === false || emailflag === false) {
        $('#mainbtn').attr('disabled', true)
    }
}

/*------------------ */

/*-------------------------------------------------------------------------- */

let items = [];
let showflag=''
async function getcate(item) {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a37c573e162370921064c2b3994b2e4a&language=en-US&page=1&include_adult=false&query=${item}`);
    items = await res.json();
    items = items.results;
    showflag=item;
    display(items);

}

$('#from_api').keyup(function () {
    (async function () {
        if ($('#from_api').val() == '') {
            req.open('GET', 'https://api.themoviedb.org/3/trending/all/day?api_key=a37c573e162370921064c2b3994b2e4a')
            req.send();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    let arr = JSON.parse(req.response);
                    display(arr.results);
                    show2.classList.add('d-none');
                    showflag='';
                }
            };
        } else {
            await getcate($('#from_api').val())
        }
    })();
})

/*------------------------------------------------------------------------------ */

$('#from_cate').keyup(function () {
    (async function () {
        if ($('#from_cate').val() == '') {
            req.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=a37c573e162370921064c2b3994b2e4a&language=en-US&page=1&include_adult=false&query=${showflag}`)
            req.send();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    let arr = JSON.parse(req.response);
                    display(arr.results)
                    show2.classList.add('d-none');
                }
            };
        } else {
            await getcate2($('#from_cate').val())
        }
    })();
})

let show2 = document.getElementById('show2');
let films = [];
async function getcate2(film) {
    let res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=a37c573e162370921064c2b3994b2e4a&language=en-US`);
    films = await res.json();
    films = films.genres;
    let container = [];
    for (let i = 0; i < films.length; i++) {
        if (films[i].name.toLowerCase().includes(this.$('#from_cate').val().toLowerCase())) {
            container.push(films[i])
            display2(container);
            show2.classList.remove('d-none');
        }
    }
}

let searcontainer=[];
async function display2(films) {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a37c573e162370921064c2b3994b2e4a&language=en-US&page=1&include_adult=false&query=${showflag}`);
    searcontainer = await res.json();
    searcontainer = searcontainer.results;
        let box = '';
    for (let i = 0; i < films.length; i++) {
               // <----- (need another for loop to loop in ids from genre)
    if(true){ // <----( need a condition to make it  display when twoid's: (id of genre --> genre) & (id of genre_id ---> results) are equal)
        searcontainer.push(films);
        let name = searcontainer[i].name ? searcontainer[i].name : searcontainer[i].title
        box += `<div class="col-md-4 text-center">
        <div class=" photo">
            <img src="https://image.tmdb.org/t/p/w500/${searcontainer[i].poster_path}" class="img-fluid rounded">
            <div class="layer rounded">
                <h4>${name}</h4>
                <p>${searcontainer[i].overview}</p>
                <p>rate:${searcontainer[i].vote_average}</p>
                <p>rate:${searcontainer[i].first_air_date}</p>
            </div>
        </div>
    </div>`
    }
    show2.innerHTML = box;
    }
    
}

