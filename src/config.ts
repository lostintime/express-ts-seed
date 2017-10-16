import * as config from 'config';
import {
  match, isString, isNumber, isBoolean, caseId, hasFields,
  caseThrow, failWith
} from 'typematcher';
import {UsersServiceConfig} from "./routes/users";

type ServicesConfig = {
  users: UsersServiceConfig
};

const isUserServiceConfig = hasFields({
  title: failWith(new Error('Invalid services.users.title configuration option: string expected'))(isString),
  enabled: failWith(new Error('Invalid services.users.enabled configuration option: boolean expected'))(isBoolean),
  retries: failWith(new Error('Invalid services.users.retries configuration option: number expected'))(isNumber)
});

const isServicesConfig = hasFields({
  users: failWith('Invalid services.users config')(isUserServiceConfig)
});

type Config = {
  services: ServicesConfig
};

// Unfortunately there is no way yet to get full config using config lib, ex: config.get('.')
// So - will build final config from parts, getting one by one

const conf: Config = {
  services: match(config.get("services"))(
    caseId(isServicesConfig),
    caseThrow(new Error('One or more services configs are invalid'))
  )
};

export default conf;
