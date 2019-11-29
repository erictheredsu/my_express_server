sap.ui.define([
		"namespaceaaa/oDataV4_worklist_demo/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("namespaceaaa.oDataV4_worklist_demo.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);