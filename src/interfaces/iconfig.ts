export default interface IConfig {
    id: number;
    host: string;
    port: number;
    mysql: IConfigMysql;
    http: IConfigHttp;
    debug: boolean;
}

interface IConfigMysql {
    host: string;
    port: number;
    dbname: string;
    user: string;
    password: string;
}

interface IConfigHttp {
    host: string;
    port: number;
    password: string;
}