sap.ui.define([
	"UI5Shellproject/controller/BaseController",
	"UI5Shellproject/model/models"
], function(BaseController, models) {
    "use strict";

    return BaseController.extend("UI5Shellproject.controller.databinding", {
		onInit: function() {
			//Init JsonModel, to avoid overlap with default odata model			
			var JsonModel = models.createMyModel();
			this.getView().byId("greeting1").setModel(JsonModel);
        	this.getView().byId("companyList").setModel(JsonModel);
			this.getView().byId("vLayout").setModel(JsonModel);
			this.getView().byId("atable").setModel(JsonModel);


		},
        OnClick: function() {


    	},
    	onUpdateFinished : function() {
    		var that = this;
    	}
    });
});
