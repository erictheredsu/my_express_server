jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/Worklist",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/Object",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/NotFound",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/Browser",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "namespaceaaa.oDataV4_worklist_demo.view."
	});

	sap.ui.require([
		"namespaceaaa/oDataV4_worklist_demo/test/integration/WorklistJourney",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/ObjectJourney",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/NavigationJourney",
		"namespaceaaa/oDataV4_worklist_demo/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});