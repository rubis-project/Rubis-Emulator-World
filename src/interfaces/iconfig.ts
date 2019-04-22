export default interface IConfig {
    id: number;
    host: string;
    port: number;
    mysql: IConfigMysql;
    io: IConfigIO;
    debug: boolean;
}

interface IConfigMysql {
    host: string;
    port: number;
    dbname: string;
    user: string;
    password: string;
}

interface IConfigIO {
    host: string;
    port: number;
    protocol: string;
}