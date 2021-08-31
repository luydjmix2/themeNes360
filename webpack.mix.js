/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const fs = require('fs');
const mix = require('laravel-mix');
const lodash = require("lodash");
const folder = {
    src: "src/", // source files
    dist_assets: "assets/" //build assets files
};

var library_assets = {
    css_js: [
        {"name": "jquery", "assets": ["./node_modules/jquery/dist/jquery.min.js"]},
        {"name": "bootstrap", "assets": ["./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", "./node_modules/bootstrap/dist/css/bootstrap.min.css"]},
        {"name": "popperjs", "assets": ["./node_modules/@popperjs/core/dist/umd/popper.js"]},
        {"name": "datatables", "assets": ["./node_modules/datatables.net/js/jquery.dataTables.min.js"]},
         {"name": "metismenu", "assets": ["./node_modules/metismenu/dist/metisMenu.min.js", "./node_modules/metismenu/dist/metisMenu.min.css"]},
    ]
};

lodash(library_assets).forEach(function (assets, type) {
    if (type == "css_js") {
        lodash(assets).forEach(function (library) {
            var name = library['name'],
                    assetlist = library['assets'],
                    css = [],
                    js = [];
            lodash(assetlist).forEach(function (asset) {
                var ass = asset.split(',');
                for (let i = 0; i < ass.length; ++i) {
                    if (ass[i].substr(ass[i].length - 3) == ".js") {
                        js.push(ass[i]);
                    } else {
                        css.push(ass[i]);
                    }
                }
            });

            if (js.length > 0) {
                mix.combine(js, folder.src + folder.dist_assets + "/libs/" + name + "/js/" + name + ".min.js");
            }
            if (css.length > 0) {
                mix.combine(css, folder.src + folder.dist_assets + "/libs/" + name + "/css/" + name + ".min.css");
            }

        });
    }
});

mix.copyDirectory('node_modules/bootstrap/scss/', folder.src + folder.dist_assets + "scss/");
mix.copyDirectory("node_modules/@iconscout/unicons/css/animation.css", folder.src + folder.dist_assets + "/css/unicons-animation.css");
mix.copyDirectory("node_modules/@iconscout/unicons/css/line.css", folder.src + folder.dist_assets + "/css/unicons-line.css");
mix.copyDirectory("node_modules/@iconscout/unicons/fonts/line/", folder.src + folder.dist_assets + "/fonts/line/");

