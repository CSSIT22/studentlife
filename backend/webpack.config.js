const path = require("path")

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    context: path.join(__dirname),
    output: {
        filename: "modlifes-bundled.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "node_modules")],

        extensions: [".js", ".jsx", ".json", ".tsx", ".ts"],
    },
    target: "node",
}
