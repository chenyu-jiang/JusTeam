# JusTeam
Development of future software engineers.

## Client-Server Interfaces

* /api
    * /api/posts
        * api/posts/upload
          * api/posts/upload/pictures

              Post pictures to this url.

              **Requirements**: One file at a time.

              **Method**: POST

              **Fields**: 

              1. *image* : image file

              **Response**:

              ```json
              {"path" :"RELATIVE_PATH/TO/FILE.png"}
              ```

          * api/posts/upload/articles

            Post text content to this url.

            **Requirements**: One file at a time.

            **Method**: POST

            **Fields**: 

            1. *article*: article content 
            2. *isNew*: new post or draft 
            3. *postID*: if not new post, the old postID must be submitted

            **Response**:
            ```json
            {
                "status": true
                "postID": 12345
            }
            ```

        * api/posts/setStat

          Set the status of the post (Draft/Final).

          **Requirements**: None.

          **Method**: GET

          **Parameters**:

          1. postID: id of the post that needs changing status

          **Response**:
          ```json
          {"status": true}
          ```

        * api/posts/attachActivity

          Attach a post to an activity.

          **Requirements**: TBA.

          **Method**: GET

          **Parameters**:

          1. postID: id of the post
          2. activityID: id of the activity

          **Response**:
          ```json
          {"status": true}
          ```

    * /teams

    * /accounts
