sap.ui.define([
	"UI5Shellproject/controller/BaseController",
	"sap/m/MessageBox", 
	"sap/ui/model/json/JSONModel"
	], function(BaseController, MessageBox, JSONModel) {
    "use strict";

    return BaseController.extend("UI5Shellproject.controller.HelloWorld", {
        onInit: function() {
            //Init Properties
            this.onInitMatrix1();
            this.onInitMatrix2();

        },

        onInitMatrix1: function() {
            var that = this;
            var oMatrix = this.byId("matrix1");
            var oLabel = new sap.ui.commons.Label({
                id: 'L-UUID-Name-Parent',
                text: 'Parent UUID Name'
            });
            oMatrix.createRow(oLabel);

            var oTF = new sap.ui.commons.TextField({
                id: 'TF-UUID-Name-Parent',
                tooltip: 'Parent UUID Name',
                value: 'ORDR_PRICE_MODE',
                width: '100%'
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-UUID-Value-Parent',
                text: 'Parient UUID Value'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.TextField({
                id: 'TF-UUID-Value-Parent',
                tooltip: 'Parient UUID Value',
                value: '1639bc5c-fc33-47d1-891d-7846f439c2bd',
                width: '100%'
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-position',
                text: 'position'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.ComboBox({
                id: 'TF-position',
                tooltip: 'position',
                items: [{
                    text: "before",
                    key: "before"
                }, {
                    text: "after",
                    key: "after"
                }],
                width: '100%',
                value: "before"
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-tag',
                text: 'Tag'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.ComboBox({
                id: 'TF-tag',
                tooltip: 'Tag',
                items: [{
                    text: "button",
                    key: "button"
                }, {
                    text: "property",
                    key: "property"
                }, {
                    text: "group",
                    key: "group"
                }],
                width: '100%',
                value: "button"
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-UUID',
                text: 'uuid'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.TextField({
                id: 'TF-UUID',
                tooltip: 'uuid',
                value: 'U_SUM',
                width: '100%'
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-label',
                text: 'Label'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.TextField({
                id: 'TF-label',
                tooltip: 'Label',
                value: 'Sum of X(UDF)',
                width: '100%'
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-edit-add',
                text: 'editableAddMode'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.ComboBox({
                id: 'TF-edit-add',
                tooltip: 'editableAddMode',
                items: [{
                    text: "true",
                    key: "true"
                }, {
                    text: "false",
                    key: "false"
                }],
                width: '100%',
                value: "true"
            });
            oMatrix.createRow(oTF);

            oLabel = new sap.ui.commons.Label({
                id: 'L-edit-update',
                text: 'editableUpdateMode'
            });
            oMatrix.createRow(oLabel);

            oTF = new sap.ui.commons.ComboBox({
                id: 'TF-edit-update',
                tooltip: 'editableUpdateMode',
                items: [{
                    text: "true",
                    key: "true"
                }, {
                    text: "false",
                    key: "false"
                }],
                width: '100%',
                value: "false"
            });
            oMatrix.createRow(oTF);

            oTF = new sap.ui.commons.Button({
                text: "Add Code",
                press: function() {
                    //MessageBox.alert("Add Code");
                    that.onCreateNewLayoutCode();
                }
            });
            oMatrix.createRow(oTF);
        },

        onCreateNewLayoutCode: function() {
            var that = this;

            var _name = sap.ui.getCore().getControl('TF-UUID-Name-Parent').getValue();
            var _uuid = sap.ui.getCore().getControl('TF-UUID').getValue();
            var _label = sap.ui.getCore().getControl('TF-label').getValue();
            var _pos = sap.ui.getCore().getControl('TF-position').getValue();
            var _tag = sap.ui.getCore().getControl('TF-tag').getValue();
            var _add = sap.ui.getCore().getControl('TF-edit-add').getValue();
            var _update = sap.ui.getCore().getControl('TF-edit-update').getValue();

            var sCode = "{\r\n";
            sCode = sCode + "\tposition: \"" + _pos + ":${" + _name + "}\",\r\n";
            sCode = sCode + "\tdata:{\r\n";
            sCode = sCode + "\t\t$tag: \"" + _tag + "\",\r\n";
            sCode = sCode + "\t\tlabel: \"" + _label + "\",\r\n";
            sCode = sCode + "\t\tuuid: " + _uuid + ",\r\n";
            sCode = sCode + "\t\tvisibleUpdateMode: \"" + _update + "\",\r\n";
            sCode = sCode + "\t\tvisibleViewMode: \"" + _add + "\",\r\n";
            sCode = sCode + "\t}\r\n";
            sCode = sCode + "}";
        },

        onInitMatrix2: function() {
            var oMatrix = this.byId("matrix2");

            var oLabel = new sap.ui.commons.Label({
                text: 'Before Button Click'
            });
            oMatrix.createRow(oLabel);
            oMatrix.createRow(this.CreateNewEventEditor("bbc"));

            oLabel = new sap.ui.commons.Label({
                text: 'After Button Click'
            });
            oMatrix.createRow(oLabel);
            oMatrix.createRow(this.CreateNewEventEditor("abc"));

            oLabel = new sap.ui.commons.Label({
                text: 'Change Textbox'
            });
            oMatrix.createRow(oLabel);
            oMatrix.createRow(this.CreateNewEventEditor("ctb"));

            oLabel = new sap.ui.commons.Label({
                text: 'Column Value Changed'
            });
            oMatrix.createRow(oLabel);
            oMatrix.createRow(this.CreateNewEventEditor("cvc"));

        },

        CreateNewEventEditor: function(sId) {
            var aid = "TF-Editor" + sId;
            var oTF = new sap.ui.commons.TextField({
                id: aid,
                value: '',
                width: '80%'
            });

            aid = "menuButton" + sId;
            var oMenuButton = new sap.ui.commons.MenuButton({
                id: aid,
                icon: 'sap-icon://vertical-grip',
                width: '20%'
            });
            //Create the menu
            var oMenu1 = new sap.ui.commons.Menu("menu1" + sId,{
                ariaDescription: "menu1",
                tooltip: "Menu containing file related actions"
            });
            //Create the items and add them to the menu
            var oMenuItem1 = new sap.ui.commons.MenuItem("selFun_" + sId,{
                text: "Select Function"
            });
            //Icon must be not larger than 16x16 px
            oMenu1.addItem(oMenuItem1);
            var oMenuItem2 = new sap.ui.commons.MenuItem("newFun_" + sId,{
                text: "New Function"
            });
            oMenu1.addItem(oMenuItem2);
            var oMenuItem3 = new sap.ui.commons.MenuItem("openIn_" + sId,{
                text: "Open In Editor"
            });
            oMenu1.addItem(oMenuItem3);
            oMenuButton.setMenu(oMenu1);

            oMenuButton.attachItemSelected(this.onMenuClick.bind(this));

            var oCell = new sap.ui.commons.layout.MatrixLayoutCell();
            oCell.addContent(oTF);
            oCell.addContent(oMenuButton);
            return oCell;
        },

        onMyEvent: function(oEvt) {
            MessageBox.alert("OK");
        },

        onMenuClick: function(oEvt) {
            //alert("Items \"" + oEvt.getParameter("itemId") + "\" was selected.");
            var itemid = oEvt.getParameter("itemId");
            var type = itemid.split('_')[0];
            switch (type) {
            case "selFun":
                this.onSelectFunc(oEvt);
                break;
            case "newFun":
                this.onNewFunc(oEvt);
                break;
            case "openIn":
                this.onOpenFunc(oEvt);
                break;
            default:
                break;
            }
        },

        onSelectFunc: function(oEvt) {
            var that = this;
            var oChannels = {
                channels: [{
                    key: "event1"
                }, {
                    key: "event2"
                }, {
                    key: "event3"
                }, {
                    key: "event4"
                }]
            };
            var oChannelModel = new sap.ui.model.json.JSONModel(oChannels);

            var oComboBox = new sap.ui.commons.ComboBox({
                selectedKey: "event1",
                items: {
                    path: "/channels",
                    template: new sap.ui.core.ListItem({
                        key: "{key}",
                        text: "{key}"
                    })
                },
                change : function(oEvt){
                   that.txtInput = this.getValue();     
                }
            });
            oComboBox.setModel(oChannelModel);
            var _oOC = new sap.ui.commons.Dialog({
                modal: true,
                showCloseButton: true,
                autoClose: true,
                resizable: true
            });
            _oOC.setTitle("Choose your evnet for generate code");
            _oOC.addContent(new sap.ui.commons.Label({
                text: "events"
            }));
            _oOC.addContent(oComboBox);
            _oOC.addButton(new sap.ui.commons.Button({
                text: "OK",
                press: function() {
                    _oOC.close();
                }
            }));
            _oOC.addButton(new sap.ui.commons.Button({
                text: "Cancel",
                press: function() {
                    _oOC.close();
                }
            }));
            _oOC.open();
        },

        generateNewFuncCode: function(sFuncName) {
            var that = this;
            var sCode = "\t/**\r\n";
            sCode = sCode + "\t*@memberOf Sample B1 Thin Client AddOn\r\n";
            sCode = sCode + "\t*/\r\n";
            sCode = sCode + "\t" + sFuncName + ": function(oEvent) {\r\n";
            sCode = sCode + "\t//This code was generated by the layout editor.\r\n";
            sCode = sCode + "\t},";

        },
        
        tmpsId :null,
        txtInput: null,
        newFuncDlg: null,
        onNewFunc: function(oEvt) {
            //MessageBox.alert("New Function");
            var that = this;
            var _dlg = that.newFuncDlg;

            that.tmpsId = "TF-Editor" + oEvt.getParameter("itemId").split('_')[1];
            if (!_dlg) {
                var _dlg = new sap.ui.commons.Dialog({
                    modal: false,
                    showClosebutton: true,
                    autoClose: true,
                    resizeable: false
                });

                var btnOK = new sap.ui.commons.Button({
                    text: "OK",
                    enable: false,
                    press: function() {
                        if (this.getEnabled()) {
                            that.generateNewFuncCode(that.txtInput);
                            sap.ui.getCore().getControl(that.tmpsId).setValue(that.txtInput);
                            _dlg.close(); 
                        }
                    }
                });
                _dlg.addButton(btnOK);
                _dlg.addButton(new sap.ui.commons.Button({
                    text: "Cancel",
                    press: function() {
                        _dlg.close();
                    }
                }));
                _dlg.setTitle("New Function");
                _dlg.addContent(new sap.ui.commons.Label({
                    text: "The new function will be added to you addon file",
                    width: "100%"
                }));
                _dlg.addContent(new sap.ui.commons.Label({
                    text: "Enter a function name:",
                    width: "100%"
                }));

                var input = new sap.ui.commons.TextField({
                    id: "funcInput",
                    placeholder: "Enter a valid JavaScript function name",
                    liveChange: function(oEvent) {
                        //btnOK.enable = (oEvent.getParameter("liveValue") !== "")?  true : false;
                        var txt = oEvent.getParameter("liveValue");
                        if (txt.length !== 0) {
                            this.enable = true;
                        } else {
                            this.enable = false;
                        }
                        that.txtInput = txt;
                    },
                    width: "100%"
                });
                _dlg.addContent(input);
                that.newFuncDlg = _dlg;
            }
            _dlg.open();
        },

        onOpenFunc: function(oEvt) {
            //MessageBox.alert("Open In Editor");
            this._addCodeToContent("", "this a test", "Func");
        },

        _addCodeToContent: function(curContent, sCode, sType) {
            var that = this;
            if (curContent.trim().length === 0) {
                curContent = "define(function() {\r\n";
                curContent += "\treturn{\r\n";
                curContent += "\t\tlayouts: [{\r\n";
                curContent += "\t\t}]\r\n";
                curContent += "\t\t\r\n";
                curContent += "\t};\r\n";
                curContent += ")};\r\n";
            }

            var pos, tmpBefore, tmpAfter;

          if (sType === "Func") {
                pos = curContent.indexOf("layouts: [{") -1;
                tmpBefore = curContent.substr(0, pos - 1);
                tmpAfter = curContent.substr(pos);

                curContent = tmpBefore + "\r\n";
                 curContent += "\t\t" +sCode + ",\r\n";
                curContent += tmpAfter;
            } 
            else if(sType === "Layout")
            {
                pos = curContent.indexOf("layouts: [{")+12;
                tmpBefore = curContent.substr(0, pos - 1);
                tmpAfter = curContent.substr(pos); 

                curContent = tmpBefore + "\r\n";
                curContent += "\t\t" +sCode + ",\r\n";
                curContent += tmpAfter;
            }

            return curContent;
        },

    });
});
