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
}

img.onclick = function ()
{
    var interval = setInterval(moveRight, 10);
}    
};
