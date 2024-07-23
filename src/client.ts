import {Socket} from "net";
import PromiseSocket from "promise-socket";

export type ClientConfig = {
	port: number;
	host: string;
	connect_timeout: number;
}

export class BedrockClient {
	private socket: PromiseSocket<Socket>;
	private config: ClientConfig;
	private active_query: boolean = false;


	public constructor(config: ClientConfig) {
		this.socket = new PromiseSocket<Socket>(new Socket())
		this.config = config
	}

	public async connect(): Promise<void> {
		await this.socket.connect({port: this.config.port, host: this.config.host})
	}

	public async disconnect(): Promise<void> {
		await this.socket.end()
	}

	public async valid(): Promise<boolean> {
		if (this.socket.socket.readyState !== "open") {
			return false
		}

		return !this.active_query
	}

	public async query(query: string): Promise<unknown> {
		const query_string = "Query\n" +
			"query: " + query
	}
}
