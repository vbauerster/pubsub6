export default (function () {
    'use strict';

    var topics = Object.create(null);
    var hasOwn = Object.prototype.hasOwnProperty;

    return {
        publish: function (topic, args) {
            if (!hasOwn.call(topics, topic)) {
                return false;
            }
            setTimeout(function () {
                var topicMap = topics[topic];
                for (var symbol of Object.getOwnPropertySymbols(topicMap)) {
                    topicMap[symbol](topic, args);
                }
            }, 0);
            return true;
        },
        subscribe: function (topic, func) {
            if (typeof func !== 'function') {
                return false;
            }
            // register topic, if not registered yet
            if (!hasOwn.call(topics, topic)) {
                topics[topic] = Object.create(null);
            }
            var token = Symbol(topic);
            topics[topic][token] = func;
            // return token for unsubscribing
            return token;
        },
        unsubscribe: function (token) {
            for (var topic of Object.keys(topics)) {
                if (hasOwn.call(topics[topic], token)) {
                    return delete topics[topic][token];
                }
            }
            return false;
        }
    };

})();
