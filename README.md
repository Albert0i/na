# Node-tify TA project <br /> ─ [“Old soldiers never die--they just fade away.”](https://iowaculture.gov/history/education/educator-resources/primary-source-sets/cold-war/old-soldiers-never-die-address-gen)

## Forward
I have a story, i.e. **TA**, but I won't tell you, not because it is insignificant, just because I don't want to... Being stagnated in a pond for over two decades, I became so accustomed to the placid posture of it. The ways of gearing things up, the steps to do things right which I was so acquaintance. They just deeply implanted in my brain unconsciously. 

Two years ago, I came across the other *way* when I was finding means to *modernize* my artefacts. All my works proved to be in vain, as you may know, changing the clothes of a dying man doesn't prevent him from cessation, the only effect was to put a new shroud on an old carcase... At the first sight of the *way*, I was startled and dropped to faint immediately at it's velocity and delicacy... With tremendous mental exertion, I managed to finish **TA2**.

![TA2](img/ta2.JPG)

While sitting miserably doesn't change anything. I decided to renounce my old ways, my old days and search for new dream, new deed, of course, with new way. 


## I. Back to HTTP, Back to Normal
<a href="https://docs.microsoft.com/en-us/aspnet/web-forms/">ASP.NET Web Forms</a> employs a simplified model to facilitate creation of web pages. The discussion of pros and cons is voluminous. The good things is it alleviates the burden of learning the underlay <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">HTTP</a> protocol, which gives novices a quick start. The bad things is, by default, you can not use HTTP verbs other than GET and POST<sup>[[2]](https://stackoverflow.com/questions/10906411/asp-net-web-api-put-delete-verbs-not-allowed-iis-8)</sup>and no intrinsic <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">RESTFul</a> URI support. 

HTTP verbs such as PUT and DELETE are important when <a href="https://www.w3schools.com/js/js_ajax_intro.asp">AJAX</a> comes into play, RESTful URI are important when implementing API for front-end frameworks. While some strives to survive Web Forms in the Age of .NET 5/6+<sup>[[1]](https://blog.inedo.com/dotnet/net5-web-forms)</sup>, others seek ways to migrate or quit. 

When comparing .NET Core to NodeJS, my scale is not on any language or environment heritage. While .NET Core is still under heavy development, NodeJS attains a more mature and fast-growing society, it is more lightweight and flexible, fits for both Bare-metal and Docker deployment. As a bonus, NodeJS integrates seamlessly with MongoDB and Redis, some state-of-the-art packages can not do without. 


## II. The Brothers NodeJS
<a href="https://www.npmjs.com/package/express">express</a>
> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

<a href="https://www.mongodb.com/">MongoDB</a>
> MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. 

<a href="https://redis.io/">Redis</a>
> Redis (Remote Dictionary Server) is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. 


## III. The importance of being Model
[![渡邊直美展 naomis party in taipe](img/Naomi_Party_in_TAIPEI.jpg)](https://rin.tw/naomis/)

<a href="https://mongoosejs.com/">Mongoose</a>
> Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.


## IV. <a href="https://ejs.co/">EJS</a>
>EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.

## V. <a href="https://pm2.keymetrics.io/">PM2</a>
> PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.


## VI. Summary 
[link](http://140.238.40.147:3000/task) 


## VII. Reference
1. <a href="https://blog.inedo.com/dotnet/net5-web-forms">Web Forms in the Age of .NET 5/6+: Planning for the Long Term</a>
2. <a href="https://stackoverflow.com/questions/10906411/asp-net-web-api-put-delete-verbs-not-allowed-iis-8">ASP.NET Web API - PUT & DELETE Verbs Not Allowed - IIS 8</a>

2. <a href="https://www.markdownguide.org/cheat-sheet/">Markdown Cheat Sheet</a>


## VIII. Appendix

.env file
```
# Server port 
PORT = 3000

# MongoDB 
MONGODB_URI = "mongodb+srv://your_mongodb_server_url"

# Redis
REDIS_URI = "redis://your_redis_server_url"
```


## EOF (2022/08/16)