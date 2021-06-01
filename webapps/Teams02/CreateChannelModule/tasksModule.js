function submitTask()
{
    let result = {
        "user": "this is a result",
        "password": "ko"
    };
    microsoftTeams.tasks.submitTask(result);
}