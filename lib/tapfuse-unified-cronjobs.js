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
  tp_unicron_addCronJob(options) {
    // timeInterval must be text, e.x. 2 minutes
    tpCronJobs.insert({
      jobName: options.cronJobName,
      interval: options.timeInterval,
      functionName: options.functionName,
      parameters: options.params,
    });
  },
  tp_unicron_pauseCronJobs() {
    SyncedCron.pause();
  },
  tp_unicron_unpauseCronJobs() {
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
