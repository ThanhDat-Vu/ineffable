import { NavLink, useLocation } from "react-router-dom";

export default function Breadcrumb({ pathLabel }) {
  let location = useLocation();
  let nodeNames = location.pathname
    .match(/([^/]*)+(\/?)/g)
    .filter((i) => i.length);
  let nodeLabels = pathLabel.match(/([^/]*)+(\/?)/g).filter((i) => i.length);

  function generatePathObject(nodeNames, nodeLabels) {
    let path = [];
    let link = "";
    for (let i = 0; i < nodeNames.length; i++) {
      link += nodeNames[i];
      path.push({
        link: link,
        label: nodeLabels[i],
      });
    }
    return path;
  }
  let path = generatePathObject(nodeNames, nodeLabels);

  return (
    <div className="w-max mx-auto lg:w-auto italic text-gray-400 ">
      {path.map((node, i) => (
        <NavLink
          key={i}
          to={node.link}
          className={`hover:text-white ${
            node.link === location.pathname && "text-white"
          }`}
        >
          {node.label}
        </NavLink>
      ))}
    </div>
  );
}
