/**
* Project           : JusTeam/client
*
* Module name       : initState
*
* Author            : XU Lu
*
* Date created      : 20180310
*
* Purpose           : exporting a default initial state for redux
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180331     XU Lu       1      Added viewingTeamID
* 20180403     XU Lu       2      Added default logo
**/


const initState={
    userID:undefined,
    notiNum:0,
    viewingTeamID:undefined,
    toPath:undefined,
    logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2r4uSC5xu2dEbP3ZuZaesZ03dzpIxI9Xblxc_6ghqD7rYFNvv",
    fromUrl:undefined,
}
export  default  initState;
