dojo.provide("phpr.Default.Grid");

// Other classes, class specific
dojo.require("phpr.grid");
dojo.require("phpr._EditableGrid");

dojo.declare("phpr.Default.Grid", [phpr.Component, phpr._EditableGrid], {
	
	gridLayout:[],
	_node:null,
	
	constructor: function(updateUrl, main, id) {
		this._node  = dojo.byId("gridBox");
		this.main   = main;
		this.id     = id;
		
		if (dijit.byId(this._node)) {
			phpr.destroyWidgets(this._node);
		}
		if (dijit.byId("headerContext")) {
			phpr.destroyWidgets("headerContext");
		}
		if (dijit.byId("gridContext")) {
			alert("destroy:!!!");
			phpr.destroyWidgets("gridContext");
		}		
		this.render(["phpr.Default.template", "grid.html"], this._node);
		
		this.grid = {
			widget:null,
			model:null,
			layout:null
		};
		
		this.gridLayout = new Array();
		this.gridStore  = new phpr.grid.ReadStore({url: phpr.webpath+"index.php/"+phpr.module+"/index/jsonList/nodeId/"+id});
		this.grid.model = new phpr.grid.Model(null, null, {
			store: this.gridStore
		});
		
		this.grid.model.requestRows(null,null, dojo.hitch(this, "onLoaded"));
	},
    
    /**
     * Called when the grid was loaded 
     * 
     */
    onLoaded:function() {
        this.grid.widget = dijit.byId("gridNode");
        
		dojo.connect(dijit.byId("saveChanges"), "onClick",         dojo.hitch(this, "saveChanges"));
		dojo.connect(this.grid.widget,          "onRowClick",   dojo.hitch(this, "onRowClick"));
		dojo.connect(this.grid.widget,          "onApplyCellEdit", dojo.hitch(this, "onCellEdit"));
		
		window["gridHeaderContextMenu"] = dijit.byId("headerContext");
        gridHeaderContextMenu.bindDomNode(this.grid.widget.domNode);
        
		this.grid.widget.onCellContextMenu = function(e) {
				cellNode = e.cellNode;
			};
			
		this.grid.widget.onHeaderContextMenu = function(e) {
				cellNode = e.cellNode;
			};
			
		this.grid.widget.setModel(this.grid.model);
		
		meta = this.grid.widget.model.store.metaData;
		
		for (var i = 0; i < meta.length; i++) {
			switch(meta[i]["type"]){
				case'selectbox':
					var range = meta[i]["range"];
					var opts  = new Array();
					var vals  = new Array();
					var j=0;
					for (j in range){
						vals.push(range[j]["id"]);
						opts.push(range[j]["name"]);
						j++;
					}
					this.gridLayout.push({
						name:    meta[i]["label"],
						field:   meta[i]["key"],
						styles:  "text-align:center;",
						width:   "auto",
						editor:  dojox.grid.editors.Select,
						options: opts,
						values:  vals
					});
					break;
					
				case'date':
					this.gridLayout.push({
						name:      meta[i]["label"],
						field:     meta[i]["key"],
						styles:    "text-align:center;",
						width:     "auto",
						formatter: phpr.grid.formatDate,
						editor:    dojox.grid.editors.DateTextBox
					});
				    break;
				
				default:
					this.gridLayout.push({
						name:   meta[i]["label"],
						field:  meta[i]["key"],
						styles: "text-align:center;",
						width:  "auto",
						editor: dojox.grid.editors.Input
						});
				    break;
			}
		}
		var opts  = new Array();
		var vals  = new Array();
		//just temp until server returns valid data
		var range =[{"id":"1","name":"1"},{"id":"2","name":"2"}]
		var j=0;
		this.gridLayout.push({
						name:   "Tags",
						field:   "tags",
						styles: "text-align:center;",
						width:  "auto",
						options: range,
						editor: phpr.grid.editors.MultiComboBox
						});
		var gridStructure = [{
				noscroll: true,
            	cells: [this.gridLayout]
			}];
			
        this.grid.widget.setStructure(gridStructure);
        
        this._filterForm = dijit.byId("gridFilterForm");
        dojo.connect(dijit.byId("gridFilterSubmitButton"),"onClick", dojo.hitch(this, "onSubmitFilter"));
		
    },

    onSubmitFilter: function() {
        var vals   = {};
        var values = this._filterForm.getValues();
        
        for (var i in values) {
            vals["filter["+i+"]"] = values[i];
        }
        
        this.grid.model.query = vals;				
		this.grid.model.clearData();
        this.grid.model.requestRows(null, null, dojo.hitch(this, function() {
            this.grid.widget.updateRowCount(this.grid.model.getRowCount());
        }));
    },

	onRowClick: function(e) {
		var rowID=this.grid.model.getDatum(e.rowIndex,0);
		this.publish("grid.RowClick", [rowID]); 
		
	},
	
	onCellEdit: function(inValue, inRowIndex, inFieldIndex){
		var value = this.grid.model.getDatum(inRowIndex,inFieldIndex);
		
		this.publish("grid.CellEdit", [value, inRowIndex, inFieldIndex]); 
		this.cellEdited(value, inRowIndex, inFieldIndex);
		
	}
});