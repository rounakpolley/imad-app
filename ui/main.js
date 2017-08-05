window.onload = init ()
{
console.log('Loaded!');
// move img gradually
var img = document.querySelector('#logo');

var marginLeft = 0;
function moveRight ()
{
 marginLeft = marginLeft + 10;
 img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function ()
{
    var interval = setInterval(moveRight, 100);
}    
};
