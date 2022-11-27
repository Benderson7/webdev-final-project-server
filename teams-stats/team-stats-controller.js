import * as teamsStatsDao from "./teams-stats-dao.js";

const TeamsStatsController = (app) => {


    app.post('/users/:uid/likes/:mid', userLikesTeam)
    app.delete('/users/:uid/likes/:mid', userRemovesLikesTeam)
    app.post('/users/:uid/dislikes/:mid', userDislikesTeam)
    app.delete('/users/:uid/dislikes/:mid', userRemovesDislikesTeam)
}