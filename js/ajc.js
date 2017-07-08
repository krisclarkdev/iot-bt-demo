$(document).ready(function() {
    var viewers    = [];
    var options    = [];
    var reportName = '/Public/BIRT and BIRT Studio Examples/iot.rptdocument';
    var containers = ['container1', 'container2', 'container3', 'container4', 'container5', 'container6', 'container7', 'container8'];
    var bookmarks  = ['stats_table', 'channel_usage_white', 'signal_strength_per_channel_white', 'signal_to_noise_per_channel_white', 'signal_to_noise_per_channel_white', 'channel_usage_white', 'signal_to_noise_per_channel_white', 'stats_table'];

    var toolbarVisible = false;
    var repoType = 'Workgroup';
    var customParams = {};
    var reqOps;
    var hostname = window.location.hostname;
    var port     = 8080;
    var path     = 'ajc';

    var getQualifiedPath = function() {
      return 'http://' + hostname + ':' + port + '/' + path;
    };

    var initJSAPI = function(callback) {
        actuate.load('viewer');
        reqOps = new actuate.RequestOptions();
        reqOps.setRepositoryType(repoType);
        reqOps.setCustomParameters(customParams);

        if(callback !== undefined) {
            callback();
        }
    };

    var viewerInit = function() {
        for(var i=0; i<containers.length; i++) {
            var tempViewer = new actuate.Viewer(containers[i]);
            tempViewer.setWidth(950);
            tempViewer.setReportName(reportName);
            tempViewer.setReportletBookmark(bookmarks[i]);

            var tempOptions = new actuate.viewer.UIOptions();
            tempOptions.enableToolBar(toolbarVisible);
            console.log(tempOptions);
            tempViewer.setUIOptions(tempOptions);

            viewers.push(tempViewer);
        }

        renderViewers();
    };

    var renderViewers = function() {
        for(var i=0; i<viewers.length; i++) {
            viewers[i].submit();
        }
    };

    initJSAPI(function() {
        actuate.initialize(getQualifiedPath(), reqOps == undefined ? null : reqOps, null, null, viewerInit);
    });

});
