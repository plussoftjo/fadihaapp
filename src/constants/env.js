// Envs
let dev = false;
let devserver = "http://172.20.10.3:8082/";
let deploy = "http://134.209.34.181/";

let env = {
  server:dev?devserver:deploy,
  dev:dev
};

export default env;