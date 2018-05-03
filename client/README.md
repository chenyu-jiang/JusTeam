The current page structure is:

## App.js(page router)

* HomePage.js
* LoginPage.js
  - LoginForm.js
* SignUpPage.js
  - SignUpForm.js
* ResetPasswordForm.js (may include)



## HomePage.js

* Top bar
* HomeRouter.js (May use Redux instead of router)
  + Dashboard.js
  + AccountInfoPage.js
  + NotiPage.js

## Dashboard.js

* Section selector buttons
* Sections
* - MyTeamsPage.js
  - Teaming.js
  - Discover.js





## LoginForm.js

Inputfields: userID, password, remember (false/true)

Json submitting to backend:

```
{"userID":"somename","password":"somepassword","remember":true}
```



