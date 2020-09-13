const path =require("path")
const webpack = require("webpack")

const config = {
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/assets")
    },
    watch: true,
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname,'public'),
        compress: true,
        port: 3000,
        watchContentBase: true,
        open: true,
        hot:true,

    },

}
module.exports = config
