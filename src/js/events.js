//
// events
//

var events = (function(){
// private properties
  var topics,
      hOP;

  topics = {};
  hOP = topics.hasOwnProperty;

  // public properties
  var getTopics,
      subscribe,
      publish;

  getTopics = function() {
    return topics;
  };
  
  subscribe = function(topic, listener) {
    // Create the topic's object if not yet created
    if(!hOP.call(topics, topic)) topics[topic] = [];

    // Add the listener to queue
    var index = topics[topic].push(listener) -1;

    // Provide handle back for removal of topic
    return {
      remove: function() {
        delete topics[topic][index];
      }
    };
  }
  publish = function(topic, info) {
    // If the topic doesn't exist, or there's no listeners
    if(!hOP.call(topics, topic)) return;

    // Cycle through topics queue, fire!
    topics[topic].forEach(function(item) {
      item(info != undefined ? info : {});
    });
  }

  return {
    getTopics : getTopics,
    subscribe : subscribe,
    publish : publish
  }
})();
