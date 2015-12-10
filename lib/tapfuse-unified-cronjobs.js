tpCronJobs = new Mongo.Collection('tp_cronJobs');

Meteor.startup(() => {
  tpCronJobs.find().observe({
    added: function(doc) {
      addJob(doc);
    },
    removed: function(doc) {
      SyncedCron.remove(doc.cronJobName);
    },
  });

  SyncedCron.start();
});

Meteor.methods({
  addCronJob(options) {
    // timeInterval must be text, e.x. 2 minutes
    tpCronJobs.insert({
      jobName: options.cronJobName,
      interval: options.timeInterval,
      functionName: options.functionName,
      parameters: options.params,
    });
  },
  pauseCronJobs() {
    SyncedCron.pause();
  },
  unpauseCronJobs() {
    SyncedCron.start();
  },
});

function addJob(options) {
  SyncedCron.add({
    name: options.cronJobName,
    schedule: function(parser) {
      return parser.text(options.timeInterval);
    },
    job: function() {
      Meteor.call(options.functionName, options.parameters);
    },
  });
}
