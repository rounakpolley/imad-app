window.onload = function init ()
{
console.log('Loaded!');
// move img gradually
var img = document.querySelector('#logo');

var marginLeft = 0;
function moveRight ()
{
    if((marginLeft > 0) && (marginLeft <  100))    marginLeft = marginLeft + 1;
    if((marginLeft < 0) && (marginLeft > -100))    marginLeft = marginLeft - 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function ()
{
    var interval = setInterval(moveRight, 10);
}    
};
