sap.ui.define([
		"UI5Shellproject/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("UI5Shellproject.controller.App", {

			onInit : function () {
				var oViewModel,
					fnSetAppNotBusy,
					iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});
				this.setModel(oViewModel, "appView");

				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			},
			onCollapseExapandPress: function (event) {
				var navigationList = this.getView().byId('navigationList');
				var expanded = !navigationList.getExpanded();
 
				navigationList.setExpanded(expanded);
			},
			onPress : function (oEvent) {
				// The source is the list item that got pressed
				var routeName = oEvent.getSource().getText();
				if(!routeName.startsWith('Sub '))
				{
					this.byId('navigationList').setExpanded(false);
					this.getRouter().navTo(routeName, {}, true);
				}

			}
		});

	}
);