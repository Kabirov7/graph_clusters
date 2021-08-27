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
		let unique: Array<string> = [];
		Object.values(graphs).map((item: any, idx: number) => {
			// console.log(item)
			let source_title: string = item.original_article_title;
			let source_url: string = item.original_article_url;
			let target_title: string = item.similar_article_title;
			let target_url: string = item.similar_article_url;

			let node1 = {
				"id": source_url,
				"name": source_title,
				"val": 1,
				"source_url": source_url
			};
			const node2 = {
				"id": target_url,
				"name": target_title,
				"val": 1,
				"source_url": source_url

			}
			const link = {
				"source": source_url,
				"target": target_url
			}
			if (!unique.includes(node1.id)) {
				all_nodes.push(node1);
				unique.push(node1.id);
			}
			if (!unique.includes(node2.id)) {
				all_nodes.push(node2);
				unique.push(node2.id);
			}
			linked_nodes.push(link);
		})
		setMyData({"nodes": all_nodes, "links": linked_nodes})


	}, [])

	return (
		<div className="App">
			<ForceGraph3D
				nodeAutoColorBy="source_url"
				graphData={myData}
			/>
		</div>
	);
}

export default Graph3dSentences;