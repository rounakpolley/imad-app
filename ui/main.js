window.onload = function init ()
{
// move img gradually
var img = document.querySelector('#logo');
var position   = 0; //0 for middle left -1 right 1
var marginLeft = 0;
function moveRight ()
{
    if(((marginLeft >= 0) && (marginLeft <  100)) && position == 0)
    {
        marginLeft = marginLeft + 1;
        if(marginLeft == 100) position = 1;
    }
    if(((marginLeft > 0) && (marginLeft <= 100)) && position == 1)
    {
        marginLeft = marginLeft - 1;
        if(marginLeft == 0) position = -1;
    }
    if(((marginLeft <= 0) && (marginLeft > -100)) && position == -1)
    {
        marginLeft = marginLeft - 1;
        if(marginLeft == -100) position = 1;
    }
    if(((marginLeft < 0) && (marginLeft >= -100)) && position == 1)
    {
        marginLeft = marginLeft + 1;
        if(marginLeft == 0) position = 0;
    }
    
    img.style.marginLeft = marginLeft + 'px';
};

img.onclick = function ()
{
    var interval = setInterval(moveRight, 10);
};

// share counter
var counterButton = document.querySelector('#counterButton');
var counterDisplay= document.querySelector('#counterDisplay');

    var request0 = new XMLHttpRequest();                 //creating a request object
        
    request0.onreadystatechange = function ()            //captuting the response & storing in a var
    {
        if(request0.readyState === XMLHttpRequest.DONE)  //request is recieved
        {
            if(request0.status == 200)                   //i.e. successful
            {
                    var counter = request0.responseText;
                    counterDisplay.innerHTML = counter.toString();
            }
        }
    };
    
    //make a request
    request0.open('GET', 'http://rounakpolley19972014.imad.hasura-app.io/currentCounter', true);
    request0.send(null);

// increment counter (in server.js) when share clicked
counterButton.onclick = function ()
{
    var request = new XMLHttpRequest();                 //creating a request object
        
    request.onreadystatechange = function ()            //captuting the response & storing in a var
    {
        if(request.readyState === XMLHttpRequest.DONE)  //request is recieved
        {
            if(request.status == 200)                   //i.e. successful
            {
                var counter = request.responseText;
                counterDisplay.innerHTML = counter.toString();
            }
        }
    };
    
    //make a request
    request.open('GET', 'http://rounakpolley19972014.imad.hasura-app.io/counter', true);
    request.send(null);
};

var nameList = document.querySelector('#nameList');

document.querySelector('#nameSubmit').onclick = function ()
{
    var name = document.querySelector('#userName').value;
    //names to be refreshed on each click so need to be inside fn block
    
    var request = new XMLHttpRequest();                 //creating a request object
    request.onreadystatechange = function ()            //captuting the response & storing in a var
    {
        if(request.readyState === XMLHttpRequest.DONE)  //request is recieved
        {
            if(request.status == 200)                   //i.e. successful
            {
                var recievedList = '';
                var names = JSON.parse(request.responseText);
                
                
                for(i=0; i<names.length; i++)
                {
                    recievedList += '<li>'+ names[i] +'</li>';
                }
                nameList.innerHTML = recievedList;
            }
        }
    };
    
    //make a request
    request.open('GET', 'http://rounakpolley19972014.imad.hasura-app.io/submit-name?name='+ name,
                true);
    request.send(null);
};

};






