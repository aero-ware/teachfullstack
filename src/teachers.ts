import AeroClient from "@aeroware/aeroclient";
import teach from "./teach";

export default async (TeachFullstack: AeroClient) => ({
    // TeachHTML: teach(TeachFullstack, process.env.HTML_TOKEN!, "000000000000000000", "HTML", "html"),
    // TeachCSS: teach(TeachFullstack, process.env.CSS_TOKEN!, "000000000000000000", "CSS", "css"),
    TeachJS: teach(TeachFullstack, process.env.JS_TOKEN!, "811775862365749258", "JS", "js"),
    // TeachTS: teach(TeachFullstack, process.env.TS_TOKEN!, "000000000000000000", "TS", "ts"),
    // TeachReact: teach(TeachFullstack, process.env.REACT_TOKEN!, "000000000000000000", "React", "jsx"),
    // TeachNext: teach(TeachFullstack, process.env.NEXT_TOKEN!, "000000000000000000", "Next", "jsx"),
    // TeachMongo: teach(TeachFullstack, process.env.MONGO_TOKEN!, "000000000000000000", "Mongo", "js"),
    // TeachExpress: teach(TeachFullstack, process.env.EXPRESS_TOKEN!, "000000000000000000", "Express", "js"),
    // TeachDJS: teach(TeachFullstack, process.env.DJS_TOKEN!, "000000000000000000", "DJS", "js"),
});
