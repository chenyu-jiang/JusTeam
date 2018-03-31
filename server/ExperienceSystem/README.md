# Experience System

## Internal Interface

* deleteRecord(json, callback)

  **Parameters:**

  *json*: a json object describing what to delete.

  *example code:*

    ```Json
  {
      "deleteByID" : 12345
  }

  {
      "deleteByTeam" : 123
  }

  {
      "deleteByEvent" : 1234
  }
    ```
