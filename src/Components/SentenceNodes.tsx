import {ForceGraph3D} from "react-force-graph";
import {useState, useEffect} from "react";

interface LabeledValue {
	nodes: Array<any>;
	links: Array<any>;
}

function Graph3dSentences() {
	const [graphs, setGraphs] = useState(require("./graphs.json"))
	const [myData, setMyData] = useState<LabeledValue>();

	useEffect(() => {
		let all_nodes: Array<any> = [];
		let linked_nodes: Array<any> = [];
		Object.values(graphs).map((item: any, idx: number) => {
			// console.log(item)
			let node1 = {
				"id": item.original_article_url,
				"name": item.original_article_title,
				"val": 1
			};
			const node2 = {
				"id": item.similar_article_url,
				"name": item.similar_article_title,
				"val": 1
			}
			const link = {
				"source": item.original_article_url,
				"target": item.similar_article_url
			}
			linked_nodes.push(link);
			all_nodes.push(node1);
			all_nodes.push(node2);
		})
		setMyData({"nodes": all_nodes, "links": linked_nodes})
	}, [])

	return (
		<div className="App">
			<ForceGraph3D
				graphData={myData}
			/>
		</div>
	);
}

export default Graph3dSentences;