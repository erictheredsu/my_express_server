sap.ui.define([
		"UI5Shellproject/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("UI5Shellproject.controller.NotFound", {

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