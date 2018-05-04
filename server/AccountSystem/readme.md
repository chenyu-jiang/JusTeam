#Account System
#Module
* editInformation
* login
* logout
* register
* requestInformation

--------------------
###Register

* Introduction: the module for user registration.

* Input: A JSON file. Example:

  ```json
  {
      "gender": M,
      "phone": 55555555
  }
  ```

  Note: "birthday" should have format as `yyyy-mm-dd`.

* Output: JSON file include:

```json
{
    "regState": true/false,
    "error"(if "regState" == false): error massage
}
```

### Login

- Introduction: the module for user log in.

- Input: A JSON file. Example:

  ```json
  {
      "userID": userID,
      "password": 123
  }
  ```

- Output: JSON file include:

```json
{
    "loginState": true/false,
    "error"(if "loginState" == false): error massage
}
```

### Edit Information

- Introduction: edit user's personal information.

- Input: A JSON file. Example:

  ```json
  {
      "gender": newGender,
      ....
  }
  ```

- Output: JSON file include:

```json
{
    "editState": true/false,
    "error"(if "loginState" == false): error massage
}
```

### Request Information

- Introduction: edit user's personal information.

- Input: A JSON file. Example:

  ```json
  {
      "userID": 26;
  }
  ```

- Output: JSON file include:

```json
{
    "editState": true/false,
    "error"(if "loginState" == false): error massage
}
```
