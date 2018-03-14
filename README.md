# JusTeam
Development of future software engineers.

## Interface URL Format
###POSTs:

* /api
    * /posts
        * /upload
          * /pictures
              Post pictures to this url.
              Requirements: One file at a time.

              Fields: 1. image : image file

              Response:

              ```json
              {
                  "path" :"RELATIVE_PATH/TO/FILE.png",
              }
              ```

          * /articles
            Post text content to this url.

            Requirements: One file at a time.

            Fields: 1. article: article content 2. isNew: new post or draft 3. postID

            Response:
            ```json
            {
                "status": true
            }
            ```

    * /teams

    * /accounts
