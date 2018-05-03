/**
* Project           : JusTeam/client
*
* Module name       : Urlparams
*
* Author            : XU Lu
*
* Date created      : 20180330
*
* Purpose           : Exporting backend urls for other modules and services,
*                      related to account, team, notification and post system.
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180401    XU Lu        1      added urls for post system
* 20180402    XU Lu        2      modified urls for form submition
* 20180403    XU Lu        3      modified account related urls due to backend redesign
**/

module.exports=
{
    _domain:"http://localhost:3001/",

    _log_in:"api/account/login/",
    _log_out:"api/account/logout",
    _sign_up:"api/account/register/",
    _get_user_info:"api/account/requestInformation/",
    _edit_account_info:"api/account/editInformation/",


    _new_noti_num:"api/notifications/new/number/",
    _new_noti_list:"api/notifications/new/content/",
    _noti_history:"api/notifications/history/",
    _noti_delete:"api/notifications/delete/",

    _upload_image:"api/posts/upload/pictures/",

    _create_team:"api/team/teamOP/createTeam/",
    _delete_team:"api/team/teamOP/deleteTeam/",
    _edit_team:"api/team/teamOP/editTeam/",
    _add_team_member:"api/team/teamOP/addMember/",
    _delete_team_member:"api/team/teamOP/deleteMember/",
    _edit_team_member_authority:"api/team/teamOP/editAuthority/",
    _view_one_team:"api/team/teamInfo/viewOneTeam/",
    _join_team:"api/team/teamOP/applyForTeam/",

    _get_recommend_team:"api/team/teamInfo/getRecommend/",
    _get_user_teams:"api/team/teamInfo/getUserTeams/",

    _get_team_events:"api/event/eventInfo/getTeamEvents/",
    _get_one_event:"api/event/eventInfo/viewOneEvent/",
    _create_event:"api/event/eventOP/createEvent/",
    _delete_event:"api/event/eventOP/deleteEvent/",
    _edit_event:"api/event/eventOP/editEvent/",

    _send_post:"api/posts/upload/articles",

    _search_team: "api/search/team",
}
