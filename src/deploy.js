import ghpages from "gh-pages";

ghpages.publish(
    "build",
    {
        branch: "gh-pages",
        repo: "https://github.com/ZombieNW/DolosDaily",
        cname: "dd.zombienw.com"
    },
    function (err) {
        console.log(err);
    }
);
