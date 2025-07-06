<u><b>Golang Interfaces - A Basic Introduction</b></u>

</br>
I'll admit, it took me an embarrassingly long time to actually get round using interfaces in Golang, but that can be attributed mostly to my lack of testing when I first started learning the language. Now I have some time in it, I might go as far as saying I'm in love.

<br>

To put it simply, you should use interfaces when you have a function which might need to access the same methods from different sources, it does what it says on the box. This could look like having a real database client which connects to a MySQL instance and a mocked client which you use for testing, or maybe you have a function which needs to call two different APIs, as long as both your API clients fulfill the methods interfaces, they can both be used. 

<br/>

So let's take a look at how this could be done in code:

<br/>
<b>db.go</b>
```
package db

import (
  "sql"
  _ "github.com/go-sql-driver/mysql"
)

// This is our interface, it will tell us every method that a struct needs so that it can be used in place of the interface
type DatabaseInterface interface {
  GetUser(id int) (string, error)
}

// Defining our real database client

type DbClient struct {
  dbConn *sql.DB
}

func GetDatabaseClient() (*DbClient, err) {

  dsn := "your mysql dsn string"
  db, err := sql.Open("mysql", dsn)
  if err != nil {
    return nil, err
  }
  return &DbClient{
    dbConn: db
  }, nil
}

func (dbClient DbClient) GetUser(id int) (string, error) {
  user := ""
  // some code to get the username by id from your database
  return user, nil
}
```
<br>

<b>db_test.go</b>
```
package db

import (
  "fmt"
)

// Defining our test client
type TestDBClient{}

func GetTestDatabaseClient() (*TestDBClient, error) {
  return &TestDBClient{}, nil
}

func (testDbClient TestDbClient) GetUser(id int) (string, error) {
  if id == 2 {
    return "", fmt.Errorf("error getting user of id=%v, no record found", id)
  }
  return "Xiao Xiong", nil
}
```

<br>
And that's it! You now have two datasources which could be used in place of the `DatabaseInterface` value, since they both have the `GetUser` method defined against them. See how we can do that below:

<br>
<b>main.go</b>
```
package main

import (
  ".../db"
  "fmt"
)

func GreetUser(dbClient db.DatabaseInterface, userId int) error {
  name, err := dbClient.GetUser(userId)
  if err != nil {
    return err
  } else {
    log.Println(fmt.Sprintf("Hello, %v!", name))
  }
}

func main() {

  // getting our real database connection
  dbClient, _ := db.GetDatabaseClient()

  // getting our test database connection
  testDbClient := db.GetTestDatabaseClient()

  // run function using our real client
  GreetUser(dbClient, 1)

  // run function using our test client
  GreetUser(testDbClient, 1)
}

```

<br>

Now in response, the first call to `GreetUser` will return the username (or error) of whatever exists in the row of id 1 of our users table, and for the second call, we will always get the response "Hello, Xiao Xiong!" as this is what our test client is pre-determined to do. 

<br>

And that's it for now, there is more you can use interfaces for and this is not a comprehensive overview but instead should provide a good start.

<br>

Thank you for reading!