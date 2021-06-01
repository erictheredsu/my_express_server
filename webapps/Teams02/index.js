function openTask()
{
    let taskInfo = {
        title: "my first module",
        height: "medium",
        width: "medium",
        url:  "https://pvgd34362085a.apj.global.corp.sap/Teams02/tasksModule.html",
        card: null,
        fallbackUrl: null,
        completionBotId: null,
        };
        submitHandler = (err, result) => {
            console.log(err);
            console.log(result);
        };
        microsoftTeams.tasks.startTask(taskInfo, submitHandler);
}