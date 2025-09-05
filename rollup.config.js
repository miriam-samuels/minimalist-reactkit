import resolve from "@rollup/plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export default [
   {
      input: './main/index.ts',
      output: [
         {
            file: "dist/index.js",
            format: 'esm',
            sourcemap: true,
         },

      ],
      external: [
         'react',
         "react-dom"
     ],
      plugins: [
         resolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"],
         }),
         
         scss({
            output: "./dist/index.css",
            fileName: "index.css",
            runtime: require("sass"),
         }),
         typescript({
            tsconfig: "./tsconfig.json",
         }),
         commonjs(),
         terser(),
         external(),
        
      ]
   },

]