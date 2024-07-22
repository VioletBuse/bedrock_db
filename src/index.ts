import {Socket} from "net";
import {createPool, Pool} from "generic-pool";

const create_factory = (ip: string, port: number) => ({
	create: async (): Promise<Socket> => {
		const client = new Socket()
		return client.connect(port, ip, () => {})
	},
	destroy: async (client: Socket) => {
		client.destroy()
	},
	validate: async (client: Socket): Promise<boolean> => {
		return client.readyState == "open"
	}
})

const create_pool = (ip: string, port: number, clients: number) => {
	return createPool(create_factory(ip, port), {min: clients, max: clients + 5})
}

export class BedrockClient {
	private pool: Pool<Socket>;

	constructor(ip: string, port: number, pool_count?: number) {

		const clients = pool_count || 100

		this.pool = createPool(create_factory(ip, port), {
			min: clients,
			max: clients + 5,
			testOnBorrow: true,
			testOnReturn: true,
			evictionRunIntervalMillis: 2000,
			numTestsPerEvictionRun: Math.ceil(clients * 0.2)
		})
	}

	public async disconnect() {
		await this.pool.drain()
		await this.pool.clear()
	}
}
