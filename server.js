var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = 
{
    articleOne : 
    {
        title   :'RounakPolley | Article1',
        heading :'Article One',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    },
    articleTwo :
    {
        title   :'RounakPolley | Article2',
        heading :'Article Two',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    },
    articleThree : 
    {
        title   :'RounakPolley | Article3',
        heading :'Article Three',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    }
};

function createTemplate(data)
{
    var title   = data.title;
    var heading = data.heading;
    var content = data.content;
    var date    = data.date;
    
    var htmlTemplate = 
    `
    <!DOCTYPE HTML>
    <html>
        <head>
            <meta name="viewpoint" content="width=device-width initial-scale=1"/>
            <title>${title}</title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
        <div class="container">
            <a href="/"><strong>H O M E</strong></a>
            <hr/>
            <h1>${heading}</h1>
            ${content}
            <hr/>
            <h4>${date}</h4>
        </div>
        </body>
        
    </html>
    `;
    
    return htmlTemplate;
}

app.get('/', function (req, res) 
{
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) 
{
    //articleName = article-one
    //articles[articleName] = ...
    var articleName = rec.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
