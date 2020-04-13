Data model and schema:

The data schema was designed for Url Pairs to be represented through documents.
The schema includes:
    - The automatically generated id
    - longUrl (String)
    - shortUrl (String)
The model consists of the backend code being able to:
- retrieve all Url Pair documents
- retrieve a Url Pair by the shortUrl name
- retrieve a Url Pair by the longUrl name
- delete a Url Pair given the shortUrl name
- edit a Url Pair given both the short and long url names
Both model and schema allow for the back end to accomplish the needs of the core functionality.

Reflections on Mongoose:
I believe that Mongoose was challenging when trying to learn how to validate if an item in the database existed. Specifically, I was not familiar with the query function and used find() instead of findOne() and that got me stuck for some time. Soon after accomplishing that challenge, coding in Mongoose was more manageable. I believe express was easier to use, but it's hard to compare because the last express assignment did not require us access a database.

Database Reflections:
This semester, I am taking the database management class where we mainly worked with MySQL. For planning to store data for MySQL, it required a fair amount of time for making sure table relationships were consistent and building the Schema for a MySQL database was well planned. MongoDB is much more flexible for inserting data. It was challenging for me to get a better understanding of the terminology of the MongoDB at first. Once I was able to learn more of how Documents and Collections are related, then I felt more confident working through the homework assignment.

Error Handling and Complications:
I had designed the program to handle various orders as follows:
- If a long Url or short Url key is already stored in the database, the user will not be able to create a new Url key pair.
- If the same url is submitted by multiple users, then the already existing will be returned
- If an invalid Url were supplied, then the user would be an error feedback

Additional Features, Functionality, Design Changes:
I believe that the design changes I would make would be to have a copy button (to the copy the link of the newly generated url). This would help the user easily copy the link. I would also want to make another feature to be able to send an email of the new link to the user. This would also be another helpful way for the user to have easy access to the url made.

Assumptions:
The assumptions I made include that Url pairs are deleted only given the short url. I also assumed that only links that start with http:// or https:// were the only links acceptable. This is because I am using the redirect() function when sending a GET call to a particular Url, and if a http:// or https:// is not provided at the beginning of the link, then the url will not correctly redirect the user.
