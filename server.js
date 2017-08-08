var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var config =
{
    user        : 'rounakpolley19972014',
    database    : 'rounakpolley19972014',
    host        : 'db.imad.hasura-app.io',
    port        : '5432',
    password    : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

/*
var articles = 
{
    'article-one' : 
    {
        title   :'RounakPolley | Article1',
        heading :'Article One',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    },
    'article-two' :
    {
        title   :'RounakPolley | Article2',
        heading :'Article Two',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    },
    'article-three' : 
    {
        title   :'RounakPolley | Article3',
        heading :'Article Three',
        content :`  <p>Just a demo article..</p>
                    <p>Just a demo article..</p>`,
        date    :'Date : 3 Aug, 17'
    }
};
*/

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
            <h4>${date.toDateString()}</h4>
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

var pool = new Pool(config);
app.get('/test-db', function (req, res) 
{
    pool.query('SELECT * FROM test', function (err, result)
    {
        if(err) {   res.status(500).send(err.toString());   }
        else    {   res.send(JSON.stringify(result.rows));       }
    });
});

//counts the number of times share is clicked

var counter = 0;
app.get('/counter', function (req, res)
{
    counter += 1;
    res.send(counter.toString());
});
app.get('/currentCounter', function (req, res)
{
    res.send(counter.toString());
});

var nameList = [];
app.get('/submit-name', function (req, res)
{
     var name = req.query.name;
     nameList.push(name);
     
     res.send(JSON.stringify(nameList));
});

app.get('/articles/:articleName', function (req, res) 
{
    pool.query("SELECT * FROM articles WHERE title ='" + req.params.articleName + "'",
    function (err, result)
    {
        if(err) {   res.status(500).send(err.toString());       }
        else    {   
                    if(result.rows.length ===0)
                    {    res.stauts(404).send('Article not found');    }
                    else
                    {
                        var articleData = result.rows[0];
                        res.send(createTemplate(articleData));
                    }
                }
    });
    
});

app.get('/ui/style.css', function (req, res) 
{
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) 
{
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) 
{
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
