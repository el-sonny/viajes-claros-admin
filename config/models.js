/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {
  connection: 'mysql-connection',
  migrate: 'safe',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  updateAvatar : function(req,opts,cb){
    this.findOne({id:opts.id}).exec(function(e,obj){
      if(e) return cb && cb(e,obj);
      obj.updateAvatar(req,opts,cb);
    });
  },
  attributes : {
  	updateAvatar : function(req,opts,cb){
      var async = require('async');
  		object = this;
      opts.file = object.icon;
      async.waterfall([
        function(callback){Files.saveFiles(req,opts,callback)},
        function(files,callback){
          object.icon = files[0];
          opts.filename = object.icon.filename;
          Files.makeCrops(req,opts,callback)
        },
        function(crops,callback){
          if(opts.file) Files.removeFile(opts,callback);
          else callback(null,crops);
        },
      ],function(e,results){
        if(e) console.log(e);
        object.save(cb);
      });
  	},
  	addFiles : function(req,opts,cb){
  		var async = require('async');
      object = this;
  		objectFiles = object.files ? object.files : [];
  		Files.saveFiles(req,opts,function(e,files){
  			if(e) return cb(e,files);
        object.files = objectFiles;
        async.mapSeries(files,function(file,callback){
          objectFiles.push(file);
          opts.filename = file.filename;
          if(file.typebase == 'image')
            Files.makeCrops(req,opts,callback);
          else
            callback(null,file);
        },function(e,crops){
          if(e) return cb(e,crops);
          object.files = objectFiles;
          object.save(cb);
        });  			
  		});
  	},
    removeFiles : function(req,opts,cb){
      var async = require('async');
      var object = this;      
      var files = opts.files ? opts.files : [];
      files = Array.isArray(files) ? files : [files];
      async.map(files,function(file,callback){
        opts.file = JSON.parse(file);
        for(var i = 0;i<object.files.length;i++){
          if(object.files[i].filename == opts.file.filename){
            object.files.splice(i,1);
          }
        }
        Files.removeFile(opts,callback);
      },function(e,files){
        object.save(cb);
      });
    },
  }
};
