var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
];

http.createServer( function(req, res){ 

  const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
  let profile = fs.readFileSync(__dirname + '/beatle.html', 'utf8');

  if(req.url === '/'){
    res.writeHead(200, { 'Content-Type':'text/html' })   
    res.end(html);
  } else if(req.url === "/John%20Lennon"){
    res.writeHead(200, { 'Content-Type':'text/html' })  
    var Name = "John Lennon";
    var Birthdate = "09/10/1940";
    var ProfilePic = "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg";
    profile = profile.replace("${Name}", Name);
    profile = profile.replace("${Birthday}", Birthdate);
    profile = profile.replace("${Image}", ProfilePic);
    res.end(profile);
  }else if(req.url === "/George%20Harrison"){
    res.writeHead(200, { 'Content-Type':'text/html' })  
    var Name = "George Harrison";
    var Birthdate = "25/02/1946";
    var ProfilePic = "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg";
    profile = profile.replace("${Name}", Name);
    profile = profile.replace("${Birthday}", Birthdate);
    profile = profile.replace("${Image}", ProfilePic);
    res.end(profile);
  }else if(req.url === "/Paul%20McCartney"){
    res.writeHead(200, { 'Content-Type':'text/html' })  
    var Name = "Paul McCartney";
    var Birthdate = "18/06/1942";
    var ProfilePic = "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg";
    profile = profile.replace("${Name}", Name);
    profile = profile.replace("${Birthday}", Birthdate);
    profile = profile.replace("${Image}", ProfilePic);
    res.end(profile);
  }else if(req.url === "/Richard%20Starkey"){
    res.writeHead(200, { 'Content-Type':'text/html' })  
    var Name = "Richard Starkey";
    var Birthdate = "07/08/1940";
    var ProfilePic = "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg";
    profile = profile.replace("${Name}", Name);
    profile = profile.replace("${Birthday}", Birthdate);
    profile = profile.replace("${Image}", ProfilePic);
    res.end(profile);
  } else if(req.url === "/api"){
    res.writeHead(200, { 'Content-Type':'application/json' })   
    res.end( JSON.stringify(beatles) );
  } else if(req.url === "/api/John%20Lennon"){
    res.writeHead(200, { 'Content-Type':'application/json' })   
    res.end( JSON.stringify(beatles[0]) );
  }  else if(req.url === "/api/Paul%20McCartney"){
    res.writeHead(200, { 'Content-Type':'application/json' })   
    res.end( JSON.stringify(beatles[1]) );
  }  else if(req.url === "/api/George%20Harrison"){
    res.writeHead(200, { 'Content-Type':'application/json' })   
    res.end( JSON.stringify(beatles[2]) );
  } else if(req.url === "/api/Richard%20Starkey"){
    res.writeHead(200, { 'Content-Type':'application/json' })   
    res.end( JSON.stringify(beatles[3]) );
  } else{
    res.writeHead(404)   
    res.end("Error 404, Not Found.");
  }
 

}).listen(1337, '127.0.0.1');
