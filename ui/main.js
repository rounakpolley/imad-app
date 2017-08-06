window.onload = function init ()
{
console.log('Loaded!');
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
var counterButton = document.querySelector('#counterButton');   console.log(counterButton);
var counterDisplay= document.querySelector('#counterDisplay');  console.log(counterDisplay);

counterButton.onclick = function ()
{
    console.log('clicked');
    var request = new XMLhttpRequest();                 //creating a request object
        
    request.onreadystatechange = function ()            //captuting the response & storing in a var
    {
        console.log('ready');
        if(request.readyState === XMLhttpRequest.DONE)  //request is recieved
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

};






