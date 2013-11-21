define([
  '../../../../api',
  '../../../../api/command-patch',
  '../../../../api/selection'
], function (
  api
) {

  'use strict';

  return function () {
    return function (editor) {
      var boldCommand = new api.CommandPatch('bold');

      /**
       * Chrome: Executing the bold command inside a heading corrupts the markup.
       * Disabling for now.
       */
      boldCommand.queryEnabled = function () {
        var selection = new api.Selection();
        var headingNode = selection.getContaining(function (node) {
          return (/^(H[1-6])$/).test(node.nodeName);
        });

        return api.CommandPatch.prototype.queryEnabled.apply(this, arguments) && ! headingNode;
      };

      // TODO: We can't use STRONGs because this would mean we have to
      // re-implement the `queryState` command, which would be difficult.

      editor.patchedCommands.bold = boldCommand;
    };
  };

});