import babel from "rollup-plugin-babel"
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
     ],
      plugins: [
         resolve({
            extensions: [".js", ".jsx", ".ts", ".tsx"], // List of file extensions to resolve
         }),
         babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
         }),
         scss({
            output: "./dist/index.css",
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