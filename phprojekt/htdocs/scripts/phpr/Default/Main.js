dojo.provide("phpr.Default.Main");

// We need the dtl for rendering the template (Default.html).
dojo.require("dojox.dtl");

dojo.require("phpr.Component");

// Load the widgets the template uses.
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.Toolbar");
dojo.require("dijit.form.Button");
dojo.require("dojo.data.ItemFileReadStore");

dojo.declare("phpr.Default.Main", phpr.Component, {
    
    tree: 	          null,
    grid:             null,
    module:           null,
    availableModules: null,
    
    constructor:function(){
    },
    
    openForm: function(id){
        this.form = new this.formWidget(this,id);
    },
    
    loadSubElements: function(project){
        phpr.currentProjectId = project.id;
        this.setSubmoduleNavigation();
        var updateUrl = phpr.webpath + 'index.php/' + phpr.module + '/index/save/navId/'+phpr.currentProjectId;
        this.grid     = new this.gridWidget(updateUrl, this, phpr.currentProjectId);
        if (dijit.byId("detailsBox")) {
            phpr.destroyWidgets("detailsBox");
        }		
    },
    
    submitForm: function(id,parent){
        var updateUrl = phpr.webpath + 'index.php/' + phpr.module + '/index/jsonSave/id/';
        this.tree     = new this.treeWidget(this,'Project');
        this.grid     = new this.gridWidget(updateUrl,this,parent);
    },
    
    load:function(){
        //summary: This function initially renders the page
        //description: This function should only be called once as there is no need to render the whole page
        //later on. Use reload instead to only replace those parts of the page which should change
		
		// important set the global phpr.module to the module which is currently loaded!!!
        phpr.module = this.module;
        this.render(["phpr.Default.template", "main.html"], dojo.body(),{webpath:phpr.webpath, currentModule:phpr.module});
        dojo.addOnLoad(dojo.hitch(this, function() {
                // Load the components, tree, list and details.
                this.setSubmoduleNavigation();
                var updateUrl = phpr.webpath + 'index.php/'+phpr.module+'/index/jsonSave/nodeId/' + phpr.currentProjectId;
                this.tree     = new this.treeWidget(this);
                this.grid     = new this.gridWidget(updateUrl, this, phpr.currentProjectId);
            })
        );
    },
    
    reload:function(){
		// important set the global phpr.module to the module which is currently loaded!!!
        phpr.module = this.module;
        this.setSubmoduleNavigation();
        this.tree     = new this.treeWidget(this);
        var updateUrl = phpr.webpath + 'index.php/'+phpr.module+'/index/jsonSave/nodeId/' + phpr.currentProjectId;
        this.grid     = new this.gridWidget(updateUrl, this, phpr.currentProjectId);
        // destroy form if exists
        if (dijit.byId("detailsBox")) {
            phpr.destroyWidgets("detailsBox");
        }		
    },
    
    setSubmoduleNavigation: function(){
        this.getSubmodules();
        var navigation ="";
        for(i in this.availableModules){
            var moduleName  = this.availableModules[i]["name"];
            var moduleLabel = this.availableModules[i]["label"];
            navigation += this.render(["phpr.Default.template", "navigation.html"], null,{moduleName:moduleName, moduleLabel:moduleLabel});
            i++;
        }
        dojo.byId("subModuleNavigation").innerHTML = navigation;
    },
    
    getSubmodules: function(){
        var subModuleUrl = phpr.webpath + 'index.php/' + phpr.module + '/index/jsonGetSubmodules/nodeId/' + phpr.currentProjectId;
        phpr.getData(subModuleUrl, dojo.hitch(this, function(response){
            this.availableModules =  eval(response);
        }));
    }
});
