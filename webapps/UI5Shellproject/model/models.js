sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device", "sap/ui/model/odata/v4/ODataModel"], function(JSONModel, Device,ODataModel) {
    "use strict";

    return {

        createDeviceModel: function() {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createMyModel: function() {
            var oModel = new JSONModel();
            var cmp = {
                companies: [{
                    name: "Acme Inc.",
                    city: "Belmont",
                    state: "NH",
                    county: "Belknap",
                    revenue: 123214125.34,
                    "CurrencyCode": "EUR"
                }, {
                    name: "Beam Hdg.",
                    city: "Hancock",
                    state: "NH",
                    county: "Belknap",
                    revenue: 3235235235.23,
                    "CurrencyCode": "EUR"
                }, {
                    name: "Carot Ltd.",
                    city: "Cheshire",
                    state: "NH",
                    county: "Sullivan",
                    revenue: "345345.25",
                    "CurrencyCode": "EUR"
                }],
                greeting: {
                    Text: "Hi, my name is Harry Hawk"
                },
                regions: [{
                    name: "Americas",
                    companies: [{
                        name: "Acme Inc.",
                        zip: "03301",
                        city: "Belmont",
                        county: "Belknap",
                        state: "NH",
                        revenue: 123214125.34,
                        publ: true
                    }, {
                        name: "Beam Hdg.",
                        zip: "03451",
                        city: "Hancock",
                        county: "Sullivan",
                        state: "NH",
                        revenue: 3235235235.23,
                        publ: true
                    }, {
                        name: "Carot Ltd.",
                        zip: "03251",
                        city: "Cheshire",
                        county: "Sullivan",
                        state: "NH",
                        revenue: "Not Disclosed",
                        publ: false
                    }]
                }, {
                    name: "DACH",
                    companies: [{
                        name: "Taubtrueb",
                        zip: "89234",
                        city: "Ginst",
                        county: "Musenhain",
                        state: "NRW",
                        revenue: 2525,
                        publ: true
                    }, {
                        name: "Krawehl",
                        zip: "45362",
                        city: "Schlonz",
                        county: "Humpf",
                        state: "BW",
                        revenue: 2342525,
                        publ: true
                    }]
                }]
            };
            oModel.setData(cmp);
            return oModel;
        },

        createODataModel: function(){
            var oModel = new ODataModel({
                serviceUrl: "http://services.odata.org/V4/Northwind/Northwind.svc/",
                synchronizationMode : "None"
            });  
            return oModel;
        }
    };
});
